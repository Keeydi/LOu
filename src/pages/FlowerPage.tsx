import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { setFlowStep } from "../lib/storage";
import { getGoogleCalendarUrl, downloadIcs } from "../lib/calendar";
import photo1 from "../assets/photos/1.png";
import photo2 from "../assets/photos/2.png";
import photo4 from "../assets/photos/4.png";
import photo5 from "../assets/photos/5.png";
import photo6 from "../assets/photos/6.png";
import photo8 from "../assets/photos/8.png";
import photo9 from "../assets/photos/9.png";

const DEFAULT_DATE = "Feb 14, 2026";
const DEFAULT_TIME = "6:00 PM";
const DEFAULT_PLACE = "Karinderya date = best date.";
const CALENDAR_TITLE = "Valentine Date";

const GALLERY_PHOTOS = [photo1, photo2, photo4, photo5, photo6, photo8, photo9];

export default function FlowerPage() {
  const [bloomStep, setBloomStep] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setFlowStep("flower");
  }, []);

  useEffect(() => {
    const steps = ["stemGrow", "leafPop", "petalsBloom", "sparkles"];
    if (bloomStep >= steps.length) return;
    const t = setTimeout(() => setBloomStep((s) => s + 1), 600);
    return () => clearTimeout(t);
  }, [bloomStep]);

  const loopBloom = bloomStep >= 4;
  useEffect(() => {
    if (!loopBloom) return;
    const id = setInterval(() => setBloomStep(0), 3000);
    return () => clearInterval(id);
  }, [loopBloom]);

  const shareMessage = `She said yes! We're having a Karinderya date. Best date ever.`;

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(shareMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleAddToCalendar = () => {
    const url = getGoogleCalendarUrl(
      CALENDAR_TITLE,
      DEFAULT_DATE,
      DEFAULT_TIME,
      DEFAULT_PLACE,
      ""
    );
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleDownloadIcs = () => {
    downloadIcs(CALENDAR_TITLE, DEFAULT_DATE, DEFAULT_TIME, DEFAULT_PLACE, "");
  };

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-sm text-center"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          Correct answer.
        </h1>
        <p className="text-gray-600 text-sm mb-6">
          See you on our date!
        </p>

        {/* Animated flower */}
        <div className="relative flex justify-center items-end h-48 mb-6">
          {/* Stem */}
          <motion.div
            className="absolute bottom-0 w-1.5 bg-green-600 rounded-full origin-bottom"
            initial={{ height: 0 }}
            animate={{ height: bloomStep >= 1 ? 80 : 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ bottom: 24 }}
          />
          {/* Leaves */}
          {bloomStep >= 2 && (
            <>
              <motion.div
                className="absolute w-4 h-3 bg-green-500 rounded-full origin-left"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{ left: "50%", bottom: 56, marginLeft: -32, transform: "rotate(-30deg)" }}
              />
              <motion.div
                className="absolute w-4 h-3 bg-green-500 rounded-full origin-right"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{ left: "50%", bottom: 48, marginLeft: 8, transform: "rotate(30deg)" }}
              />
            </>
          )}
          {/* Petals */}
          {bloomStep >= 3 && (
            <motion.div
              className="absolute w-16 h-16 rounded-full"
              style={{ bottom: 88 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute w-6 h-8 rounded-full bg-pink-400"
                    style={{
                      transform: `rotate(${i * 72}deg) translateY(-12px)`,
                      transformOrigin: "center 12px",
                    }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  />
                ))}
              </div>
              <motion.div
                className="absolute inset-0 m-auto w-5 h-5 rounded-full bg-yellow-300 border-2 border-yellow-400"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              />
            </motion.div>
          )}
          {/* Sparkles */}
          {bloomStep >= 4 && (
            <>
              {[0, 1, 2, 3].map((i) => (
                <motion.span
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-pink-300"
                  style={{
                    left: `${40 + i * 20}%`,
                    top: `${20 + (i % 2) * 30}%`,
                  }}
                  animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0.8] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </>
          )}
        </div>

        {/* Date details */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl bg-white/80 p-4 text-left shadow-sm backdrop-blur-sm mb-4"
        >
          <p className="text-xs text-pink-500 font-medium mb-2">Date details</p>
          <p className="text-sm text-gray-700"><span className="text-gray-500">When:</span> {DEFAULT_DATE}, {DEFAULT_TIME}</p>
          <p className="text-sm text-gray-700 mt-1"><span className="text-gray-500">Where:</span> {DEFAULT_PLACE}</p>
          <p className="text-xs text-pink-400 mt-2">(We can change this together.)</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <motion.button
              type="button"
              onClick={handleAddToCalendar}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-xl bg-pink-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-pink-600"
            >
              Add to Calendar
            </motion.button>
            <motion.button
              type="button"
              onClick={handleDownloadIcs}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-xl border-2 border-pink-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-pink-50"
            >
              Download .ics
            </motion.button>
          </div>
        </motion.div>

        {/* Photos */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full mb-4"
        >
          <p className="text-xs text-pink-500 font-medium mb-2 text-left">Us</p>
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 scrollbar-thin">
            {GALLERY_PHOTOS.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.05 }}
                className="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 border-pink-200 bg-pink-100"
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.button
          type="button"
          onClick={handleShare}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="rounded-2xl border-2 border-pink-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition hover:border-pink-400 hover:bg-pink-50"
        >
          {copied ? "Copied!" : "Send this to her"}
        </motion.button>

        <p className="mt-6 text-center text-xs text-pink-300">
          I'm so glad you said yes. Can't wait for our date.
        </p>
      </motion.div>
    </div>
  );
}
