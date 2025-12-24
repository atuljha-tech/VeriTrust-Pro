import connectDB from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  await connectDB();

  const users = await User.find().select("name email role");

  return Response.json({
    success: true,
    count: users.length,
    users,
  });
}
