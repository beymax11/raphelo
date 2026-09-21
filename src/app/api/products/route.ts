import { NextResponse } from "next/server";
import { PRODUCTS } from "@/lib/products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const family = searchParams.get("family");
  const slug = searchParams.get("slug");

  if (slug) {
    const product = PRODUCTS.find((p) => p.slug === slug);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  }

  let results = PRODUCTS;
  if (family) {
    results = results.filter(
      (p) => p.family.toLowerCase() === family.toLowerCase()
    );
  }

  return NextResponse.json(results);
}
