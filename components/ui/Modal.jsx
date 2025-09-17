import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

export default function Modal({ isOpen, onClose, children }) {
  const [show, setShow] = useState(false)

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEsc)
      setShow(true)
    } else {
      setShow(false)
    }
    return () => document.removeEventListener("keydown", handleEsc)
  }, [isOpen, onClose])

  // Delay unmount for animation
  const [shouldRender, setShouldRender] = useState(false)
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
    } else {
      const timeout = setTimeout(() => setShouldRender(false), 200) // match duration
      return () => clearTimeout(timeout)
    }
  }, [isOpen])

  if (!shouldRender) return null

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-colors duration-200 ${
        isOpen ? "bg-black/50" : "bg-transparent"
      }`}
    >
      {/* Modal box */}
      <div
        className={`bg-white rounded-md shadow-lg max-w-lg w-full max-h-[80vh] overflow-y-auto relative transform transition-all duration-200 ${
          show
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 translate-y-2"
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &#10005;
        </button>
        <div className="p-6">{children}</div>
      </div>
    </div>,
    document.body
  )
}
