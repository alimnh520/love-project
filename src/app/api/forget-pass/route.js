import { NextResponse } from "next/server"
import bcrypt from 'bcryptjs'

export const POST = async(request) => {
    try {
        const {password, confirmPassword} = await request.json();

        if (password.length < 6 || confirmPassword.length < 6) {
            return NextResponse.json({message: 'required minimum 6 digit', success: false});
        }
        if (password !== confirmPassword) {
            return NextResponse.json({message: 'password does not match', success: false});
        }

        const genPass = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, genPass);
        
        return NextResponse.json({message: 'password change successfully', success: true});
    } catch (error) {
        return NextResponse.json({message: 'Failed to change password', success: false});
    }
}