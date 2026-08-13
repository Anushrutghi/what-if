export type Artwork = {
  id: string;
  title: string;
  artist: string;
  year: string;
  period: string;
  medium: string;
  /** Wikimedia Commons file, served via Special:FilePath so it redirects to the real file. */
  imageUrl: string;
  /** Short attribution line, shown under the image. */
  credit: string;
  /** 2–3 sentences of historical context, used as the base of narration. */
  blurb: string;
};

export const artworks: Artwork[] = [
  {
    id: "mona-lisa",
    title: "Mona Lisa",
    artist: "Leonardo da Vinci",
    year: "c. 1503–1506",
    period: "High Renaissance",
    medium: "Oil on poplar panel",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg?width=1000",
    credit: "Louvre Museum, public domain via Wikimedia Commons",
    blurb:
      "Leonardo's portrait of Lisa Gherardini is the most famous painting in the world, celebrated for its sfumato technique and the subject's famously enigmatic expression. Painted in Florence at the dawn of the 16th century, it helped define the High Renaissance ideal of naturalistic, psychologically present portraiture.",
  },
  {
    id: "starry-night",
    title: "The Starry Night",
    artist: "Vincent van Gogh",
    year: "1889",
    period: "Post-Impressionism",
    medium: "Oil on canvas",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg?width=1000",
    credit: "Museum of Modern Art, public domain via Wikimedia Commons",
    blurb:
      "Painted from memory while Van Gogh was a patient at the asylum in Saint-Rémy, The Starry Night fuses a real Provençal landscape with a turbulent, dreamlike sky. Its swirling brushwork and glowing stars made it an icon of emotional expression in painting.",
  },
  {
    id: "the-scream",
    title: "The Scream",
    artist: "Edvard Munch",
    year: "1893",
    period: "Expressionism",
    medium: "Oil, tempera and pastel on cardboard",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/The_Scream.jpg?width=1000",
    credit: "National Museum of Norway, public domain via Wikimedia Commons",
    blurb:
      "Munch's image of a figure on a bridge beneath a blood-red sky is often read as a portrait of modern anxiety itself. He wrote that he painted it while feeling 'the great infinite scream of nature' — and the painting became a founding image of Expressionism.",
  },
  {
    id: "girl-pearl",
    title: "Girl with a Pearl Earring",
    artist: "Johannes Vermeer",
    year: "c. 1665",
    period: "Dutch Golden Age",
    medium: "Oil on canvas",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Girl_with_a_Pearl_Earring.jpg?width=1000",
    credit: "Mauritshuis, public domain via Wikimedia Commons",
    blurb:
      "Often called the 'Mona Lisa of the North,' Vermeer's tronie captures a girl turning toward the viewer with a luminous pearl catching the light. It showcases the Dutch master's gift for rendering light, texture, and a moment of quiet, direct human presence.",
  },
  {
    id: "persistence-memory",
    title: "The Persistence of Memory",
    artist: "Salvador Dalí",
    year: "1931",
    period: "Surrealism",
    medium: "Oil on canvas",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/The_Persistence_of_Memory.jpg?width=1000",
    credit: "Museum of Modern Art, public domain via Wikimedia Commons",
    blurb:
      "Dalí's melting clocks in a barren Catalan landscape are among Surrealism's most recognizable images. The soft watches were his 'camembert of time' — a hallucinatory meditation on how memory and time refuse to stay rigid.",
  },
  {
    id: "great-wave",
    title: "The Great Wave off Kanagawa",
    artist: "Katsushika Hokusai",
    year: "c. 1830–1832",
    period: "Edo-period ukiyo-e",
    medium: "Woodblock print",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/The_Great_Wave_off_Kanagawa.jpg?width=1000",
    credit: "Public domain via Wikimedia Commons",
    blurb:
      "From Hokusai's series Thirty-six Views of Mount Fuji, the Great Wave shows a towering crest about to crash over fishing boats, with Fuji tiny on the horizon. The print's bold design and Prussian blue pigment made it a sensation in Europe, where it helped inspire Impressionist and Post-Impressionist painters.",
  },
  {
    id: "birth-of-venus",
    title: "The Birth of Venus",
    artist: "Sandro Botticelli",
    year: "c. 1485",
    period: "Early Renaissance",
    medium: "Tempera on canvas",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project.jpg?width=1000",
    credit: "Uffizi Gallery, public domain via Wikimedia Commons",
    blurb:
      "Botticelli's goddess of love arrives on a scallop shell, blown ashore by the winds, greeted by a figure offering a floral cloak. Painted for a Medici patron, it revived classical mythology in Renaissance Florence and remains one of the most beloved images of the era.",
  },
  {
    id: "american-gothic",
    title: "American Gothic",
    artist: "Grant Wood",
    year: "1930",
    period: "Regionalism",
    medium: "Oil on beaverboard",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/American_Gothic_-_Grant_Wood.jpg?width=1000",
    credit: "Art Institute of Chicago, public domain via Wikimedia Commons",
    blurb:
      "Grant Wood painted this stern Iowa farmer and his daughter before a white farmhouse with a Gothic-style window — a deliberately ambiguous portrait of rural American identity. It became one of the most parodied images in art history, from magazine covers to popular culture.",
  },
  {
    id: "the-kiss",
    title: "The Kiss",
    artist: "Gustav Klimt",
    year: "1907–1908",
    period: "Vienna Secession",
    medium: "Oil and gold leaf on canvas",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg?width=1000",
    credit: "Belvedere, Vienna, public domain via Wikimedia Commons",
    blurb:
      "Klimt's gilded embrace of two lovers, wrapped in ornamental robes of gold leaf and pattern, crowns his 'Golden Period' in Vienna. It fuses Byzantine mosaic decoration with Symbolist sensuality, making it an enduring emblem of romantic love in art.",
  },
  {
    id: "guernica",
    title: "Guernica",
    artist: "Pablo Picasso",
    year: "1937",
    period: "Cubism / Surrealism",
    medium: "Oil on canvas",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Mural_del_Gernika.jpg?width=1000",
    credit: "Museo Nacional Centro de Arte Reina Sofía, public domain via Wikimedia Commons",
    blurb:
      "Picasso's monumental mural was his response to the bombing of the Basque town of Guernica during the Spanish Civil War. Rendered in stark black, white and grey, its writhing figures and animals became the 20th century's most powerful anti-war statement.",
  },
  {
    id: "garden-delights",
    title: "The Garden of Earthly Delights",
    artist: "Hieronymus Bosch",
    year: "c. 1490–1510",
    period: "Early Netherlandish",
    medium: "Oil on oak panels",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/The_Garden_of_Earthly_Delights_by_Bosch_High_Resolution.jpg?width=1000",
    credit: "Museo del Prado, public domain via Wikimedia Commons",
    blurb:
      "Bosch's triptych unfolds from Eden to Hell across a fantastical landscape teeming with tiny figures, hybrid creatures and dreamlike architecture. Its sheer invention made it a favorite of the Spanish court — and of Surrealists centuries later, who claimed it as a precursor.",
  },
  {
    id: "water-lilies",
    title: "Water Lilies",
    artist: "Claude Monet",
    year: "1914–1926",
    period: "Impressionism",
    medium: "Oil on canvas",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Claude_Monet_-_Water_Lilies_-_1906,_Ryerson.jpg?width=1000",
    credit: "Art Institute of Chicago, public domain via Wikimedia Commons",
    blurb:
      "For the last three decades of his life Monet painted his garden pond at Giverny, chasing the shifting light across its surface. The Water Lilies series dissolves form into pure color and atmosphere, pointing the way toward abstract painting.",
  },
];

export function getArtwork(id: string): Artwork | undefined {
  return artworks.find((a) => a.id === id);
}
