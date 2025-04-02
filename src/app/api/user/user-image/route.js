import { mongoClient } from "@/lib/mongoDb/mongoclient";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    try {

        const collection = (await mongoClient()).collection('publishimages');
        const data = await collection.find({}).toArray();

        return NextResponse.json({ message: data, success: true });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to load data', success: false });
    }
}