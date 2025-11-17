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
      className="w-10/12 md:w-full rounded-xl shadow-md my-2"
    >
      <AccordionItem value="event-detail">
        <AccordionTrigger className="text-left px-4 py-3 text-sm md:text-base font-medium border-b bg-white">
          {event.title}
        </AccordionTrigger>

        <AccordionContent className="p-4 space-y-2 text-xs md:text-sm text-black">
          {event.subEvents && event.subEvents.length > 0 ? (
            <ul>
              {event.subEvents.map((sub) => (
                <li
                  key={sub._id}
                  className="flex justify-between border-b pb-1"
                >
                  <span className="text-xs md:text-sm">{sub.title}</span>
                  <span className="text-xs md:text-sm text-gray-500">
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
