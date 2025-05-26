import { useEffect, useRef } from 'react';

export default function Audio() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      // Đặt volume nhỏ nếu cần
      audio.volume = 0.5;

      // Cố gắng play nếu autoplay bị chặn
      const playAudio = async () => {
        try {
          await document.addEventListener('mouseover', () => {
            if (audio) {
              audio.play();
            }
          });
          // await audio.play();
        } catch (err) {
          console.warn('Autoplay bị chặn. Cần người dùng tương tác.', err);
        }
      };

      playAudio();
    }
  }, []);

  return (
    <audio ref={audioRef} loop controls>
      <source src='/AThousandYearsPiano.mp3' type='audio/mpeg' />
      Trình duyệt không hỗ trợ phát nhạc.
    </audio>
  );
}
