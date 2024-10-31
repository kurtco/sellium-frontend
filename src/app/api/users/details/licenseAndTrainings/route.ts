import { NextResponse } from "next/server";
import { LicenseAndTrainings } from "@/interfaces/interfaces";

export async function POST(req: Request) {
  try {
    // Parse request JSON data
    const data: LicenseAndTrainings = await req.json();

    // Send data to the API endpoint
    const response = await fetch(
      `${process.env.API_HOST}license-trainings/save`,
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
        `Error saving license and training data: ${response.statusText}`
      );
    }

    // Parse the response data
    const responseData = await response.json();
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error saving license and training data:", error);
    return new NextResponse("Error saving license and training data", {
      status: 500,
    });
  }
}
