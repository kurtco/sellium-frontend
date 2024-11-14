import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { recruiterCode: string } }
) {
  const recruiterCode = params.recruiterCode;
  try {
    const response = await fetch(
      `${process.env.API_HOST}users/${recruiterCode}/recruits`,
      {
        method: "GET",
        cache: "no-store", // Deshabilitar el caché explícitamente en la solicitud
      }
    );

    // Manejar respuesta no exitosa
    if (!response.ok) {
      throw new Error(`Error fetching recruiter data: ${response.statusText}`);
    }

    const data = await response.json();

    // Agregar encabezados para deshabilitar el caché en la respuesta
    const headers = new Headers({
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    });

    return NextResponse.json(data, { headers });
  } catch (error) {
    console.error("Error fetching recruiter data: ", error);
    return new NextResponse("Error fetching recruiter data", { status: 500 });
  }
}
