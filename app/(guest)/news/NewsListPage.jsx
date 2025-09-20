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
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Seputar Kampus</h1>

      <ul className="flex flex-row gap-4 flex-wrap justify-center xl:justify-start">
        {newsList.map((item) => {
          const isOpen = openModalId === item._id

          return (
            <li
              key={item._id}
              className="w-64 h-40 p-4 border rounded-md hover:bg-gray-100 cursor-pointer flex-shrink-0 shadow border-gray-300"
            >
              <button
                onClick={() => handleOpen(item._id)}
                className="text-left w-full h-full flex flex-col justify-between cursor-pointer"
              >
                <h2 className="text-lg font-semibold line-clamp-2">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {item.content}
                </p>
              </button>

              {/* Modal untuk detail */}
              <Modal isOpen={isOpen} onClose={handleClose}>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-700 whitespace-pre-line">
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
