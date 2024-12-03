import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  let { searchParams } = url;
  let email = searchParams.get("email");

  await connectToDatabase();

  if (!email) {
    return NextResponse.json(
      { success: false, data: "Provide The Email" },
      { status: 500 }
    );
  }
  const user = await User.find({ email });
  if (Object.keys(user).length === 0) {
    return NextResponse.json(
      { success: false, err: "User not found" },
      { status: 404 }
    );
  }
  return NextResponse.json({ success: true, data: user }, { status: 200 });
}
