import { mongoClient } from "@/lib/mongoDb/mongoclient";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    try {
        const { email } = await request.json();

        const collection = (await mongoClient()).collection('userprofiles');

        const data = await collection.findOne({email: 'alimnh520@gmail.com'});
        return NextResponse.json({message: data, success: true});
    } catch (error) {
        return NextResponse.json({message: 'Failed to load data', success: false});
    }
}