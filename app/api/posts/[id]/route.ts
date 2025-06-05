import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const res = await fetch(`${BASE_URL}/posts/${id}`);

  if (!res.ok) {
    return NextResponse.json(
      { error: `getPostById 오류: ${res.status} ${res.statusText}` },
      { status: res.status }
    );
  }

  const post = await res.json();
  return NextResponse.json(post);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const updatedPost = await request.json();

  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedPost),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: `updatePost 오류: ${res.status} ${res.statusText}` },
      { status: res.status }
    );
  }

  const post = await res.json();
  return NextResponse.json(post);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: `deletePost 오류: ${res.status} ${res.statusText}` },
      { status: res.status }
    );
  }

  return NextResponse.json({ message: '삭제 성공' });
}
