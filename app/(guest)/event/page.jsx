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
    <div className="max-w-6xl mx-6">
      <h1 className="text-xl md:text-2xl font-semibold text-center mb-6">
        Daftar Acara Kampus
      </h1>
      {plainEvents.map((event) => (
        <EventAccordion key={event._id} event={event} />
      ))}
    </div>
  );
}
