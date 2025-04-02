import { MongoClient } from "mongodb";

export const mongoClient = async() => {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    await client.connect();
    const collection = client.db('test');
    return collection
}