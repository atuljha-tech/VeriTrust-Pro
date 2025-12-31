import connectDB from "@/lib/db";
import AuditLog from "@/models/AuditLog";
import { verifyToken } from "@/lib/serverAuth";

export async function GET(req) {
  await connectDB();

  const user = verifyToken(req);

  if (user.role !== "admin") {
    return Response.json(
      { success: false, message: "Forbidden" },
      { status: 403 }
    );
  }

  const logs = await AuditLog.find()
    .sort({ createdAt: -1 })
    .limit(50)
    .lean();

  return Response.json({
    success: true,
    count: logs.length,
    logs,
  });
}
