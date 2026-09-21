import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, email, shippingAddress } = body;

    if (!items || !items.length || !email || !shippingAddress) {
      return NextResponse.json(
        { error: "Missing required order parameters." },
        { status: 400 }
      );
    }

    const orderNumber = `RAP-${new Date().getFullYear()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    return NextResponse.json({
      success: true,
      orderNumber,
      message: "Order placed successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process checkout transaction." },
      { status: 500 }
    );
  }
}
