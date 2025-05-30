import { useEffect, useRef, useState } from "react";
import { AudioOffIcon } from "./icons/AudioOffIcon";
import { AudioOnIcon } from "./icons/AudioOnIcon";

export default function Audio({
  src = "/AThousandYearsPiano.mp3",
  loop = true,
  volume = 0.5,
}: {
  src?: string;
  loop?: boolean;
  volume?: number;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(true);

  // Play audio khi mount và khi user tương tác lần đầu
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = true;
    audio.loop = loop;
    audio.volume = volume;

    const tryPlay = () => {
      audio.play().catch(() => {});
      removeListeners();
    };

    const events = ["click", "touchstart", "keydown", "scroll"];
    function addListeners() {
      events.forEach((evt) => document.addEventListener(evt, tryPlay));
    }
    function removeListeners() {
      events.forEach((evt) => document.removeEventListener(evt, tryPlay));
    }

    audio.play().catch(addListeners);

    return removeListeners;
  }, [loop, volume]);

  // Toggle mute
  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
    if (!audio.muted) {
      audio.play().catch(() => {});
    }
  };

  // Icon component
  const AudioIcon = muted ? <AudioOffIcon /> : <AudioOnIcon />;

  return (
    <>
      <audio ref={audioRef} src={src} muted loop={loop} />
      <button
        onClick={toggleMute}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 9,
          background: "rgba(255,255,255,0.7)",
          borderRadius: "50%",
          padding: 12,
          border: "none",
          cursor: "pointer",
        }}
        aria-label={muted ? "Bật âm thanh" : "Tắt âm thanh"}
      >
        {AudioIcon}
      </button>
    </>
  );
}
