import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return new NextResponse("No file provided", { status: 400 });
    }
    const nestResponse = await fetch(
      `${process.env.API_HOST}ocr/imagetobase64`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!nestResponse.ok) {
      throw new Error(`NestJS API Error: ${nestResponse.statusText}`);
    }
    const base64Data = await nestResponse.text();
    return NextResponse.json({
      statusCode: nestResponse.status,
      base64: base64Data,
    });
  } catch (error) {
    console.error("Error converting image to base64:", error);
    return new NextResponse("Error converting image to base64", {
      status: 500,
    });
  }
}
