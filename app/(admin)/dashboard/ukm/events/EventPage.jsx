'use client'

import { CreateMainEvent, UpdateEvent, DeleteEvent, CreateSubEvent } from "./EventForm";

export default function EventPage({events}) {
  return (
    <div className="max-w-6xl mx-auto py-6">
      <h1 className="text-3xl font-bold mb-5">Kelola Event UKM</h1>

      <h2 className="text-xl mb-2">Tambah Event Baru</h2>
      <CreateMainEvent />

      <h2 className="text-xl mt-8 mb-2">Daftar Event</h2>
      <ul>
        {events.map((event) => (
          <li
            key={event._id}
            className="py-2 flex justify-between items-center"
          >
            <div className="w-full">
              <div className="flex flex-row justify-between">
                <div className="font-semibold text-xl">{event.title}</div>
                <div className="space-y-4 flex space-x-2">
                  <DeleteEvent id={event._id} />
                  <UpdateEvent id={event._id} currentTitle={event.title} />
                  <CreateSubEvent eventId={event._id} />
                </div>
              </div>
              <ul>
                {event.subEvents.map((subEvent) => (
                  <li key={subEvent._id} className="flex space-x-4 mb-4">
                    <div>{subEvent.title}</div>
                    <div className="flex space-x-2">
                      <DeleteEvent id={event._id} subId={subEvent._id} />
                      <UpdateEvent
                        id={event._id}
                        subId={subEvent._id}
                        currentTitle={subEvent.title}
                        currentTime={subEvent.time}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
