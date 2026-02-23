import { NextRequest, NextResponse } from "next/server";

const API_BASE = "https://myvinyls-django.fly.dev/api/rsd";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const apiPath = path.join("/");
  const search = request.nextUrl.searchParams.toString();
  const url = `${API_BASE}/${apiPath}/${search ? `?${search}` : ""}`;

  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: 300 },
  });

  const data = await res.json();
  return NextResponse.json(data);
}
