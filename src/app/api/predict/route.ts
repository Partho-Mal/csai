import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { features } = await req.json();

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ features }),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
