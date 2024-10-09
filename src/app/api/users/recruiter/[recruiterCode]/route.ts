import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { recruiterCode: string } }
) {
  const recruiterCode = params.recruiterCode;
  try {
    const response = await fetch(
      `${process.env.API_HOST}users/${recruiterCode}/recruits`
    );
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching recruiter data: ", error);
    return new NextResponse("Error fetching recruiter data", { status: 500 });
  }
}
