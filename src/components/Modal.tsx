import { motion, AnimatePresence } from "framer-motion";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  message: string;
};

export function Modal({ open, onClose, title, message }: ModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm"
            aria-hidden
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="fixed left-1/2 top-1/2 z-[91] w-[min(90vw,20rem)] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-6 shadow-xl"
            role="dialog"
            aria-modal
            aria-labelledby={title ? "modal-title" : undefined}
          >
            {title && (
              <h2 id="modal-title" className="text-center text-lg font-semibold text-gray-800 mb-2">
                {title}
              </h2>
            )}
            <p className="text-center text-gray-600 text-sm">{message}</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 w-full rounded-xl bg-pink-500 py-2.5 text-sm font-medium text-white transition hover:bg-pink-600 active:scale-[0.98]"
            >
              OK, got it
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
