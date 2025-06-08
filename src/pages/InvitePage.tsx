import { useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Overlay from "../components/Overlay";
import Audio from "../components/Audio";

type EventType = "tan-hon" | "vu-quy" | "bao-hy";
type Guest = {
  salutation: string;
  name: string;
  eventType: EventType;
};

const EVENT_INFO: Record<
  EventType,
  {
    title: string;
    date: string;
    time: string;
    day: string;
    place: {
      name: string;
      details: string[];
    };
  }
> = {
  "tan-hon": {
    title: "LỄ TÂN HÔN",
    date: "13 . 07 . 2025",
    time: "11 GIỜ 00",
    day: "CHỦ NHẬT",
    place: {
      name: "Nhà Hàng Ngọc Hà",
      details: [
        "Bà Huyện Thanh Quan, TT. Vĩnh An,",
        "H. Vĩnh Cửu, T. Đồng Nai",
      ],
    },
  },
  "vu-quy": {
    title: "LỄ VU QUY",
    date: "05 . 07 . 2025",
    time: "11 GIỜ 00",
    day: "THỨ BẢY",
    place: {
      name: "Tư Gia",
      details: [
        "Số 144 Tôn Đức Thắng, KP.3, TT. Võ Xu,",
        "H. Đức Linh, T. Bình Thuận",
      ],
    },
  },
  "bao-hy": {
    title: "LỄ BÁO HỶ",
    date: "19 . 07 . 2025",
    time: "18 GIỜ 00",
    day: "THỨ BẢY",
    place: {
      name: "Claris Palace",
      details: [
        "(Sảnh Amber)",
        "22 Đ. Hiệp Bình, Hiệp Bình Phước, Thủ Đức, TP.HCM",
      ],
    },
  },
};

function getEventInfo(eventType?: EventType) {
  return EVENT_INFO[eventType || "bao-hy"];
}

export default function InvitePage() {
  const [guest, setGuest] = useState<Guest | null>(null);
  const [loadingPercent, setLoadingPercent] = useState(0);
  const { inviteCode } = useParams<{ inviteCode: string }>();
  const { scrollYProgress } = useScroll();

  // Motion transforms
  const scrollIdx = useTransform(scrollYProgress, [0, 0.3], [9, -1]);
  const mainTextOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const subTextOpacity = useTransform(scrollYProgress, [0.25, 0.4], [0, 1]);
  const ySubText1 = useTransform(scrollYProgress, [0.35, 0.5], [80, 0]);
  const opacitySubText1 = useTransform(scrollYProgress, [0.35, 0.5], [0, 1]);
  const ySubText2 = useTransform(scrollYProgress, [0.45, 0.7], [80, 0]);
  const opacitySubText2 = useTransform(scrollYProgress, [0.45, 0.7], [0, 1]);
  const ySubText3 = useTransform(scrollYProgress, [0.65, 0.9], [80, 0]);
  const opacitySubText3 = useTransform(scrollYProgress, [0.65, 0.9], [0, 1]);
  const scaleSm = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const scaleMd = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const scaleLg = useTransform(scrollYProgress, [0, 1], [1.2, 1.7]);
  const bgFilter = useTransform(
    scrollYProgress,
    [0, 0.35, 0.6],
    [
      "blur(1px) brightness(50%)",
      "blur(0px) brightness(100%)",
      "blur(1px) brightness(50%)",
    ]
  );

  useEffect(() => {
    let interval: number | null = null;
    setLoadingPercent(0);

    if (!inviteCode) {
      setLoadingPercent(100);
      return;
    }

    interval = setInterval(() => {
      setLoadingPercent((prev) => (prev < 95 ? prev + 2 : prev));
    }, 30);

    const fetchGuest = async () => {
      try {
        const res = await fetch(
          `https://script.google.com/macros/s/AKfycbx-O9-gYfCKefIgYZskk4zdi5CZFFKELenEBracqiRaQAeTjOOVuQkMKqy63Szbt2Sr/exec?inviteCode=${inviteCode}`
        );
        const data = await res.json();
        setGuest(data.length > 0 ? data[0] : null);
      } catch (err) {
        setGuest(null);
        console.error("Lỗi khi gọi API", err);
      } finally {
        setLoadingPercent(100);
        if (interval) clearInterval(interval);
      }
    };

    fetchGuest();
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [inviteCode]);

  // Memoize event info for current guest
  const eventInfo = useMemo(
    () => getEventInfo(guest?.eventType),
    [guest?.eventType]
  );

  // Hàm scroll mượt về cuối trang trong 5s
  function scrollToBottomSmooth(duration = 5000) {
    const start = window.scrollY;
    const end = document.body.scrollHeight - window.innerHeight;
    const change = end - start;
    const startTime = performance.now();

    function animateScroll(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, start + change * progress);
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    }

    requestAnimationFrame(animateScroll);
  }

  return (
    <>
      <Overlay loadingPercent={loadingPercent} />
      <Audio />
      <div className="flex flex-col items-center scroll-container">
        <div className="sticky-container">
          <motion.img
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: 50,
              willChange: "opacity",
              opacity: mainTextOpacity,
              position: "fixed",
              zIndex: scrollIdx,
              left: "calc(50% - 25px)",
              bottom: 32,
              cursor: "pointer",
            }}
            className="scroll-img"
            src="/images/scroll.gif"
            alt="scroll image"
            onClick={() => scrollToBottomSmooth(5000)}
          />
          <motion.div
            style={{
              willChange: "transform, contents",
              scale: scaleLg,
              transformStyle: "preserve-3d",
              filter: bgFilter,
            }}
            className="bg-scroll"
          />
          <motion.div
            style={{
              willChange: "transform, contents",
              scale: scaleSm,
              transformStyle: "preserve-3d",
              filter: bgFilter,
            }}
            className="bg-main brightness-50"
          />
          <motion.div
            style={{
              willChange: "transform, opacity",
              scale: scaleMd,
              transformStyle: "preserve-3d",
              opacity: mainTextOpacity,
            }}
            className="text-item text-white text-shadow-lg text-center"
          >
            <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-1ftv">
              Ngọc Minh & Ngân Hà
            </h2>
            <h3 className="text-2xl mt-2 sm:text-3xl md:text-4xl lg:text-5xl sm:mt-5 font-cormorant">
              {eventInfo.date}
            </h3>
            <h3 className="text-base mt-7 sm:text-lg sm:mt-8 md:text-xl md:mt-9 lg:text-2xl lg:mt-10 font-cormorant">
              TRÂN TRỌNG KÍNH MỜI
            </h3>
            <h3 className="text-4xl sm:text-5xl md:text-7xl font-8xl font-1ftv mt-2">
              <span>{guest ? guest.salutation + " " : ""}</span>
              <span className="font-bold">{guest ? guest.name : ""}</span>
            </h3>
          </motion.div>
          <div className="text-item text-white text-shadow-lg font-cormorant text-center">
            <motion.h3
              style={{ willChange: "opacity", opacity: subTextOpacity }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            >
              {eventInfo.title}
            </motion.h3>
            <motion.div
              style={{
                willChange: "transform, opacity",
                y: ySubText1,
                opacity: opacitySubText1,
              }}
              className="text-base mt-7 sm:text-lg sm:mt-8 md:text-xl md:mt-9 lg:text-2xl lg:mt-10"
            >
              <p>TRÂN TRỌNG KÍNH MỜI</p>
              <p className="text-3xl sm:text-4xl md:text-5xl font-1ftv">
                {guest?.salutation || ""}
              </p>
              <p>ĐẾN DỰ BỮA TIỆC RƯỢU</p>
              <p>CHUNG VUI CÙNG GIA ĐÌNH CHÚNG TÔI TẠI</p>
            </motion.div>
            <motion.div
              style={{
                willChange: "transform, opacity",
                y: ySubText2,
                opacity: opacitySubText2,
              }}
              className="text-base mt-2 sm:text-lg sm:mt-3 md:text-xl md:mt-4 lg:text-2xl lg:mt-5"
            >
              <p className="text-2xl mt-3 sm:text-3xl sm:mt-4 md:text-4xl md:mt-5 lg:text-5xl lg:mt-6 text-bold font-hlt">
                {eventInfo.place.name}
              </p>
              {eventInfo.place.details.map((line, idx) => (
                <p className={idx === 0 ? "mt-2" : ""} key={idx}>
                  {line}
                </p>
              ))}
            </motion.div>
            <motion.div
              style={{
                willChange: "transform, opacity",
                y: ySubText3,
                opacity: opacitySubText3,
              }}
              className="mt-2 sm:mt-3 md:mt-4 lg:mt-5"
            >
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl">
                VÀO LÚC: {eventInfo.time} - {eventInfo.day}
              </p>
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-bold">
                {eventInfo.date}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
