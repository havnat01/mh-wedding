import { motion } from "framer-motion";
export default function Overlay({
  loadingPercent,
}: {
  loadingPercent: number;
}) {
  return (
    <motion.div
      className="overlay"
      initial={{ y: 0 }}
      animate={{ y: loadingPercent >= 100 ? "-100%" : 0 }}
      transition={{ delay: 1, type: "spring", stiffness: 80, damping: 20 }}
    >{`${loadingPercent}%`}</motion.div>
  );
}
