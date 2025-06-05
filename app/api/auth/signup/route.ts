import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://goorm-kakaotalk-api.vercel.app/api";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password, name, phoneNumber } = body;

  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ email, password, name, phoneNumber }),
  });
  const data = await res.json();
  if (!res.ok)
    return NextResponse.json(
      { error: data.message || "회원가입 실패" },
      { status: 400 }
    );
  return NextResponse.json(data);
}
