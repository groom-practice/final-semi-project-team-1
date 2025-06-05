import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  const res = await fetch(`${BASE_URL}/users/${userId}`);

  if (!res.ok) {
    return NextResponse.json(
      { error: `getUserById 오류: ${res.status} ${res.statusText}` },
      { status: res.status }
    );
  }

  const user = await res.json();
  return NextResponse.json(user);
}
