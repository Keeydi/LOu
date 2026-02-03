import { useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fireSuccessConfetti } from "../lib/confetti";
import { playSuccessPop } from "../lib/sound";
import { setFlowStep } from "../lib/storage";
import { FOR_NAME } from "../config";
import { Toast } from "../components/Toast";

const PADDING = 16;
const MIN_DISTANCE = 140;

export default function InvitePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [noPos, setNoPos] = useState<{ x: number; y: number } | null>(null);
  const [toast, setToast] = useState("");
  const [noHoverCount, setNoHoverCount] = useState(0);
  const navigate = useNavigate();

  const moveNoButton = useCallback(
    (clientX: number, clientY: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = clientX - centerX;
      const dy = clientY - centerY;
      const dist = Math.hypot(dx, dy) || 1;
      if (dist < MIN_DISTANCE) {
        const angle = Math.atan2(dy, dx);
        const nx = centerX + Math.cos(angle + Math.PI) * (MIN_DISTANCE + 60) - rect.left;
        const ny = centerY + Math.sin(angle + Math.PI) * (MIN_DISTANCE + 60) - rect.top;
        const maxX = rect.width - 100 - PADDING;
        const maxY = rect.height - 48 - PADDING;
        const x = Math.max(PADDING, Math.min(maxX, nx));
        const y = Math.max(PADDING, Math.min(maxY, ny));
        setNoPos({ x, y });
      }
    },
    [],
  );

  const handleNoPointerEnter = (e: React.PointerEvent) => {
    moveNoButton(e.clientX, e.clientY);
    setNoHoverCount((c) => c + 1);
  };

  const handleYes = () => {
    playSuccessPop();
    fireSuccessConfetti();
    setFlowStep("restaurants");
    navigate("/restaurants");
  };

  const handleNoClick = () => {
    const messages = [
      "Nice try.",
      "The YES button is right there.",
      "I believe in you. Click YES.",
    ];
    const idx = Math.min(noHoverCount, messages.length - 1);
    setToast(messages[idx]);
    setTimeout(() => setToast(""), 2500);
  };

  const runawayMessage =
    noHoverCount >= 7
      ? "I'm not even mad, I'm impressed. Still saying no?"
      : noHoverCount >= 5
        ? "Okay okay we both know you're gonna say yes eventually."
        : noHoverCount >= 3
          ? "The button is tired of running. Just say yes already."
          : null;

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-4 py-8">
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-sm rounded-3xl bg-white/80 p-8 shadow-lg backdrop-blur-sm"
      >
        <p className="text-center text-xs text-pink-400/80 mb-1">You have one (1) very important question below</p>
        <h1 className="text-center text-2xl font-bold text-gray-800 mb-1">
          Will you be my date?
        </h1>
        <p className="text-center text-gray-600 text-sm mb-6">
          No pressure… but also yes pressure.
        </p>

        <div className="relative flex justify-center items-center gap-3 min-h-[52px]">
          <motion.button
            type="button"
            onClick={handleYes}
            animate={{
              scale: 1 + Math.min(noHoverCount * 0.06, 0.5),
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            whileHover={{ scale: 1.05 + Math.min(noHoverCount * 0.06, 0.5) }}
            whileTap={{ scale: 0.98 }}
            className="rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-7 py-3.5 text-lg font-semibold text-white shadow-lg transition hover:shadow-pink-300/50 min-w-[120px]"
          >
            YES
          </motion.button>
          <motion.button
            type="button"
            onClick={handleNoClick}
            onPointerEnter={handleNoPointerEnter}
            onPointerMove={handleNoPointerEnter}
            style={
              noPos
                ? { position: "absolute" as const, left: noPos.x, top: noPos.y }
                : undefined
            }
            className="rounded-2xl border-2 border-pink-300 bg-white px-7 py-3.5 text-lg font-medium text-gray-600 transition hover:border-pink-400 hover:bg-pink-50 min-w-[120px]"
          >
            NO
          </motion.button>
        </div>

        {runawayMessage && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center text-sm text-pink-600"
          >
            {runawayMessage}
          </motion.p>
        )}

        <p className="mt-6 text-center text-xs text-pink-300">P.S. You're really cute.</p>
        <p className="mt-2 text-center text-xs text-pink-200">Made for {FOR_NAME}</p>
      </motion.div>

      <Toast message={toast} visible={!!toast} />
    </div>
  );
}
