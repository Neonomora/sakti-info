import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { format } from "date-fns";

export default function EventAccordion({ event }) {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full max-w-2xl bg-white rounded-xl shadow-md mx-auto my-4"
    >
      <AccordionItem value="event-detail">
        <AccordionTrigger className="text-left px-4 py-3 text-md md:text-lg font-medium border-b">
          {event.title}
        </AccordionTrigger>

        <AccordionContent className="p-4">
          {event.subEvents && event.subEvents.length > 0 ? (
            <ul className="space-y-2">
              {event.subEvents.map((sub) => (
                <li
                  key={sub._id}
                  className="flex justify-between border-b pb-1"
                >
                  <span>{sub.title}</span>
                  <span className="text-sm text-gray-500">
                    {format(new Date(sub.time), "HH:mm")}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Tidak ada sub-event</p>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
