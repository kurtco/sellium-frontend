import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { userCode: string } }
) {
  const { userCode } = params;

  try {
    const { representative } = await req.json();
    console.log("representative", representative);
    const response = await fetch(
      `${process.env.API_HOST}/users/${userCode}/position`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ representative }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Error updating the user's position: ${response.statusText}`
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error updating the user's position: ", error);
    return new NextResponse("Error updating the user's position", {
      status: 500,
    });
  }
}
