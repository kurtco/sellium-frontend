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

    if (!response.ok) {
      switch (response.status) {
        case 404:
          return NextResponse.json(
            {
              error: `User with userCode ${userCode} not found`,
              message: "The user does not exist in the database",
              statusCode: 404,
            },
            { status: 404 }
          );
        case 500:
          return NextResponse.json(
            {
              error: "Internal server error",
              message:
                "A problem occurred on the server while processing the request",
              statusCode: 500,
            },
            { status: 500 }
          );
        default:
          return NextResponse.json(
            {
              error: `Unexpected error: ${response.statusText}`,
              message: "An unexpected error occurred",
              statusCode: response.status,
            },
            { status: response.status }
          );
      }
    }

    const data = await response.json();
    return NextResponse.json(data); // success response
  } catch (error) {
    console.error("Error fetching user details:", error);
    return NextResponse.json(
      {
        error: "Error fetching user details",
        message:
          "An unexpected error occurred while communicating with the server",
        statusCode: 500,
      },
      { status: 500 }
    );
  }
}
