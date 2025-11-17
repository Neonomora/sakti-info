"use client"

import { useState } from "react"
import Modal from "@/components/ui/Modal"

export default function Announcement({ newsList }) {
  const [openModalId, setOpenModalId] = useState(null)

  const handleOpen = (id) => {
    setOpenModalId(id)
  }

  const handleClose = () => {
    setOpenModalId(null)
  }

  return (
    <>
      <ul className="flex flex-col gap-4 justify-center items-center">
        {newsList.map((item) => {
          const isOpen = openModalId === item._id

          return (
            <li
              key={item._id}
              className="w-full md:h-30 md:w-80 h-24 p-4 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer shadow border-gray-300 bg-white"
            >
              <button
                onClick={() => handleOpen(item._id)}
                className="text-left w-full h-full flex flex-col justify-between cursor-pointer"
              >
                <h2 className="text-sm md:text-base font-medium line-clamp-1 md:line-clamp-2">
                  {item.title}
                </h2>
                <p className="text-xs md:text-sm text-gray-600 mt-2 line-clamp-2 md:line-clamp-3">
                  {item.content}
                </p>
              </button>

              {/* Modal untuk detail */}
              <Modal isOpen={isOpen} onClose={handleClose}>
                <h3 className="text-lg md:text-2xl font-medium mb-2">{item.title}</h3>
                <p className="text-sm md:text-base text-gray-700 whitespace-pre-line">
                  {item.content}
                </p>
              </Modal>
            </li>
          )
        })}
      </ul>
    </>
  )
}