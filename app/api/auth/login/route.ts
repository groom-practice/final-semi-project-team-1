import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://goorm-kakaotalk-api.vercel.app/api";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body;
  const res = await fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok)
    return NextResponse.json(
      { error: data.message || "로그인 실패" },
      { status: 400 }
    );
  return NextResponse.json(data);
}
