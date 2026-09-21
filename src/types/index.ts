export type FragranceFamily =
  | "Musky Floral"
  | "Woody Amber"
  | "Woody Musk"
  | "Amber Floral"
  | "Woody Spicy"
  | "Fresh Woody"
  | "Discovery";

export interface FragranceNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  family: FragranceFamily;
  category: "Floral" | "Woody" | "Amber" | "Fresh" | "Musk" | "Spicy" | "Discovery";
  description: string;
  atmosphere: string;
  notes: FragranceNotes;
  price: number;
  compareAtPrice?: number;
  sizes: string[];
  images: string[];
  badge?: "NEW" | "BEST SELLER" | "LIMITED";
  inventory: number;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isSale?: boolean;
  details: {
    concentration: string;
    origin: string;
    ingredients: string;
  };
}

export interface CartItem {
  id: string; // unique item key: productId-size
  product: Product;
  size: string;
  quantity: number;
  price: number;
}

export interface Review {
  id: string;
  productId: string;
  authorName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
}

export interface JournalArticle {
  slug: string;
  title: string;
  category: "Fragrance" | "Culture" | "Materials" | "Places" | "Stories";
  excerpt: string;
  content: string[];
  readTime: string;
  publishedAt: string;
  imageUrl: string;
  author: string;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export interface Address {
  id: string;
  firstName: string;
  lastName: string;
  street: string;
  apartment?: string;
  city: string;
  province: string;
  postalCode: string;
  phone?: string;
  isDefault?: boolean;
}

export interface OrderItem {
  productId: string;
  productName: string;
  size: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  email: string;
  date: string;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingAddress: Address;
  paymentMethod: string;
}

