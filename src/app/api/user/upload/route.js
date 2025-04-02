import { UploadImage } from "@/lib/cloudinary/cloudImage";
import { connectDb } from "@/lib/mongoDb/connectDb";
import { mongoClient } from "@/lib/mongoDb/mongoclient";
import publishImage from "@/models/publishImage";
import { NextResponse } from "next/server"

export const POST = async (request) => {
    const cookie = await request.cookies;

    await connectDb();

    const collection = (await mongoClient()).collection('userprofiles');

    try {
        const formData = await request.formData();
        const email = formData.get('email');
        const text = formData.get('text');
        const image = formData.get('image');

        const uploadResult = await UploadImage(image, 'love')

        const user = await collection.findOneAndUpdate({ email: 'alimnh520@gmail.com' }, {
            $push: {
                images: {
                    url: uploadResult.url,
                    text,
                    format: image.type.split('/')[1],
                    public_id: uploadResult.public_id,
                }
            }
        });

        const userImage = new publishImage({
            username: user.username,
            userImage: user.image,
            img_url: uploadResult.url,
            text,
        });
        await userImage.save();

        return NextResponse.json({ message: 'Upload successful', success: true });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error, success: false });
    }
}