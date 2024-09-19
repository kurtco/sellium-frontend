import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { imageBase64 } = await req.json();
    const nestResponse = await fetch(`${process.env.API_HOST}ocr/process`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageBase64 }),
    });

    if (!nestResponse.ok) {
      throw new Error(`NestJS API Error: ${nestResponse.statusText}`);
    }

    const data = await nestResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error processing image: ", error);
    return new NextResponse("Error en la API POST", {
      status: 500,
    });
  }
}
