import UkmEvent from "@/models/ukm/UkmEvent";
import { connectDB } from "@/lib/mongoose";

export default async function EventsPage() {
  await connectDB();
  const eventsDb = await UkmEvent.find().lean();

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
    <>
      <ul>
        {events.map((event) => (
          <li key={event._id}>{event.title}</li>
        ))}
      </ul>
    </>
  );
}
