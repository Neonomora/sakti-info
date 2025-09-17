import { connectDB } from "@/lib/mongoose";
import CampusEvent from "@/models/event/CampusEvent";
import EventAccordion from "./EventAccordion";

export const revalidate = 60;

export default async function EventPage() {
  await connectDB();

  const eventList = await CampusEvent.find().lean();

  const plainEvents = eventList.map((event) => ({
    ...event,
    _id: event._id.toString(),
    subEvents:
      event.subEvents.map((sub) => ({
        ...sub,
        _id: sub._id.toString(),
      })),
  }));

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">
        Daftar Acara Kampus
      </h2>
      {plainEvents.map((event) => (
        <EventAccordion key={event._id} event={event} />
      ))}
    </div>
  );
}
