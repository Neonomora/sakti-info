"use client"

import { useState } from "react"
import Modal from "@/components/ui/Modal"

export default function NewsListPage({ newsList }) {
  const [openModalId, setOpenModalId] = useState(null)

  const handleOpen = (id) => {
    setOpenModalId(id)
  }

  const handleClose = () => {
    setOpenModalId(null)
  }

  return (
    <div className="max-w-6xl mx-6">
      <h1 className="text-xl md:text-2xl font-semibold mb-6 text-center">Seputar Kampus</h1>

      <ul className="flex flex-row gap-4 flex-wrap justify-center ">
        {newsList.map((item) => {
          const isOpen = openModalId === item._id

          return (
            <li
              key={item._id}
              className="w-full h-32 py-4 px-6 border rounded-xl hover:bg-gray-100 cursor-pointer shadow-md border-gray-300 bg-white"
            >
              <button
                onClick={() => handleOpen(item._id)}
                className="text-left w-full h-full flex flex-col justify-evenly cursor-pointer"
              >
                <h2 className="text-base md:text-lg font-medium line-clamp-2">
                  {item.title}
                </h2>
                <p className="text-xs md:text-sm text-gray-600 mt-2 line-clamp-2">
                  {item.content}
                </p>
              </button>

              {/* Modal untuk detail */}
              <Modal isOpen={isOpen} onClose={handleClose}>
                <h3 className="text-base md:text-2xl font-medium mb-2">{item.title}</h3>
                <p className="text-sm md:text-base text-gray-700 whitespace-pre-line">
                  {item.content}
                </p>
              </Modal>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
