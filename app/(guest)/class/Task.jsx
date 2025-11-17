"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const h3Style = "text-xs md:text-sm font-semibold ";
const contentStyle = "text-xs md:text-sm";
export default function TaskAccordion({ task }) {
  const date = task.dateTime;

  const formattedDate = format(date, "d MMMM yyyy, HH:MM", { locale: id });

  return (
    <Accordion
      type="single"
      collapsible
      className="w-10/12 md:w-full rounded-xl shadow-md my-2"
    >
      <AccordionItem value="task-detail">
        <AccordionTrigger className="text-left px-4 py-3 text-sm md:text-base font-medium border-b bg-white">
          {task.title}
        </AccordionTrigger>

        <AccordionContent className="p-4 space-y-2 text-xs md:text-sm text-black">
          <div>
            <span className={h3Style}>Format File: </span>
            <span className={contentStyle}>{task.format}</span>
          </div>
          <div>
            <span className={h3Style}>Upload: </span>
             <span className={contentStyle}>{task.upload}</span>
          </div>
          <div>
            <span className={h3Style}>Deadline: </span>
            <span className={contentStyle}>{formattedDate}</span>
          </div>
          <div>
            <span className={h3Style}>Detail: </span>
            <span className={contentStyle}>{task.detail}</span>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
