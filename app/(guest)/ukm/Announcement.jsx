import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function Announcement({ announcement }) {
  return (
    <Accordion
      type="single"
      collapsible
      className="bg-white rounded-xl shadow-md mx-auto"
    >
      <AccordionItem value="event-detail" className="px-4">
        <AccordionTrigger>
          <h4 className="text-lg font-medium">{announcement.title}</h4>
        </AccordionTrigger>
        <AccordionContent>
          <div>
            <p className="text-sm font-light text-center">
              {announcement.description}
            </p>
            <p className="text-xs font-thin text-gray-500 mt-2">
              <strong>Dibuat Pada:</strong>{" "}
              {format(new Date(announcement.createdAt), "dd MMMM yyyy", {
                locale: id,
              })}
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
