import { NextResponse } from "next/server";
import { PersonalInformation } from "@/interfaces/interfaces";

export async function POST(req: Request) {
  try {
    const data: PersonalInformation = await req.json();

    // Enviamos la solicitud al backend de NestJS
    const response = await fetch(
      `${process.env.API_HOST}personal-information/save`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error(
        `Error saving personal information: ${response.statusText}`
      );
    }
    const responseData = await response.json();
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error saving personal information:", error);
    return new NextResponse("Error saving personal information", {
      status: 500,
    });
  }
}
