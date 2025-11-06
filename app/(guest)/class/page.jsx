import { connectDB } from "@/lib/mongoose";
import Link from "next/link";
import ClassTask from "@/models/class/ClassTask";
import AnnouncementClass from "@/models/class/AnnouncementClass";
import TaskAccordion from "./Task";
import Announcement from "./Announcement";
import Filter from "./Filter";

export const revalidate = 60;

export default async function TaskPage({ searchParams }) {
  await connectDB();

  const { classFilter, subClassFilter } = await searchParams;

  const query = {};

  if (classFilter) {
    query.classFilter = classFilter;
  }

  if (subClassFilter) {
    query.subClassFilter = subClassFilter;
  }

  const [tasks, announcements] = await Promise.all([
    ClassTask.find(query).lean().sort({ createdAt: -1 }),
    AnnouncementClass.find(query).lean().sort({ createdAt: -1 }),
  ]);

  const plainTasks = tasks.map((task) => ({
    ...task,
    _id: task._id.toString(),
    deadlineDate: task.deadlineDate
      ? new Date(task.deadlineDate).toISOString()
      : null,
  }));

  const plainAnnouncements = announcements.map((announcement) => ({
    ...announcement,
    _id: announcement._id.toString(),
  }));

  return (
    <div className="max-w-6xl mx-auto">
      <div>
        <Filter/>
      </div>
      <div className="flex flex-row">
        {/* Left Column - Announcements */}
        <section className="basis-1/3">
          <h3 className="text-xl md:text-3xl font-bold mb-6 text-center xl:text-start xl:pl-10">
            Seputar Kelas
          </h3>
          <Announcement announcementList={plainAnnouncements} />
        </section>

        {/* Right Column - Tasks */}
        <section className="basis-2/3">
          <h2 className="text-3xl font-bold text-center mb-6">
            Daftar Tugas Kelas
          </h2>
          {plainTasks.map((task) => (
            <TaskAccordion key={task._id} task={task} />
          ))}
        </section>
      </div>
    </div>
  );
}
