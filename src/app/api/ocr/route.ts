import { defaultImageUploapError } from "@/constants/constant";
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
      const errorData = await nestResponse.json();
      return NextResponse.json(errorData, { status: nestResponse.status });
    }

    const data = await nestResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : defaultImageUploapError;

    return NextResponse.json(
      {
        message: "Error en la API POST",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
