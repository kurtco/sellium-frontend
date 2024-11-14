import { defaultImageUploapError } from "@/constants/config.enum";
import { ErrorResponse } from "@/interfaces/interfaces";
import { NextResponse } from "next/server";

// Constante para los encabezados
const noCacheHeaders = new Headers({
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  Pragma: "no-cache",
  Expires: "0",
});

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
      return NextResponse.json(errorData, {
        status: nestResponse.status,
        headers: noCacheHeaders,
      });
    }

    const data = await nestResponse.json();

    return NextResponse.json(data, { headers: noCacheHeaders });
  } catch (error) {
    const uploadError = error as ErrorResponse;

    const errorMessage =
      uploadError?.message || defaultImageUploapError.message;
    const errorType = uploadError?.error || defaultImageUploapError.error;
    const userCode = uploadError?.userCode || "";

    return NextResponse.json(
      {
        error: errorType,
        message: errorMessage,
        userCode,
      },
      { status: 500, headers: noCacheHeaders }
    );
  }
}
