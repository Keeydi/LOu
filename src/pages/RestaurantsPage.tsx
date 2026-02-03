import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { playErrorBuzz } from "../lib/sound";
import { setFlowStep } from "../lib/storage";
import { Modal } from "../components/Modal";

const RESTAURANTS = [
  {
    id: "mcdo",
    label: "MCDO",
    error: "This option is currently unavailable. Try again.",
  },
  {
    id: "manam",
    label: "MANAM",
    error: "Too fancy. System says no.",
  },
  {
    id: "blakes",
    label: "BLAKES",
    error: "Not today bestie.",
  },
  {
    id: "jolibee",
    label: "JOLLIBEE",
    error: "Bee is busy. Pick again.",
  },
  {
    id: "karinderya",
    label: "KARINDERYA",
    valid: true,
  },
] as const;

export default function RestaurantsPage() {
  const [modal, setModal] = useState<{ title?: string; message: string } | null>(null);
  const [shakeId, setShakeId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleOption = (r: (typeof RESTAURANTS)[number]) => {
    if ("valid" in r && r.valid) {
      setFlowStep("flower");
      navigate("/flower");
      return;
    }
    playErrorBuzz();
    setShakeId(r.id);
    setTimeout(() => setShakeId(null), 500);
    setModal({ title: "Nope", message: r.error });
  };

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        <p className="text-center text-xs text-pink-400/80 mb-1">You said yes. No take-backs.</p>
        <h1 className="text-center text-2xl font-bold text-gray-800 mb-1">
          Yay! Now choose where we eat.
        </h1>
        <p className="text-center text-gray-600 text-sm mb-6">
          Choose wisely.
        </p>
        <p className="text-center text-xs text-pink-300 mb-4">
          Hint: think homey, think ulam.
        </p>

        <ul className="space-y-3">
          {RESTAURANTS.map((r) => (
            <motion.li
              key={r.id}
              layout
              animate={shakeId === r.id ? { x: [0, -8, 8, -6, 6, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              <button
                type="button"
                onClick={() => handleOption(r)}
                className="w-full rounded-2xl border-2 border-pink-200 bg-white px-5 py-4 text-left font-medium text-gray-800 shadow-sm transition hover:border-pink-400 hover:bg-pink-50 hover:shadow-md active:scale-[0.99]"
              >
                {r.label}
              </button>
            </motion.li>
          ))}
        </ul>

        <p className="mt-6 text-center text-xs text-pink-300">
          One of these is the correct answer. I believe in you.
        </p>
      </motion.div>

      {modal && (
        <Modal
          open
          onClose={() => setModal(null)}
          title={modal.title}
          message={modal.message}
        />
      )}
    </div>
  );
}
