import { NextResponse } from "next/server";
import { Progress } from "@/interfaces/interfaces";

export async function POST(req: Request) {
  try {
    // Parse the request JSON data
    const data: Progress = await req.json();

    // Send data to the API endpoint for Progress
    const response = await fetch(`${process.env.API_HOST}progress/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Handle unsuccessful response
    if (!response.ok) {
      throw new Error(`Error saving progress data: ${response.statusText}`);
    }

    // Parse and return the response data
    const responseData = await response.json();
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error saving progress data:", error);
    return new NextResponse("Error saving progress data", {
      status: 500,
    });
  }
}
