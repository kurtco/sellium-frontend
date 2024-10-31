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
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error saving job information:", error);
    return new NextResponse("Error saving job information", {
      status: 500,
    });
  }
}
