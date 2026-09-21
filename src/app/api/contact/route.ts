import { NextResponse } from "next/server";
import { validateContactForm } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const errors = validateContactForm(body);

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    // In production, dispatch email or save to Supabase
    return NextResponse.json({
      success: true,
      message: "Your message has been received by the RAPHÈLO concierge.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
