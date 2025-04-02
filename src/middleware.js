import { NextResponse } from 'next/server'

export function middleware(request) {
    const cookie = request.cookies;
    const pathName = request.nextUrl.pathname;

    const otpToken = cookie.get('otp')?.value;
    const dashboardToken = cookie.get('next-auth.session-token')?.value;

    if (!otpToken && pathName === "/components/verify") {
        return NextResponse.redirect(new URL('/', request.url))
    }
    // if (!dashboardToken && pathName === "/components/dashboard") {
    //     return NextResponse.redirect(new URL('/components/login', request.url))
    // }
}

export const config = {
    matcher: [
        '/',
        '/components/dashboard',
        '/components/verify',
    ]
}