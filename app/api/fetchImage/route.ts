import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://picsum.photos/v2/list");
    if (!res.ok) throw new Error("이미지 리스트 불러오기 실패");

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      {
        message: "이미지 리스트 fetching 중 에러 발생",
        error: (err as Error).message,
      },
      { status: 500 }
    );
  }
}
