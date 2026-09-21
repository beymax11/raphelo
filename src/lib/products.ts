import { Product, FragranceFamily } from "@/types";

export const PRODUCTS: Product[] = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    slug: "halo",
    name: "HALO",
    subtitle: "Eau de Parfum",
    family: "Musky Floral",
    category: "Floral",
    description:
      "A luminous atmosphere formed of crystalline iris, fresh white tea, and soft cashmere wood that lingers like clean morning light entering through tall linen curtains.",
    atmosphere: "Clean morning light.",
    notes: {
      top: ["Bergamot", "White Tea"],
      heart: ["Iris", "Cashmere Accord"],
      base: ["Soft Musk", "Cashmere Wood"],
    },
    price: 195,
    sizes: ["50ml", "100ml"],
    images: ["/images/products/halo.jpg"],
    badge: "NEW",
    inventory: 45,
    rating: 4.9,
    reviewCount: 38,
    isNew: true,
    isBestSeller: true,
    details: {
      concentration: "Eau de Parfum (22% concentration)",
      origin: "Formulated and crafted in Grasse and Paris",
      ingredients:
        "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Alpha-Isomethyl Ionone, Hydroxycitronellal, Geraniol, Citronellol.",
    },
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    slug: "ember-veil",
    name: "EMBER VEIL",
    subtitle: "Eau de Parfum",
    family: "Woody Amber",
    category: "Amber",
    description:
      "A warm and enveloping aura of pink pepper, rich saffron, and smoky amber, inspired by the quiet warmth after dusk when the fire recedes to embers.",
    atmosphere: "Warm light after sunset.",
    notes: {
      top: ["Pink Pepper", "Saffron"],
      heart: ["Cedar", "Smoked Incense"],
      base: ["Amber", "Smoked Vanilla"],
    },
    price: 210,
    sizes: ["50ml", "100ml"],
    images: ["/images/products/ember-veil.jpg"],
    badge: "BEST SELLER",
    inventory: 32,
    rating: 4.8,
    reviewCount: 42,
    isBestSeller: true,
    details: {
      concentration: "Eau de Parfum (24% concentration)",
      origin: "Formulated and crafted in Grasse and Paris",
      ingredients:
        "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Coumarin, Eugenol, Benzyl Benzoate, Cinnamal, Isoeugenol.",
    },
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    slug: "still-room",
    name: "STILL ROOM",
    subtitle: "Eau de Parfum",
    family: "Woody Musk",
    category: "Musk",
    description:
      "Fig leaf and powdery violet resting against dry pale sandalwood and intimate skin musk. The lingering stillness of a quiet room after someone leaves.",
    atmosphere: "A quiet room after someone leaves.",
    notes: {
      top: ["Fig Leaf"],
      heart: ["Violet", "Sandalwood"],
      base: ["Vetiver", "Skin Musk"],
    },
    price: 195,
    sizes: ["50ml", "100ml"],
    images: ["/images/products/still-room.jpg"],
    inventory: 50,
    rating: 4.9,
    reviewCount: 29,
    details: {
      concentration: "Eau de Parfum (20% concentration)",
      origin: "Formulated and crafted in Grasse and Paris",
      ingredients:
        "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Farnesol, Benzyl Salicylate, Evernia Prunastri Extract.",
    },
  },
  {
    id: "44444444-4444-4444-4444-444444444444",
    slug: "late-light",
    name: "LATE LIGHT",
    subtitle: "Eau de Parfum",
    family: "Amber Floral",
    category: "Floral",
    description:
      "Golden mandarin and radiant night-blooming jasmine steeped in comforting tonka bean and soft woods. The final slice of afternoon sunlight across textured lime plaster.",
    atmosphere: "The final sunlight entering a room.",
    notes: {
      top: ["Mandarin", "Bergamot"],
      heart: ["Jasmine", "Benzoin"],
      base: ["Tonka", "Soft Woods"],
    },
    price: 205,
    sizes: ["50ml", "100ml"],
    images: ["/images/products/late-light.jpg"],
    badge: "NEW",
    inventory: 28,
    rating: 4.7,
    reviewCount: 19,
    isNew: true,
    details: {
      concentration: "Eau de Parfum (22% concentration)",
      origin: "Formulated and crafted in Grasse and Paris",
      ingredients:
        "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Benzyl Alcohol, Linalool, Hexyl Cinnamal, Limonene.",
    },
  },
  {
    id: "55555555-5555-5555-5555-555555555555",
    slug: "sable",
    name: "SABLE",
    subtitle: "Eau de Parfum",
    family: "Woody Spicy",
    category: "Spicy",
    description:
      "Black pepper, aromatic cardamom, and tactile leather accord anchored by dark cedar and dry amber. Dark fabric and warm wood in quiet union.",
    atmosphere: "Dark fabric and warm wood.",
    notes: {
      top: ["Black Pepper", "Cardamom"],
      heart: ["Leather Accord", "Nutmeg"],
      base: ["Cedar", "Dry Amber"],
    },
    price: 220,
    sizes: ["50ml", "100ml"],
    images: ["/images/products/sable.jpg"],
    inventory: 35,
    rating: 4.8,
    reviewCount: 31,
    details: {
      concentration: "Eau de Parfum (25% concentration)",
      origin: "Formulated and crafted in Grasse and Paris",
      ingredients:
        "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Isoeugenol, Limonene, Linalool, Citral, Geraniol.",
    },
  },
  {
    id: "66666666-6666-6666-6666-666666666666",
    slug: "after-rain",
    name: "AFTER RAIN",
    subtitle: "Eau de Parfum",
    family: "Fresh Woody",
    category: "Fresh",
    description:
      "Crisp bergamot, mineral wet stones, and dewy crushed leaves grounded in earthy vetiver and damp green moss. Cool morning air after rainfall.",
    atmosphere: "Wet pavement, cool air, and earth after rain.",
    notes: {
      top: ["Bergamot", "Green Leaves"],
      heart: ["Mineral Accord", "Violet Leaf"],
      base: ["Vetiver", "Moss"],
    },
    price: 195,
    sizes: ["50ml", "100ml"],
    images: ["/images/products/after-rain.jpg"],
    badge: "BEST SELLER",
    inventory: 40,
    rating: 4.9,
    reviewCount: 47,
    isBestSeller: true,
    details: {
      concentration: "Eau de Parfum (21% concentration)",
      origin: "Formulated and crafted in Grasse and Paris",
      ingredients:
        "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Evernia Prunastri (Oakmoss) Extract, Citronellol, Linalool.",
    },
  },
  {
    id: "77777777-7777-7777-7777-777777777777",
    slug: "discovery-set",
    name: "MEET RAPHÈLO",
    subtitle: "The Discovery Set (6 x 2ml)",
    family: "Discovery",
    category: "Discovery",
    description:
      "Six fragrances. Six atmospheres. One introduction to the contemporary house of RAPHÈLO. Includes an invitation voucher redeemable against your first full-size bottle.",
    atmosphere: "Six atmospheres. One introduction.",
    notes: {
      top: ["Halo", "Ember Veil"],
      heart: ["Still Room", "Late Light"],
      base: ["Sable", "After Rain"],
    },
    price: 45,
    sizes: ["6 x 2ml"],
    images: ["/images/products/discovery-set.jpg"],
    badge: "BEST SELLER",
    inventory: 90,
    rating: 5.0,
    reviewCount: 84,
    isNew: true,
    isBestSeller: true,
    details: {
      concentration: "6 Eau de Parfum glass atomizers (2ml each)",
      origin: "Formulated and crafted in Grasse and Paris",
      ingredients:
        "Individual ingredient listings for each of the six fragrances included inside packaging booklet.",
    },
  },
  {
    id: "88888888-8888-8888-8888-888888888888",
    slug: "miniature-collection",
    name: "MINIATURE COLLECTION",
    subtitle: "Trio Set (3 x 15ml)",
    family: "Discovery",
    category: "Discovery",
    description:
      "A refined selection of our three signature fragrances: Halo, Ember Veil, and After Rain, housed in travel-ready 15ml architectural flacons.",
    atmosphere: "Three companion atmospheres for travel and transition.",
    notes: {
      top: ["Halo"],
      heart: ["Ember Veil"],
      base: ["After Rain"],
    },
    price: 95,
    sizes: ["3 x 15ml"],
    images: ["/images/products/discovery-set.jpg"],
    inventory: 50,
    rating: 4.8,
    reviewCount: 22,
    details: {
      concentration: "3 Eau de Parfum flacons (15ml each)",
      origin: "Formulated and crafted in Grasse and Paris",
      ingredients:
        "Individual ingredient listings for each of the three fragrances included inside packaging.",
    },
  },
];

export const COLLECTIONS = [
  {
    slug: "core-collection",
    title: "The Core Collection",
    description:
      "Six definitive atmospheres exploring light, shadow, intimacy, and memory.",
    image: "/images/products/halo.jpg",
    count: 6,
  },
  {
    slug: "discovery-collection",
    title: "Discovery Collection",
    description:
      "Curated sets and miniature flacons designed for sensory exploration and quiet revelation.",
    image: "/images/products/discovery-set.jpg",
    count: 2,
  },
  {
    slug: "limited-editions",
    title: "Limited Editions",
    description:
      "Small-batch extraits and singular extractions released in restrained quantities.",
    image: "/images/products/sable.jpg",
    count: 1,
  },
  {
    slug: "seasonal-atmospheres",
    title: "Seasonal Atmospheres",
    description:
      "Scents curated for shifts in ambient temperature, autumn light, and rainy mornings.",
    image: "/images/products/after-rain.jpg",
    count: 3,
  },
];

export const CATEGORIES = [
  {
    slug: "floral",
    name: "Floral",
    description:
      "Airy, crystalline, and night-blooming compositions stripped of powdery sweetness.",
    matchingFamilies: ["Musky Floral", "Amber Floral"],
  },
  {
    slug: "woody",
    name: "Woody",
    description:
      "Dry cedar, pale sandalwood, and resinous bark conveying structural elegance.",
    matchingFamilies: ["Woody Amber", "Woody Musk", "Woody Spicy", "Fresh Woody"],
  },
  {
    slug: "amber",
    name: "Amber",
    description:
      "Golden resins, warm spices, and smoked vanilla capturing the aura of twilight.",
    matchingFamilies: ["Woody Amber", "Amber Floral"],
  },
  {
    slug: "fresh",
    name: "Fresh",
    description:
      "Mineral accords, rain-drenched moss, and crisp citrus with grounded depth.",
    matchingFamilies: ["Fresh Woody"],
  },
  {
    slug: "musk",
    name: "Musk",
    description:
      "Second-skin scents that merge seamlessly with personal warmth and silence.",
    matchingFamilies: ["Musky Floral", "Woody Musk"],
  },
  {
    slug: "spicy",
    name: "Spicy",
    description:
      "Aromatic cardamom, cracked black pepper, and warm saffron over dark woods.",
    matchingFamilies: ["Woody Spicy"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
}

export function getProductsByCategory(categorySlug: string): Product[] {
  const category = CATEGORIES.find((c) => c.slug.toLowerCase() === categorySlug.toLowerCase());
  if (!category) return [];
  return PRODUCTS.filter((p) => category.matchingFamilies.includes(p.family));
}

export function getRelatedProducts(currentSlug: string, limit = 3): Product[] {
  return PRODUCTS.filter((p) => p.slug !== currentSlug).slice(0, limit);
}

export function getNewArrivals(): Product[] {
  return PRODUCTS.filter((p) => p.isNew);
}

export function getBestSellers(): Product[] {
  return PRODUCTS.filter((p) => p.isBestSeller);
}

export function getDiscoverySets(): Product[] {
  return PRODUCTS.filter((p) => p.family === "Discovery");
}
