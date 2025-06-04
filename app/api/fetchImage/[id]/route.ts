import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const res = await fetch(`https://picsum.photos/id/${id}/info`);
    if (!res.ok) throw new Error("이미지 상세정보 불러오기 실패");

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      {
        message: "이미지 상세정보 fetching 중 에러 발생",
        error: (err as Error).message,
      },
      { status: 500 }
    );
  }
}
