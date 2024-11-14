import { NextResponse } from "next/server";
import { JobInformation } from "@/interfaces/interfaces";

export async function POST(req: Request) {
  try {
    const data: JobInformation = await req.json();
    const response = await fetch(
      `${process.env.API_HOST}job-information/save`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error(`Error saving job information: ${response.statusText}`);
    }

    const responseData = await response.json();

    // Agregar encabezados para eliminar el caché
    const headers = new Headers({
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    });

    return NextResponse.json(responseData, { headers });
  } catch (error) {
    console.error("Error saving job information:", error);
    return new NextResponse("Error saving job information", {
      status: 500,
    });
  }
}
