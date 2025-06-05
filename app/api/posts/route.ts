import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('_page') || '1';
  const limit = searchParams.get('_limit') || '10';

  const res = await fetch(`${BASE_URL}/posts?_page=${page}&_limit=${limit}`);

  if (!res.ok) {
    return NextResponse.json(
      { error: `getPosts 오류: ${res.status} ${res.statusText}` },
      { status: res.status }
    );
  }

  const posts = await res.json();
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  const newPost = await request.json();

  const res = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newPost),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: `createPost 오류: ${res.status} ${res.statusText}` },
      { status: res.status }
    );
  }

  const createdPost = await res.json();
  return NextResponse.json(createdPost);
}
