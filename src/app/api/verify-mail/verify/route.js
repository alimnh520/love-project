import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const POST = async (request) => {
    const cookie = await request.cookies;
    const otpToken = cookie.get('otp')?.value;

    try {
        const { otp } = await request.json();
        const verifyOtp = jwt.verify(otpToken, process.env.JWT_SECRET);
        
        if (verifyOtp.otp !== otp) {
            return NextResponse.json({ message: 'invalid otp', success: false });
        }
        if (verifyOtp.otp === otp) {
            const response = NextResponse.json({ message: 'verify successful', success: true });
            response.cookies.delete('otp');
            response.cookies.delete('save-mail');
            return response;
        }
    } catch (error) {
        return NextResponse.json({ message: 'Please resend code', success: false });
    }
}