import { NextResponse } from "next/server";
import { DataFromImage } from "@/interfaces/interfaces";

export async function POST(req: Request) {
  try {
    const data: DataFromImage = await req.json();
    console.log("function api post creating user", data);

    // Enviar datos a la API remota
    const response = await fetch(
      `${process.env.API_HOST}users/updateuserposition`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    // Manejar respuesta no exitosa
    if (!response.ok) {
      throw new Error(`Error creating new user: ${response.statusText}`);
    }

    const responseData = await response.json();

    // Agregar encabezados para deshabilitar el caché en la respuesta
    const headers = new Headers({
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    });

    return NextResponse.json(responseData, { headers });
  } catch (error) {
    console.error("Error creating new user: ", error);
    return new NextResponse("Error creating new user", { status: 500 });
  }
}
