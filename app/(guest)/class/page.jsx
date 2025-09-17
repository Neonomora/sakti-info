import { connectDB } from "@/lib/mongoose";
import ClassTask from "@/models/class/ClassTask";
import AnnouncementClass from "@/models/class/AnnouncementClass";
import TaskAccordion from "./TaskAccordion";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export const revalidate = 60;

export default async function TaskPage() {
  await connectDB();

  const [tasks, announcements] = await Promise.all([
    ClassTask.find().lean().sort({ createdAt: -1 }),
    AnnouncementClass.find().lean().sort({ createdAt: -1 }),
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
      <div className="flex flex-row justify-between gap-4">
        {/* Left Column - Announcements */}
        <section className="basis-1/3">
          <h3 className="text-2xl font-semibold mb-4 pl-4">Seputar Kelas</h3>
          <ul className="space-y-4">
            {plainAnnouncements.map((announcement) => (
              <li
                key={announcement._id}
                className="bg-white p-4 rounded-lg shadow"
              >
                <h4 className="text-xl font-bold">{announcement.title}</h4>
                <p>{announcement.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  <strong>Dibuat Pada:</strong>{" "}
                  {format(new Date(announcement.createdAt), "dd MMMM yyyy", {
                    locale: id,
                  })}
                </p>
              </li>
            ))}
          </ul>
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
