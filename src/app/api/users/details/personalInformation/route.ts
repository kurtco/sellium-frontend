import { NextResponse } from "next/server";
import { PersonalInformation } from "@/interfaces/interfaces";

export async function POST(req: Request) {
  try {
    // Parse request JSON data
    const data: PersonalInformation = await req.json();

    // Send data to the API endpoint
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

    // Handle unsuccessful response
    if (!response.ok) {
      throw new Error(
        `Error saving personal information: ${response.statusText}`
      );
    }

    // Parse the response data
    const responseData = await response.json();

    // Add headers to disable caching
    const headers = new Headers({
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    });

    return NextResponse.json(responseData, { headers });
  } catch (error) {
    console.error("Error saving personal information:", error);
    return new NextResponse("Error saving personal information", {
      status: 500,
    });
  }
}
