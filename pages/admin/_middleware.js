import { NextRequest, NextResponse } from 'next/server'
export async function middleware(request) {

    let response = NextResponse.next()

    const email = request.cookies["email"];
    const password = request.cookies["password"];
    if (!email) {
        const url = request.nextUrl.clone()
        url.pathname = '/auth'
        return NextResponse.redirect(url)
    }


    return response

}