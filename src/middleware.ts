import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // 직원용 도메인으로 접속한 경우
  if (hostname.includes('surveystaff.csderma.kr')) {
    // /admin이 아니고 API 요청도 아닌 경우 모두 관리자 페이지로 강제 연결(Rewrite)
    if (!url.pathname.startsWith('/admin') && !url.pathname.startsWith('/api')) {
      return NextResponse.rewrite(new URL('/admin', request.url));
    }
  }

  // 환자용 도메인인 경우 기존 흐름대로 진행
  return NextResponse.next();
}

export const config = {
  matcher: [
    // 정적 파일이나 시스템 경로를 제외한 모든 요청에 미들웨어 적용
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
