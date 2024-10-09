import { NextResponse } from "next/server";
import { DataFromImage } from "@/interfaces/interfaces";

export async function POST(req: Request) {
  try {
    const data: DataFromImage = await req.json();
    console.log("funtion api post creating user", data);
    const response = await fetch(`${process.env.API_HOST}users/newUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error creating new user: ${response.statusText}`);
    }

    const responseData = await response.json();
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error creating new user: ", error);
    return new NextResponse("Error creating new user", { status: 500 });
  }
}
