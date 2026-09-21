import { JournalArticle } from "@/types";

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    slug: "the-architecture-of-scent",
    title: "The Architecture of Scent",
    category: "Fragrance",
    excerpt:
      "How spatial proportion, raw materials, and silence guide the structural composition of a contemporary perfume.",
    content: [
      "In architecture, space is not merely what is bounded by walls; it is defined by the quality of light, the density of materials, and the air that circulates between surfaces. In perfume composition, a similar geometry unfolds.",
      "When we formulate a fragrance at RAPHÈLO, we do not simply assemble pleasing aromas. We consider weight, evaporation curves, and how a note inhabits an environment. A top note of Italian bergamot acts like morning light filtering through an open window—immediate, fleeting, and clear. In contrast, dry Atlas cedar and smoked vanilla form the load-bearing pillars of the composition.",
      "The result is a fragrance that possesses interior volume. It does not overpower the room; rather, it subtly alters the atmosphere of whoever enters it.",
    ],
    readTime: "4 min read",
    publishedAt: "September 12, 2026",
    imageUrl: "/images/products/halo.jpg",
    author: "Elena Vance",
  },
  {
    slug: "why-certain-smells-become-memories",
    title: "Why Certain Smells Become Memories",
    category: "Culture",
    excerpt:
      "The neurological phenomenon of olfactory memory, and why an atmosphere can outlast conscious recollection.",
    content: [
      "The human olfactory bulb is directly hardwired into the amygdala and hippocampus—the emotional and memory nerve centers of the brain. Unlike sight or sound, which travel through multiple synaptic relays before processing, scent arrives without intellectual filter.",
      "This is why a sudden trace of wet stone, rain-soaked asphalt, or cedar shavings can transport you instantly to a specific hour twenty years ago.",
      "At RAPHÈLO, our creations are formulated around these atmospheric triggers. We craft fragrances not to project status, but to anchor moments in memory. When the visual memory of an evening fades, the tactile aura of its scent remains.",
    ],
    readTime: "5 min read",
    publishedAt: "August 28, 2026",
    imageUrl: "/images/products/after-rain.jpg",
    author: "Dr. Marcus Chen",
  },
  {
    slug: "building-a-fragrance-wardrobe",
    title: "Building a Fragrance Wardrobe",
    category: "Stories",
    excerpt:
      "Moving beyond the idea of a single 'signature scent' toward a responsive rotation of personal atmospheres.",
    content: [
      "For decades, the perfume industry promoted the concept of a solitary 'signature scent'—one fragrance worn every day, year after year. Yet we do not wear the same coat in August as we do in November, nor do we inhabit the same temperament at dawn as we do at midnight.",
      "A fragrance wardrobe should be responsive to light, climate, fabric, and emotional state. A crisp, crystalline scent like HALO honors morning focus and linen shirts, while SABLE brings grounding gravitas to dark wool and cool evening air.",
      "Consider your collection as a palette of moods rather than a cosmetic routine.",
    ],
    readTime: "6 min read",
    publishedAt: "August 10, 2026",
    imageUrl: "/images/products/still-room.jpg",
    author: "Antoine Laurent",
  },
];

export function getArticleBySlug(slug: string): JournalArticle | undefined {
  return JOURNAL_ARTICLES.find((a) => a.slug.toLowerCase() === slug.toLowerCase());
}
