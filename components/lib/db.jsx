import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://jeffwang:beS1PJ7uRW3oc165@cluster0.w6rfo7r.mongodb.net/next-ubike?retryWrites=true&w=majority"
  );

  return client;
}
