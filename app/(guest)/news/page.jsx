import { connectDB } from "@/lib/mongoose";
import News from "@/models/news/News";
import NewsListPage from "./NewsListPage";

export const revalidate = 60;

export default async function NewsPage() {
  await connectDB();

  const newsListRaw = await News.find().sort({ createdAt: -1 }).lean();

  const newsList = newsListRaw.map((item) => ({
    ...item,
    _id: item._id.toString(),
    createdAt: item.createdAt?.toISOString(),
    updatedAt: item.updatedAt?.toISOString(),
  }));

  return (
    <div className="mx-auto max-w-6xl">
      <NewsListPage newsList={newsList} />
    </div>
  );
}
