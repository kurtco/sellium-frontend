import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { userCode: string } }
) {
  const userCode = params.userCode;
  try {
    const response = await fetch(
      `${process.env.API_HOST}user-details/${userCode}`
    );
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching user details: ", error);
    return new NextResponse("Error fetching user details", { status: 500 });
  }
}
