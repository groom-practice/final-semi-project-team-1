import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const res = await fetch(`${BASE_URL}/posts/${id}/comments`);

  if (!res.ok) {
    return NextResponse.json(
      { error: `getCommentsByPostId 오류: ${res.status} ${res.statusText}` },
      { status: res.status }
    );
  }

  const comments = await res.json();
  return NextResponse.json(comments);
}
