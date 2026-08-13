import type { Artwork } from "@/lib/artworks";
import type { DimensionOption } from "@/lib/dimensions";

type NarrationInput = {
  artwork: Artwork;
  era?: DimensionOption;
  artist?: DimensionOption;
  material?: DimensionOption;
};

function labelList(era?: DimensionOption, artist?: DimensionOption, material?: DimensionOption): string {
  const names = [era?.label, artist?.label, material?.label].filter(Boolean) as string[];
  if (names.length === 0) return "a new style";
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names[0]}, ${names[1]} and ${names[2]}`;
}

function fallbackNarration({ artwork, era, artist, material }: NarrationInput): string {
  const parts: string[] = [];
  parts.push(
    `${artwork.title} was created by ${artwork.artist} in ${artwork.year}. ${artwork.blurb}`
  );
  if (era) {
    parts.push(`Now imagine it reborn in the ${era.label.toLowerCase()} era. ${era.note}`);
  }
  if (artist) {
    parts.push(`And what if ${artist.label} had painted it instead? ${artist.note}`);
  }
  if (material) {
    parts.push(
      `Finally, picture it in a completely different medium: ${material.label.toLowerCase()}. ${material.note}`
    );
  }
  parts.push(
    "A remix like this is a time machine: it lets two worlds that never met shake hands, and reminds us that art history is really one long conversation between eras."
  );
  return parts.join(" ");
}

/** Ask an LLM (OpenAI-compatible API) for a curator's narration. Returns null when no key is configured. */
async function llmNarration({ artwork, era, artist, material }: NarrationInput): Promise<string | null> {
  const apiKey = process.env.LLM_API_KEY;
  if (!apiKey) return null;

  const baseUrl = process.env.LLM_BASE_URL ?? "https://api.openai.com/v1";
  const model = process.env.LLM_MODEL ?? "gpt-4o-mini";

  const userMessage = [
    `Artwork: "${artwork.title}" by ${artwork.artist} (${artwork.year}, ${artwork.period}).`,
    `Original: ${artwork.blurb}`,
    `Hypothetical remix: ${artwork.title} reimagined as ${labelList(era, artist, material)}.`,
    era ? `Era context: ${era.note}` : "",
    artist ? `Artist context: ${artist.note}` : "",
    material ? `Medium context: ${material.note}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.8,
      max_tokens: 260,
      messages: [
        {
          role: "system",
          content:
            "You are a museum curator and art historian. Write 3-5 sentences of engaging, historically accurate narration about a hypothetical remix of a famous artwork. Explain the historical context of the chosen era, artist and medium, and why combining them with this artwork is interesting or ironic. Write in plain prose — no markdown, no headers, no bullet points. Be vivid and accessible, like an audio guide.",
        },
        { role: "user", content: userMessage },
      ],
    }),
  });

  if (!res.ok) return null;
  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const content = data.choices?.[0]?.message?.content?.trim();
  return content && content.length > 0 ? content : null;
}

export async function narrate(input: NarrationInput): Promise<{ narration: string; demo: boolean }> {
  const llm = await llmNarration(input);
  if (llm) return { narration: llm, demo: false };
  return { narration: fallbackNarration(input), demo: true };
}
