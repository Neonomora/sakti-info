import Modal from "./components/ui/modal"

export default function ConfirmModal({ isOpen, onClose, onConfirm, message }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className="text-lg font-semibold mb-4">Konfirmasi</h3>
      <p>{message}</p>
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outline" onClick={onClose}>Batal</Button>
        <Button variant="destructive" onClick={onConfirm}>Ya, Hapus</Button>
      </div>
    </Modal>
  );
}
