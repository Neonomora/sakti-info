import { connectDB } from "@/lib/mongoose";
import ClassTask from "@/models/class/ClassTask";
import { getNewsList } from "./announcements/actions";

import Togle from "./Togle";
import TaskPage from "./tasks/TasksPage";
import AnnForm from "./announcements/AnnForm";

export const revalidate = 5;

export default async function ClassPage() {
  await connectDB();
  const tasksDb = await ClassTask.find().lean();
  const newsList = await getNewsList();

  const tasks = tasksDb.map((event) => ({
    ...event,
    _id: event._id.toString(),
  }));

  console.log(tasks)

  return (
    <main className="max-w-6xl mx-auto">
      <Togle
        event={<TaskPage tasks={tasks} />}
        ann={<AnnForm newsList={newsList} />}
      />
    </main>
  );
}
