import { defaultImageUploapError } from "@/constants/config.enum";
import { noCacheHeaders } from "@/constants/constant";
import { ErrorResponse } from "@/interfaces/interfaces";
import { NextResponse } from "next/server";

// Manejo del método POST para procesar PDFs
export async function POST(req: Request) {
  try {
    // Obtiene el contenido Base64 del PDF desde el cuerpo de la solicitud
    const { pdfBase64 } = await req.json();

    if (!pdfBase64) {
      return NextResponse.json(
        {
          error: "ValidationError",
          message: "There is no Base64 content to process.",
          statusCode: 400,
        },
        { status: 400, headers: noCacheHeaders }
      );
    }

    // Llamada al endpoint NestJS para procesar el PDF
    const nestResponse = await fetch(`${process.env.API_HOST}ocr/process-pdf`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pdfBase64 }),
    });

    // Manejo de errores basados en el código de estado
    if (!nestResponse.ok) {
      switch (nestResponse.status) {
        case 404:
          return NextResponse.json(
            {
              error: "ResourceNotFound",
              message: "The requested resource was not found on the server.",
              statusCode: 404,
            },
            { status: 404, headers: noCacheHeaders }
          );
        case 500:
          return NextResponse.json(
            {
              error: "InternalServerError",
              message:
                "An internal server error occurred while processing the PDF.",
              statusCode: 500,
            },
            { status: 500, headers: noCacheHeaders }
          );
        case 400:
          const errorData = await nestResponse.json();
          return NextResponse.json(
            {
              error: errorData.error || "BadRequest",
              message:
                errorData.message ||
                "The request could not be understood by the server.",
              statusCode: 400,
            },
            { status: 400, headers: noCacheHeaders }
          );
        default:
          return NextResponse.json(
            {
              error: "UnexpectedError",
              message: `An unexpected error occurred: ${nestResponse.statusText}`,
              statusCode: nestResponse.status,
            },
            { status: nestResponse.status, headers: noCacheHeaders }
          );
      }
    }

    // Respuesta exitosa
    const data = await nestResponse.json();
    return NextResponse.json(data, { headers: noCacheHeaders });
  } catch (error) {
    // Manejo de errores inesperados
    const uploadError = error as ErrorResponse;

    const errorMessage =
      uploadError?.message || defaultImageUploapError.message;
    const errorType = uploadError?.error || defaultImageUploapError.error;

    return NextResponse.json(
      {
        error: errorType,
        message: errorMessage,
        statusCode: 500,
      },
      { status: 500, headers: noCacheHeaders }
    );
  }
}
