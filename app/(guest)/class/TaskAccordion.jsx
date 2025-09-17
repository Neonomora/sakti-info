"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function TaskAccordion({ task }) {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full max-w-2xl bg-white rounded-xl shadow-md mx-auto my-4"
    >
      <AccordionItem value="task-detail">
        <AccordionTrigger className="text-left px-4 py-3 text-lg font-medium border-b">
          {task.title}
        </AccordionTrigger>

        <AccordionContent className="p-4 space-y-2 text-sm text-gray-700">
          <div>
            <strong>Format File:</strong> {task.formatFile}
          </div>
          <div>
            <strong>Upload:</strong> {task.upload}
          </div>
          <div>
            <strong>Deadline:</strong>{" "}
            {format(new Date(task.deadlineDate), "dd MMMM yyyy", {
              locale: id,
            })}{" "}
            {task.deadlineTime}
          </div>
          <div>
            <strong>Detail:</strong> {task.detail}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
