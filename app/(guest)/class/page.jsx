import { connectDB } from "@/lib/mongoose";
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
    <div className="max-w-6xl mx-2 md:mx-auto">
      <div>
        <Filter/>
      </div>
      <div className="flex flex-row justify-between ml-4 md:-ml-4">
        {/* Left Column - Announcements */}
        <section className="basis-1/3">
          <h3 className="text-xl md:text-2xl font-semibold mb-4 text-center">
            Seputar Kelas
          </h3>
          <Announcement announcementList={plainAnnouncements} />
        </section>

        {/* Right Column - Tasks */}
        <section className="basis-2/3 flex flex-col items-center">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">
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
