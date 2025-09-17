import { connectDB } from "@/lib/mongoose";
import UKMEvent from "@/models/ukm/UkmEvent";
import AnnouncementUKM from "@/models/ukm/AnnouncementUKM";
import EventAccordion from "./EventAccordion";
import { format } from "date-fns";
import { id } from "date-fns/locale";

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

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-row">
        <section className="basis-1/3 pr-4">
          <h3 className="text-2xl font-semibold mb-4 pl-4">Seputar UKM</h3>
          <ul className="space-y-4">
            {announcements.map((announcement) => (
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
        <section className="basis-2/3 pl-4">
          <h2 className="text-3xl font-bold text-center mb-6">
            Daftar Acara UKM
          </h2>
          {plainEvents.map((event) => (
            <EventAccordion key={event._id} event={event} />
          ))}
        </section>
      </div>
    </div>
  );
}
