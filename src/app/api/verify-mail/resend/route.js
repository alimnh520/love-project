import { NextResponse } from "next/server"
import jwt from 'jsonwebtoken'

export const GET = async () => {
    const cookie = await request.cookies;
    const email = cookie.get('save-mail');
    try {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await emailVerify({email, otp})
        const hashedOtp = jwt.sign({ otp }, process.env.JWT_SECRET, { expiresIn: '2m' });
        const response = NextResponse.json({ message: 'otp resend successfully', success: true });
        response.cookies.set('otp', hashedOtp, {
            httpOnly: true,
            source: process.env.NODE_ENV === "production",
            sameSite: 'strict',
            maxAge: 2 * 60 * 1000,
            path: '/'
        });
        return response;
    } catch (error) {
        return NextResponse.json({ message: 'failed to send code', success: false });
    }
}