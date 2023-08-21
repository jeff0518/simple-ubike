import { hashPassword } from "../../../components/lib/auth";
import { connectToDatabase } from "@/components/lib/db";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  const data = req.body;

  const { email, password } = data;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message:
        "Invalid input - password should also be at least 7 characters long",
    });
    return;
  }

  const client = await connectToDatabase();
  const db = client.db();
  //檢查資料庫是否有相同帳號
  const existingUser = await db.collection("user").findOne({ email: email });
  if (existingUser) {
    res.status(422).json({ message: "User exists already" });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(password);
  const result = await db.collection("user").insertOne({
    email: email,
    password: hashedPassword,
  });

  res.status(201).json({ message: "Created user!" });
  client.close();
}

export default handler;
