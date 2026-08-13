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
    id: "last-supper",
    title: "The Last Supper",
    artist: "Leonardo da Vinci",
    year: "1495–1498",
    period: "High Renaissance",
    medium: "Tempera and oil on gesso",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Leonardo_da_Vinci_(1452-1519)_-_The_Last_Supper_(1495-1498).jpg?width=1000",
    credit: "Santa Maria delle Grazie, Milan, public domain via Wikimedia Commons",
    blurb:
      "Leonardo's mural in the refectory of Santa Maria delle Grazie captures the instant Christ announces that one of the Twelve will betray him. Its balanced composition and the psychological drama rippling across the table made it one of the most studied images in Western art.",
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
      "https://commons.wikimedia.org/wiki/Special:FilePath/Grant_Wood_-_American_Gothic_-_Google_Art_Project.jpg?width=1000",
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
  {
    id: "arnolfini-portrait",
    title: "The Arnolfini Portrait",
    artist: "Jan van Eyck",
    year: "1434",
    period: "Early Netherlandish",
    medium: "Oil on oak panel",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Van_Eyck_-_Arnolfini_Portrait.jpg?width=1000",
    credit: "National Gallery, London, public domain via Wikimedia Commons",
    blurb:
      "Van Eyck's portrait of the merchant Giovanni Arnolfini and his wife is a marvel of oil painting's new precision — every fold, bead and reflection rendered with jewel-like clarity. The convex mirror at the back, inscribed 'Jan van Eyck was here,' turns the painting into a witness to its own making.",
  },
  {
    id: "las-meninas",
    title: "Las Meninas",
    artist: "Diego Velázquez",
    year: "1656",
    period: "Spanish Baroque",
    medium: "Oil on canvas",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Las_Meninas,_by_Diego_Vel%C3%A1zquez,_from_Prado_in_Google_Earth.jpg?width=1000",
    credit: "Museo del Prado, public domain via Wikimedia Commons",
    blurb:
      "Velázquez's great court scene shows the Infanta Margarita surrounded by her maids of honor while the painter himself stands at his easel, looking out at the viewer. Its play of gazes and mirrors — who is watching whom? — has made it a puzzle that artists and philosophers have circled for centuries.",
  },
  {
    id: "night-watch",
    title: "The Night Watch",
    artist: "Rembrandt van Rijn",
    year: "1642",
    period: "Dutch Golden Age",
    medium: "Oil on canvas",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/The_Night_Watch_-_HD.jpg?width=1000",
    credit: "Rijksmuseum, Amsterdam, public domain via Wikimedia Commons",
    blurb:
      "Rembrandt's militia portrait broke every rule of the group portrait, turning a civic guard muster into a burst of movement, shadow and sudden light. Its daring composition — and the legend of the painter's supposed decline that followed — made it the Rijksmuseum's most famous painting.",
  },
  {
    id: "hay-wain",
    title: "The Hay Wain",
    artist: "John Constable",
    year: "1821",
    period: "Romanticism",
    medium: "Oil on canvas",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/John_Constable_-_The_Hay_Wain_(1821).jpg?width=1000",
    credit: "National Gallery, London, public domain via Wikimedia Commons",
    blurb:
      "Constable's view of the River Stour near his boyhood home of Flatford Mill made an ordinary Suffolk landscape into an icon of English Romanticism. Shown at the Paris Salon in 1824, it helped launch the French Romantic movement and inspired Delacroix to repaint parts of his own work.",
  },
  {
    id: "liberty-leading",
    title: "Liberty Leading the People",
    artist: "Eugène Delacroix",
    year: "1830",
    period: "Romanticism",
    medium: "Oil on canvas",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg?width=1000",
    credit: "Louvre Museum, public domain via Wikimedia Commons",
    blurb:
      "Delacroix painted Liberty as an allegorical goddess striding over the barricades of the July Revolution, musket in one hand and the tricolor in the other. Romantic, violent and hopeful all at once, it became the defining image of revolution — and a model for the Statue of Liberty.",
  },
  {
    id: "wanderer",
    title: "Wanderer above the Sea of Fog",
    artist: "Caspar David Friedrich",
    year: "c. 1818",
    period: "Romanticism",
    medium: "Oil on canvas",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg?width=1000",
    credit: "Hamburger Kunsthalle, public domain via Wikimedia Commons",
    blurb:
      "A man in a dark coat stands on a rocky peak, gazing over a sea of mist that swallows the mountains below. Friedrich's iconic figure — seen from behind, facing the sublime — became the very emblem of Romantic longing and the individual's place in an overwhelming nature.",
  },
  {
    id: "fighting-temeraire",
    title: "The Fighting Temeraire",
    artist: "J. M. W. Turner",
    year: "1839",
    period: "Romanticism",
    medium: "Oil on canvas",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/The_Fighting_Temeraire,_JMW_Turner,_National_Gallery.jpg?width=1000",
    credit: "National Gallery, London, public domain via Wikimedia Commons",
    blurb:
      "Turner watched the great warship that had fought at Trafalgar being towed to its final berth to be broken up — and turned that errand into an elegy for the age of sail. The doomed ship glows ghostly white against a molten sunset, a masterclass in light, color and loss.",
  },
  {
    id: "creation-of-adam",
    title: "The Creation of Adam",
    artist: "Michelangelo",
    year: "c. 1512",
    period: "High Renaissance",
    medium: "Fresco",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Michelangelo_-_Creation_of_Adam_(cropped).jpg?width=1000",
    credit: "Sistine Chapel, Vatican, public domain via Wikimedia Commons",
    blurb:
      "Michelangelo's fresco shows God reaching out to touch Adam into life — two fingers hovering a breath apart, the gap charged with the whole of creation. Painted on the Sistine Chapel ceiling over four years of physical agony, it remains one of the most reproduced images in history.",
  },
  {
    id: "grande-jatte",
    title: "A Sunday Afternoon on the Island of La Grande Jatte",
    artist: "Georges Seurat",
    year: "1884–1886",
    period: "Post-Impressionism",
    medium: "Oil on canvas",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/A_Sunday_on_La_Grande_Jatte,_Georges_Seurat,_1884.jpg?width=1000",
    credit: "Art Institute of Chicago, public domain via Wikimedia Commons",
    blurb:
      "Seurat spent two years dotting this park scene with thousands of tiny color points, building a new technique — pointillism — out of science and patience. The frozen, doll-like Parisians beneath the hazy summer sun made it the manifesto of Neo-Impressionism.",
  },
  {
    id: "ophelia",
    title: "Ophelia",
    artist: "John Everett Millais",
    year: "1851–1852",
    period: "Pre-Raphaelite",
    medium: "Oil on canvas",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/John_Everett_Millais_-_Ophelia_-_Google_Art_Project.jpg?width=1000",
    credit: "Tate Britain, public domain via Wikimedia Commons",
    blurb:
      "Millais painted Ophelia floating to her death in a stream, her hands outstretched and her dress billowing like a flower. Painted out of doors over months of painstaking botanical detail, it is the Pre-Raphaelite Brotherhood's most haunting fusion of beauty and tragedy.",
  },
];

export function getArtwork(id: string): Artwork | undefined {
  return artworks.find((a) => a.id === id);
}
