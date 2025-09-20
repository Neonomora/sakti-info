import { connectDB } from "@/lib/mongoose";
import UkmEvent from "@/models/ukm/UkmEvent";

export async function GET() {
  try {
    await connectDB();
    const result = await UkmEvent.find().sort({createdAt : -1});
    return Response.json(result);
  } catch (error) {
    console.error("GET /api/admin/ukm/event error:", error);
    return Response.json({ error: "Failed to fetch Event" }, { status: 500 });
  }
}

