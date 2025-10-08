'use client'

import { CreateMainEvent, UpdateEvent, DeleteEvent } from "./TaskForm";

export default function TaskPage({tasks}) {
  return (
    <div className="max-w-6xl mx-auto py-6">
      <h1 className="text-3xl font-bold mb-5">Kelola Tugas Kelas</h1>

      <h2 className="text-xl mb-2">Tambah Event Baru</h2>
      <CreateMainEvent />

      <h2 className="text-xl mt-8 mb-2">Daftar Tugas</h2>
      <ul>
        {tasks.map((task) => (
          <li
            key={task._id}
            className="py-2 flex justify-between items-center"
          >
            <div className="w-full">
              <div className="flex flex-row justify-between">
                <div>
                <h3 className="font-semibold text-xl">{task.title}</h3>
                <p>{task.format}</p>
                <p>{task.upload}</p>
                <p>{task.detail}</p>
                <p>{task.format}</p>
                <p>{task.format}</p>
                </div>
                <div className="space-y-4 flex space-x-2">
                  <DeleteEvent id={task._id} />
                  <UpdateEvent id={task._id} currentTitle={task.title} />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
