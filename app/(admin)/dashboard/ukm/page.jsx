import { connectDB } from "@/lib/mongoose";
import UkmEvent from "@/models/ukm/UkmEvent";
import { getNewsList } from "./announcements/actions";

import Togle from "./Togle";
import EventPage from "./events/EventPage";
import AnnForm from "./announcements/AnnForm";

export const revalidate = 5;

export default async function ClassPage() {
  await connectDB();
  const eventsDb = await UkmEvent.find().lean();
  const newsList = await getNewsList();

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
    <main className="max-w-6xl mx-auto">
      <Togle
        event={<EventPage events={events} />}
        ann={<AnnForm newsList={newsList} />}
      />
    </main>
  );
}
