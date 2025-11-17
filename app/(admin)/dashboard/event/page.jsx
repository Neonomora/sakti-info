import { connectDB } from "@/lib/mongoose";
import CampusEvent from "@/models/event/CampusEvent";
import {
  CreateMainEvent,
  UpdateEvent,
  DeleteEvent,
  CreateSubEvent,
} from "./EventForm";
import {
  createAction,
  createSubEventAction,
  deleteAction,
  updateAction
} from "./actions"

export const revalidate = 5;

export default async function AdminEventsPage() {
  await connectDB();
  const eventsDb = await CampusEvent.find().lean();

  const events = eventsDb.map((event) => ({
    ...event,
    _id: event._id.toString(),
    subEvents:
      event.subEvents?.map((sub) => ({
        ...sub,
        _id: sub._id.toString(),
        time: sub.time instanceof Date ? sub.time.toISOString() : sub.time,
      })) ?? [],
  }));

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-5">Kelola Event Kampus</h1>

      <h2 className="text-xl mb-2">Tambah Event Baru</h2>
      <CreateMainEvent createAction={createAction} />
      
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
                  <DeleteEvent id={event._id} deleteAction={deleteAction} />
                  <UpdateEvent id={event._id} currentTitle={event.title} updateAction={updateAction} />
                  <CreateSubEvent eventId={event._id} createSubEventAction={createSubEventAction} />
                </div>
              </div>
              <ul>
                {event.subEvents.map((subEvent) => (
                  <li key={subEvent._id} className="flex space-x-4 mb-4">
                    <div>{subEvent.title}</div>
                    <div className="flex space-x-2">
                      <DeleteEvent id={event._id} subId={subEvent._id} deleteAction={deleteAction}/>
                      <UpdateEvent
                        id={event._id}
                        subId={subEvent._id}
                        currentTitle={subEvent.title}
                        currentTime={subEvent.time}
                        updateAction={updateAction}
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
