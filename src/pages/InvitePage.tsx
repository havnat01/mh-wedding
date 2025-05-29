import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Overlay from "../components/Overlay";

type Guest = {
  salutation: string;
  name: string;
  inviteCode: string;
  eventType: "tan-hon" | "vu-quy" | "bao-hy";
};

export default function InvitePage() {
  const [guest, setGuest] = useState<Guest | null>(null);
  const [loadingPercent, setLoadingPercent] = useState(0);
  const { inviteCode } = useParams<{ inviteCode: string }>();
  const { scrollYProgress } = useScroll();
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
  const scaleLg = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

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
          `https://script.google.com/macros/s/AKfycbznvZQvrJVnb6Xm1Dv7bMTQoWUFcRSj5m1hABZOm3YCY1VuyXmWpbrPQLl9BCgHwpY-/exec?inviteCode=${inviteCode}`
        );
        const data = await res.json();
        if (data.length > 0) {
          setGuest(data[0]);
        } else {
          setGuest(null);
        }
      } catch (err) {
        console.error("Lỗi khi gọi API", err);
      } finally {
        setLoadingPercent(100);
        if (interval) clearInterval(interval);
      }
    };

    fetchGuest();
  }, [inviteCode]);

  function getDate(): string {
    switch (guest?.eventType) {
      case "tan-hon":
        return "13 . 07 . 2025";
      case "vu-quy":
        return "05 . 07 . 2025";
      default:
        return "19 . 07 . 2025";
    }
  }

  function getTitle(): string {
    switch (guest?.eventType) {
      case "tan-hon":
        return "LỄ TÂN HÔN";
      case "vu-quy":
        return "LỄ VU QUY";
      default:
        return "LỄ BÁO HỶ";
    }
  }

  function getPlaceHtml(): React.ReactNode {
    switch (guest?.eventType) {
      case "tan-hon":
        return (
          <>
            <p className="font-hlt text-3xl text-bold mt-5">Nhà Hàng Ngọc Hà</p>
            <p className="mt-2">Bà Huyện Thanh Quan, TT. Vĩnh An,</p>
            <p>H. Vĩnh Cửu, T. Đồng Nai</p>
          </>
        );
      case "vu-quy":
        return (
          <>
            <p className="font-hlt text-3xl text-bold mt-5">Tư Gia</p>
            <p className="mt-2">Số 144 Tôn Đức Thắng, KP.3, TT. Võ Xu,</p>
            <p>H. Đức Linh, T. Bình Thuận</p>
          </>
        );
      default:
        return (
          <>
            <p className="font-hlt text-3xl text-bold mt-5">Claris Palace</p>
            <p className="mt-2">(Sảnh Amber)</p>
            <p>22 Đ. Hiệp Bình, Hiệp Bình Phước, Thủ Đức, TP.HCM</p>
          </>
        );
    }
  }

  function getTimeHtml(): React.ReactNode {
    switch (guest?.eventType) {
      case "tan-hon":
        return (
          <>
            <p>VÀO LÚC: 11 GIỜ 00 - CHỦ NHẬT</p>
            <p className="text-3xl text-bold">13 . 07 . 2025</p>
          </>
        );
      case "vu-quy":
        return (
          <>
            <p>VÀO LÚC: 11 GIỜ 00 - THỨ BẢY</p>
            <p className="text-3xl text-bold">05 . 07 . 2025</p>
          </>
        );
      default:
        return (
          <>
            <p>VÀO LÚC: 18 GIỜ 00 - THỨ BẢY</p>
            <p className="text-3xl text-bold">19 . 07 . 2025</p>
          </>
        );
    }
  }

  return (
    <>
      <Overlay loadingPercent={loadingPercent} />
      <div className="flex flex-col items-center scroll-container">
        <div className="sticky-container">
          <motion.img
            style={{ opacity: mainTextOpacity }}
            className="scroll-img"
            src="/images/scroll.gif"
            alt="scroll image"
          />
          <motion.div
            style={{
              willChange: "transform",
              scale: scaleLg,
              transformStyle: "preserve-3d",
            }}
            className="bg-scroll"
          ></motion.div>
          <motion.div
            style={{
              willChange: "transform",
              scale: scaleSm,
              transformStyle: "preserve-3d",
            }}
            className="bg-main brightness-50"
          ></motion.div>
          <motion.div
            style={{
              willChange: "transform, opacity",
              scale: scaleMd,
              transformStyle: "preserve-3d",
              opacity: mainTextOpacity,
            }}
            className="center-item text-white text-shadow-lg text-center"
          >
            <h2 className="text-small md:text-medium lg:text-huge font-1ftv">
              Ngọc Minh & Ngân Hà
            </h2>
            <h3 className="mt-5 text-3xl font-cormorant">{getDate()}</h3>
            <h3 className="mt-10 font-cormorant">TRÂN TRỌNG KÍNH MỜI</h3>
            <h3 className="text-small md:text-medium font-1ftv mt-2">
              <span>{guest ? guest.salutation + " " : "-"} </span>
              <span className="font-bold">{guest ? guest.name : "-"}</span>
            </h3>
          </motion.div>
          <div className="center-item text-white text-shadown-lg font-cormorant text-center">
            <motion.h3
              style={{ willChange: "opacity", opacity: subTextOpacity }}
              className="text-small txt-sub"
            >
              {getTitle()}
            </motion.h3>
            <motion.div
              style={{
                willChange: "transform, opacity",
                translateY: ySubText1,
                opacity: opacitySubText1,
              }}
              className="mt-10"
            >
              <p>TRÂN TRỌNG KÍNH MỜI</p>
              <p className="font-1ftv text-3xl">{guest?.salutation || ""}</p>
              <p>ĐẾN DỰ BỮA TIỆC RƯỢU</p>
              <p>CHUNG VUI CÙNG GIA ĐÌNH CHÚNG TÔI TẠI</p>
            </motion.div>
            <motion.div
              style={{
                willChange: "transform, opacity",
                translateY: ySubText2,
                opacity: opacitySubText2,
              }}
              className="mt-5"
            >
              {getPlaceHtml()}
            </motion.div>
            <motion.div
              style={{
                willChange: "transform, opacity",
                translateY: ySubText3,
                opacity: opacitySubText3,
              }}
              className="mt-5"
            >
              {getTimeHtml()}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
