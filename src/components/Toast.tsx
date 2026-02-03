import { motion, AnimatePresence } from "framer-motion";

type ToastProps = {
  message: string;
  visible: boolean;
  onDismiss?: () => void;
};

export function Toast({ message, visible }: ToastProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 rounded-2xl bg-pink-500/95 px-5 py-3 text-white shadow-lg backdrop-blur-sm"
          role="alert"
        >
          <span className="text-sm font-medium">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
