import { connectDb } from "@/lib/mongoDb/connectDb";
import userProfile from "@/models/userProfile";
import { NextResponse } from "next/server";
import bcrypt, { genSalt } from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { emailVerify } from "@/lib/sendMail";
import { mongoClient } from "@/lib/mongoDb/mongoclient";

export const POST = async (request) => {
    await connectDb();
    const collection = (await mongoClient()).collection('userprofiles');
    try {

        const { username, email, password } = await request.json();
        const findUser = await collection.findOne({email});



        if (!username || !email || !password) {
            return NextResponse.json({ message: 'required all', success: false });
        }
        if (findUser) {
            return NextResponse.json({ message: 'user already exist', success: false });
        }
        if (password.length < 6) {
            return NextResponse.json({message: 'required minimum 6 digit', success: false});
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedOtp = jwt.sign({ otp }, process.env.JWT_SECRET, { expiresIn: '2m' });

        const saltPass = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, saltPass);
        const user = new userProfile({
            username,
            email,
            password: hashedPass,
        });
        await user.save();

        await emailVerify({email, otp})

        const response = NextResponse.json({ message: 'signup successful', success: true });
        response.cookies.set('otp', hashedOtp, {
            httpOnly: true,
            source: process.env.NODE_ENV === "production",
            sameSite: 'strict',
            maxAge: 2 * 60 * 1000,
            path: '/'
        });
        response.cookies.set('save-mail', email, {
            httpOnly: true,
            source: process.env.NODE_ENV === "production",
            sameSite: 'strict',
            path: '/'
        });
        return response;
    } catch (error) {
        return NextResponse.json({ message: 'Failed to signup : ', error, success: false });
    }
}