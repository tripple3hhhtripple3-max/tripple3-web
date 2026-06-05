import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/forms/public/${id}/submit`;
    const ip = request.headers.get("x-forwarded-for") || "";
    const userAgent = request.headers.get("user-agent") || "";

    const response = await axios.post(backendUrl, body, {
      headers: {
        "x-forwarded-for": ip,
        "user-agent": userAgent,
      },
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    console.error("Form proxy error:", error);
    return NextResponse.json(
      { message: error.response?.data?.message || "Failed to submit form" },
      { status: error.response?.status || 500 }
    );
  }
}
