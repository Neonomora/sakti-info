import { connectDB } from "@/lib/mongoose";
import UKMEvent from "@/models/ukm/UkmEvent";
import AnnouncementUKM from "@/models/ukm/AnnouncementUKM";
import Event from "./Event";
import Announcement from "./Announcement";

export const revalidate = 60;

export default async function EventPage() {
  await connectDB();

  const [eventList, announcements] = await Promise.all([
    UKMEvent.find().lean().sort({ createdAt: -1 }),
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

  const plainAnnouncement = announcements.map((ann) => ({
    ...ann,
    _id: ann._id.toString(),
  }));

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-row">
        <section className="basis-1/3 pr-4">
          <h3 className="text-xl md:text-3xl text-center font-bold text-center mb-6 pl-4">
            Seputar UKM
          </h3>
          <div className="space-y-4">
            {plainAnnouncement.map((item) => (
              <Announcement key={item._id} announcement={item} />
            ))}
          </div>
        </section>
        <section className="basis-2/3 pl-4">
          <h2 className="text-xl md:text-3xl text-center font-bold text-center mb-6">
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
