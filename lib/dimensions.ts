export type DimensionOption = {
  id: string;
  label: string;
  /** Style directive fed to the image model. */
  prompt: string;
  /** A sentence of historical context used by the narration. */
  note: string;
};

export type DimensionKey = "era" | "artist" | "material";

export const eras: DimensionOption[] = [
  {
    id: "renaissance",
    label: "Renaissance",
    prompt:
      "as a High Renaissance painting, egg tempera and gold leaf, soft sfumato modeling, serene religious grandeur, Florence circa 1500",
    note:
      "The Renaissance (literally 'rebirth') revived classical learning, perspective and naturalistic human anatomy in 15th–16th century Italy, with Florence as its beating heart.",
  },
  {
    id: "baroque",
    label: "Baroque",
    prompt:
      "as a Baroque masterpiece, dramatic chiaroscuro lighting, deep shadows, theatrical emotion, rich drapery, 17th century",
    note:
      "The Baroque era answered the Counter-Reformation with drama: stark light-and-shadow (chiaroscuro), swirling motion and emotional intensity designed to move the viewer's soul.",
  },
  {
    id: "impressionism",
    label: "Impressionism",
    prompt:
      "as an Impressionist painting, loose visible brushstrokes, dappled sunlight, plein air freshness, pastel palette, 1870s France",
    note:
      "Impressionism broke with the academy in 1870s Paris, painting outdoors in quick, visible strokes to capture fleeting light — mocked at first, revolutionary in hindsight.",
  },
  {
    id: "cubism",
    label: "Cubism",
    prompt:
      "as a Cubist painting, fractured geometric planes, multiple viewpoints at once, muted earth tones, Paris circa 1910",
    note:
      "Cubism, invented by Picasso and Braque around 1908–1912, shattered the single viewpoint of Western painting, showing objects from many angles on one flat surface.",
  },
  {
    id: "surrealism",
    label: "Surrealism",
    prompt:
      "as a Surrealist dreamscape, impossible melting forms, eerie precision, subconscious imagery, 1930s",
    note:
      "Surrealism emerged from the rubble of World War I, mining dreams and the unconscious — with Dalí as its most famous showman of impossible, hyper-real visions.",
  },
  {
    id: "popart",
    label: "Pop Art",
    prompt:
      "as a Pop Art print, bold flat colors, Ben-Day dots, silkscreen commercial graphics, 1960s",
    note:
      "Pop Art of the 1960s (Warhol, Lichtenstein) turned advertising, comics and consumer goods into high art — flat, graphic, and unapologetically commercial.",
  },
  {
    id: "ukiyoe",
    label: "Ukiyo-e",
    prompt:
      "as a Japanese ukiyo-e woodblock print, bold ink outlines, flat color planes, washi paper texture, Edo period circa 1830",
    note:
      "Ukiyo-e prints of Edo-period Japan (1603–1868) used bold outlines and flat color; they flooded into Europe in the 1800s and transformed Impressionist and Post-Impressionist art.",
  },
  {
    id: "pixelart",
    label: "Pixel Art",
    prompt:
      "as a retro 8-bit pixel art scene, chunky square pixels, limited color palette, video game aesthetic, 1980s arcade",
    note:
      "Pixel art was born of the 1980s arcade screen's technical limits — and those limits became a beloved aesthetic language, from Pac-Man to modern indie games.",
  },
];

export const artists: DimensionOption[] = [
  {
    id: "van-gogh",
    label: "Van Gogh",
    prompt:
      "in the style of Vincent van Gogh, thick swirling impasto brushstrokes, vivid complementary colors, emotional intensity, 1889",
    note:
      "Vincent van Gogh (1853–1890) painted with thick, swirling strokes and clashing color, pouring raw emotion into every canvas — and only became famous after his death.",
  },
  {
    id: "monet",
    label: "Claude Monet",
    prompt:
      "in the style of Claude Monet, soft dappled brushwork, atmospheric light, shimmering pastel hues, water and reflections",
    note:
      "Claude Monet (1840–1926), the founding Impressionist, spent his life chasing light and atmosphere — most famously in his water-lily pond at Giverny.",
  },
  {
    id: "vermeer",
    label: "Johannes Vermeer",
    prompt:
      "in the style of Johannes Vermeer, serene window light, meticulous detail, cool blues and golds, quiet domestic stillness",
    note:
      "Johannes Vermeer (1632–1675) painted quiet interiors lit by a single window, rendering light, fabric and silence with near-photographic precision.",
  },
  {
    id: "picasso",
    label: "Picasso",
    prompt:
      "in the style of Pablo Picasso, fractured Cubist forms, disjointed perspectives, bold simplified shapes, earthy palette",
    note:
      "Pablo Picasso (1881–1973) reinvented art repeatedly across seven decades; his Cubist period shattered form and perspective, reshaping what painting could be.",
  },
  {
    id: "klimt",
    label: "Klimt",
    prompt:
      "in the style of Gustav Klimt, ornamental gold leaf, intricate patterns, decorative mosaic surfaces, sensuous line",
    note:
      "Gustav Klimt (1862–1918) covered his Vienna canvases in gold leaf and ornate pattern, fusing Byzantine mosaic splendor with Symbolist sensuality.",
  },
  {
    id: "hokusai",
    label: "Hokusai",
    prompt:
      "in the style of Katsushika Hokusai, bold ink outlines, flat indigo washes, dynamic curves, ukiyo-e print, dramatic sky",
    note:
      "Katsushika Hokusai (1760–1849) was the most celebrated ukiyo-e printmaker; his Great Wave crossed the globe and reshaped European art.",
  },
  {
    id: "warhol",
    label: "Warhol",
    prompt:
      "in the style of Andy Warhol, silkscreened repetition, flat graphic color, high-contrast celebrity poster, pop art",
    note:
      "Andy Warhol (1928–1987) turned the factory and the silkscreen into art tools, repeating icons — from soup cans to Marilyn — until they became cultural mirrors.",
  },
  {
    id: "basquiat",
    label: "Basquiat",
    prompt:
      "in the style of Jean-Michel Basquiat, raw graffiti energy, scribbled text, bold primary colors, collage of symbols and crowns",
    note:
      "Jean-Michel Basquiat (1960–1988) rose from New York graffiti to gallery stardom, layering text, crowns and symbols into urgent, neo-expressionist canvases.",
  },
];

export const materials: DimensionOption[] = [
  {
    id: "oil",
    label: "Classical Oil",
    prompt:
      "rendered as classical oil painting on canvas, rich glazes, smooth blended finish, gallery lighting",
    note:
      "Oil paint, perfected in the 15th century, let artists blend wet layers into soft, luminous gradations — the medium behind most of Western art history.",
  },
  {
    id: "watercolor",
    label: "Watercolor",
    prompt:
      "rendered as delicate watercolor, translucent washes, soft bleeding edges, visible paper grain",
    note:
      "Watercolor's transparent washes are prized for spontaneity and light; because it is hard to correct, every stroke is a commitment.",
  },
  {
    id: "stainedglass",
    label: "Stained Glass",
    prompt:
      "rendered as a stained glass window, bold lead lines, jewel-toned translucent panes, radiant backlight",
    note:
      "Stained glass transformed medieval cathedrals into walls of glowing color, telling Bible stories to congregations who could not read.",
  },
  {
    id: "woodblock",
    label: "Woodblock Print",
    prompt:
      "rendered as a traditional woodblock print, carved grain textures, bold ink outlines, flat color blocks",
    note:
      "Woodblock printing — the technology of ukiyo-e — demanded a division of labor between artist, carver and printer, each carving a block per color.",
  },
  {
    id: "mosaic",
    label: "Roman Mosaic",
    prompt:
      "rendered as an ancient Roman mosaic, thousands of tiny tesserae tiles, earthy stone and glass colors, tile grout lines",
    note:
      "Roman mosaics assembled millions of tiny stone cubes (tesserae) into durable floors that still survive two thousand years later.",
  },
  {
    id: "charcoal",
    label: "Charcoal Sketch",
    prompt:
      "rendered as a charcoal and chalk sketch, expressive hatching, monochrome, study on aged paper, smudged edges",
    note:
      "Charcoal is the oldest drawing tool there is — fast, forgiving and expressive, the medium of every artist's first and most honest ideas.",
  },
  {
    id: "pixelart",
    label: "Pixel Art",
    prompt:
      "rendered as retro 8-bit pixel art, blocky pixels, limited palette, video game sprite aesthetic",
    note:
      "The 8-bit pixel was the arcade era's smallest unit of image, and its grid-chunky look became one of the most beloved styles of digital art.",
  },
  {
    id: "neon",
    label: "Neon Sign",
    prompt:
      "rendered as a glowing neon sign, luminous tubes, saturated glow, night-city reflections, dark background",
    note:
      "Neon signage turned public nightlife into art starting in the 1920s — and artists like Bruce Nauman later adopted it for gallery sculpture.",
  },
];

export const dimensionGroups: Record<DimensionKey, { label: string; options: DimensionOption[] }> = {
  era: { label: "What era?", options: eras },
  artist: { label: "Whose hand?", options: artists },
  material: { label: "In what medium?", options: materials },
};

export function findOption(dim: DimensionKey, id: string | null | undefined): DimensionOption | undefined {
  if (!id) return undefined;
  return dimensionGroups[dim].options.find((o) => o.id === id);
}
