import { connectDB } from "@/lib/mongoose";
import UkmEvent from "@/models/ukm/UkmEvent";
import AnnouncementUKM from "@/models/ukm/AnnouncementUKM";

import Event from "./Event";
import Announcement from "./Announcement";

export const revalidate = 60;

export default async function EventPage() {
  await connectDB();

  const [eventList, announcements] = await Promise.all([
    UkmEvent.find().lean().sort({ createdAt: -1 }),
    AnnouncementUKM.find().lean().sort({ createdAt: -1 }),
  ]);

  const plainEvents = eventList.map((event) => ({
    ...event,
    _id: event._id.toString(),
    subEvents:
      event.subEvents?.map((sub) => ({
        ...sub,
        _id: sub._id.toString(),
      })) ?? [],
  }));

  const newsList = announcements.map((ann) => ({
    ...ann,
    _id: ann._id.toString(),
  }));

  return (
    <div className="max-w-6xl mx-2">
      <div className="flex flex-row justify-between ml-4 md:-ml-4">
        <section className="basis-1/3">
          <h3 className="text-xl md:text-2xl font-semibold mb-4 text-center">
            Seputar UKM
          </h3>
          <div className="space-y-4">
            <Announcement newsList={newsList} />
          </div>
        </section>
        <section className="basis-2/3 flex flex-col items-center">
          <h2 className="text-xl mb-2 md:text-2xl text-center font-semibold text-center">
            Daftar Acara UKM
          </h2>
          {plainEvents.map((event) => (
            <Event key={event._id} event={event} />
          ))}
        </section>
      </div>
    </div>
  );
}
