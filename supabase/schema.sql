-- ============================================================
-- The What-If Museum — production schema
-- Run this whole file in Supabase → SQL Editor → Run.
-- Idempotent: safe to run more than once.
--
-- After running, one more manual step is needed:
--   Authentication → Sign In / Up → enable "Anonymous sign-ins"
-- (The app signs each browser in anonymously so every remix has an owner.)
-- ============================================================

-- ------------------------------------------------------------
-- 1. Tables
-- ------------------------------------------------------------

-- Artwork catalog (mirror of lib/artworks.ts, so SQL queries work too)
create table if not exists public.artworks (
  id          text primary key,
  title       text not null,
  artist      text not null,
  year        text,
  period      text,
  medium      text,
  image_url   text not null,
  credit      text,
  blurb       text,
  created_at  timestamptz not null default now()
);

-- One row per generated remix. user_id = auth.uid() of the creator
-- (anonymous sign-ins get a stable uuid). Images live in Storage;
-- storage_path is the object key, never the binary itself.
create table if not exists public.remixes (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null default auth.uid(),
  artwork_id    text not null references public.artworks (id) on delete cascade,
  title         text,             -- e.g. "Mona Lisa, as painted by Van Gogh"
  era           text,             -- dimension ids from lib/dimensions.ts
  artist        text,
  material      text,
  prompt        text,             -- exact prompt sent to the image model
  narration     text,             -- curator's note
  storage_path  text,             -- Storage object key, e.g. remixes/{uid}/{remix_id}.png
  created_at    timestamptz not null default now()
);

-- Likes: unique per (remix, user) so nobody can like twice.
create table if not exists public.likes (
  remix_id    uuid not null references public.remixes (id) on delete cascade,
  user_id     uuid not null default auth.uid(),
  created_at  timestamptz not null default now(),
  primary key (remix_id, user_id)
);

-- ------------------------------------------------------------
-- 2. Indexes
-- ------------------------------------------------------------

create index if not exists remixes_user_created_idx on public.remixes (user_id, created_at desc);
create index if not exists remixes_artwork_idx      on public.remixes (artwork_id);
create index if not exists likes_user_idx           on public.likes (user_id);

-- ------------------------------------------------------------
-- 3. Storage bucket for generated remix images (PRIVATE)
--    Images are fetched back via signed URLs, never public.
-- ------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('artworks', 'artworks', false)
on conflict (id) do update set public = false;

-- ------------------------------------------------------------
-- 4. Storage policies (object paths: remixes/{user_id}/{file})
-- ------------------------------------------------------------

drop policy if exists "authenticated can upload remix images" on storage.objects;
create policy "authenticated can upload remix images"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'artworks'
    and (storage.foldername(name))[1] = 'remixes'
    and (storage.foldername(name))[2] = auth.uid()::text
  );

drop policy if exists "owners can read their remix images" on storage.objects;
create policy "owners can read their remix images"
  on storage.objects for select to authenticated
  using (
    bucket_id = 'artworks'
    and (storage.foldername(name))[2] = auth.uid()::text
  );

drop policy if exists "owners can delete their remix images" on storage.objects;
create policy "owners can delete their remix images"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'artworks'
    and (storage.foldername(name))[2] = auth.uid()::text
  );

-- ------------------------------------------------------------
-- 5. Row Level Security
--    - artworks: public to read
--    - remixes:  creators can read/update/delete only their own
--    - likes:    users can read/delete only their own
-- ------------------------------------------------------------

alter table public.artworks enable row level security;
alter table public.remixes  enable row level security;
alter table public.likes    enable row level security;

drop policy if exists "artworks are public to read" on public.artworks;
create policy "artworks are public to read"
  on public.artworks for select
  to anon, authenticated
  using (true);

drop policy if exists "users can create remixes" on public.remixes;
create policy "users can create remixes"
  on public.remixes for insert
  to authenticated
  with check (user_id = auth.uid());

drop policy if exists "users can read their own remixes" on public.remixes;
create policy "users can read their own remixes"
  on public.remixes for select
  to authenticated
  using (user_id = auth.uid());

drop policy if exists "users can update their own remixes" on public.remixes;
create policy "users can update their own remixes"
  on public.remixes for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists "users can delete their own remixes" on public.remixes;
create policy "users can delete their own remixes"
  on public.remixes for delete
  to authenticated
  using (user_id = auth.uid());

drop policy if exists "users can like remixes" on public.likes;
create policy "users can like remixes"
  on public.likes for insert
  to authenticated
  with check (user_id = auth.uid());

drop policy if exists "users can read their own likes" on public.likes;
create policy "users can read their own likes"
  on public.likes for select
  to authenticated
  using (user_id = auth.uid());

drop policy if exists "users can remove their own likes" on public.likes;
create policy "users can remove their own likes"
  on public.likes for delete
  to authenticated
  using (user_id = auth.uid());

-- ------------------------------------------------------------
-- 6. Seed the artwork catalog
-- ------------------------------------------------------------

insert into public.artworks (id, title, artist, year, period, medium, image_url, credit, blurb) values
  ('mona-lisa', 'Mona Lisa', 'Leonardo da Vinci', 'c. 1503–1506', 'High Renaissance', 'Oil on poplar panel', 'https://commons.wikimedia.org/wiki/Special:FilePath/Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg?width=1000', 'Louvre Museum, public domain via Wikimedia Commons', 'Leonardo''s portrait of Lisa Gherardini is the most famous painting in the world, celebrated for its sfumato technique and the subject''s famously enigmatic expression. Painted in Florence at the dawn of the 16th century, it helped define the High Renaissance ideal of naturalistic, psychologically present portraiture.'),
  ('starry-night', 'The Starry Night', 'Vincent van Gogh', '1889', 'Post-Impressionism', 'Oil on canvas', 'https://commons.wikimedia.org/wiki/Special:FilePath/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg?width=1000', 'Museum of Modern Art, public domain via Wikimedia Commons', 'Painted from memory while Van Gogh was a patient at the asylum in Saint-Rémy, The Starry Night fuses a real Provençal landscape with a turbulent, dreamlike sky. Its swirling brushwork and glowing stars made it an icon of emotional expression in painting.'),
  ('the-scream', 'The Scream', 'Edvard Munch', '1893', 'Expressionism', 'Oil, tempera and pastel on cardboard', 'https://commons.wikimedia.org/wiki/Special:FilePath/The_Scream.jpg?width=1000', 'National Museum of Norway, public domain via Wikimedia Commons', 'Munch''s image of a figure on a bridge beneath a blood-red sky is often read as a portrait of modern anxiety itself. He wrote that he painted it while feeling ''the great infinite scream of nature'' — and the painting became a founding image of Expressionism.'),
  ('girl-pearl', 'Girl with a Pearl Earring', 'Johannes Vermeer', 'c. 1665', 'Dutch Golden Age', 'Oil on canvas', 'https://commons.wikimedia.org/wiki/Special:FilePath/Girl_with_a_Pearl_Earring.jpg?width=1000', 'Mauritshuis, public domain via Wikimedia Commons', 'Often called the ''Mona Lisa of the North,'' Vermeer''s tronie captures a girl turning toward the viewer with a luminous pearl catching the light. It showcases the Dutch master''s gift for rendering light, texture, and a moment of quiet, direct human presence.'),
  ('persistence-memory', 'The Persistence of Memory', 'Salvador Dalí', '1931', 'Surrealism', 'Oil on canvas', 'https://commons.wikimedia.org/wiki/Special:FilePath/The_Persistence_of_Memory.jpg?width=1000', 'Museum of Modern Art, public domain via Wikimedia Commons', 'Dalí''s melting clocks in a barren Catalan landscape are among Surrealism''s most recognizable images. The soft watches were his ''camembert of time'' — a hallucinatory meditation on how memory and time refuse to stay rigid.'),
  ('great-wave', 'The Great Wave off Kanagawa', 'Katsushika Hokusai', 'c. 1830–1832', 'Edo-period ukiyo-e', 'Woodblock print', 'https://commons.wikimedia.org/wiki/Special:FilePath/The_Great_Wave_off_Kanagawa.jpg?width=1000', 'Public domain via Wikimedia Commons', 'From Hokusai''s series Thirty-six Views of Mount Fuji, the Great Wave shows a towering crest about to crash over fishing boats, with Fuji tiny on the horizon. The print''s bold design and Prussian blue pigment made it a sensation in Europe, where it helped inspire Impressionist and Post-Impressionist painters.'),
  ('birth-of-venus', 'The Birth of Venus', 'Sandro Botticelli', 'c. 1485', 'Early Renaissance', 'Tempera on canvas', 'https://commons.wikimedia.org/wiki/Special:FilePath/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project.jpg?width=1000', 'Uffizi Gallery, public domain via Wikimedia Commons', 'Botticelli''s goddess of love arrives on a scallop shell, blown ashore by the winds, greeted by a figure offering a floral cloak. Painted for a Medici patron, it revived classical mythology in Renaissance Florence and remains one of the most beloved images of the era.'),
  ('american-gothic', 'American Gothic', 'Grant Wood', '1930', 'Regionalism', 'Oil on beaverboard', 'https://commons.wikimedia.org/wiki/Special:FilePath/American_Gothic_-_Grant_Wood.jpg?width=1000', 'Art Institute of Chicago, public domain via Wikimedia Commons', 'Grant Wood painted this stern Iowa farmer and his daughter before a white farmhouse with a Gothic-style window — a deliberately ambiguous portrait of rural American identity. It became one of the most parodied images in art history, from magazine covers to popular culture.'),
  ('the-kiss', 'The Kiss', 'Gustav Klimt', '1907–1908', 'Vienna Secession', 'Oil and gold leaf on canvas', 'https://commons.wikimedia.org/wiki/Special:FilePath/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg?width=1000', 'Belvedere, Vienna, public domain via Wikimedia Commons', 'Klimt''s gilded embrace of two lovers, wrapped in ornamental robes of gold leaf and pattern, crowns his ''Golden Period'' in Vienna. It fuses Byzantine mosaic decoration with Symbolist sensuality, making it an enduring emblem of romantic love in art.'),
  ('guernica', 'Guernica', 'Pablo Picasso', '1937', 'Cubism / Surrealism', 'Oil on canvas', 'https://commons.wikimedia.org/wiki/Special:FilePath/Mural_del_Gernika.jpg?width=1000', 'Museo Nacional Centro de Arte Reina Sofía, public domain via Wikimedia Commons', 'Picasso''s monumental mural was his response to the bombing of the Basque town of Guernica during the Spanish Civil War. Rendered in stark black, white and grey, its writhing figures and animals became the 20th century''s most powerful anti-war statement.'),
  ('garden-delights', 'The Garden of Earthly Delights', 'Hieronymus Bosch', 'c. 1490–1510', 'Early Netherlandish', 'Oil on oak panels', 'https://commons.wikimedia.org/wiki/Special:FilePath/The_Garden_of_Earthly_Delights_by_Bosch_High_Resolution.jpg?width=1000', 'Museo del Prado, public domain via Wikimedia Commons', 'Bosch''s triptych unfolds from Eden to Hell across a fantastical landscape teeming with tiny figures, hybrid creatures and dreamlike architecture. Its sheer invention made it a favorite of the Spanish court — and of Surrealists centuries later, who claimed it as a precursor.'),
  ('water-lilies', 'Water Lilies', 'Claude Monet', '1914–1926', 'Impressionism', 'Oil on canvas', 'https://commons.wikimedia.org/wiki/Special:FilePath/Claude_Monet_-_Water_Lilies_-_1906,_Ryerson.jpg?width=1000', 'Art Institute of Chicago, public domain via Wikimedia Commons', 'For the last three decades of his life Monet painted his garden pond at Giverny, chasing the shifting light across its surface. The Water Lilies series dissolves form into pure color and atmosphere, pointing the way toward abstract painting.')
on conflict (id) do nothing;
