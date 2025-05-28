import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

type Guest = {
  salutation: string;
  name: string;
  inviteCode: string;
  eventType: "tan-hon" | "vu-quy" | "bao-hy";
};

export default function InvitePage() {
  const { inviteCode } = useParams<{ inviteCode: string }>();
  const [guest, setGuest] = useState<Guest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!inviteCode) {
      return;
    }

    const fetchGuest = async () => {
      try {
        const res = await fetch(
          `https://sheetdb.io/api/v1/cvpbqodrbmuto/search?inviteCode=${inviteCode}`
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
        setLoading(false);
      }
    };

    fetchGuest();
  }, [inviteCode]);

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (!guest) return <p>Không tìm thấy lời mời.</p>;

  function getDate(eventType: string): string {
    switch (eventType) {
      case "tan-hon":
        return "13 . 07 . 2025";
      case "vu-quy":
        return "05 . 07 . 2025";
      default:
        return "19 . 07 . 2025";
    }
  }

  function getTitle(eventType: string): string {
    switch (eventType) {
      case "tan-hon":
        return "LỄ TÂN HÔN";
      case "vu-quy":
        return "LỄ VU QUY";
      default:
        return "LỄ BÁO HỶ";
    }
  }

  function getPlaceHtml(eventType: string): React.ReactNode {
    switch (eventType) {
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

  function getTimeHtml(eventType: string): React.ReactNode {
    switch (eventType) {
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
    <div className="flex flex-col items-center scroll-container">
      <div className="sticky-container">
        <img
          className="scroll-img"
          src="/images/scroll.gif"
          alt="scroll image"
        />
        <div className="bg-scroll"></div>
        <div className="bg-main brightness-50"></div>
        <div className="center-item txt-main text-white text-shadow-lg text-center">
          <h2 className="text-small md:text-medium lg:text-huge font-1ftv">
            Ngọc Minh & Ngân Hà
          </h2>
          <h3 className="mt-5 text-3xl font-cormorant">
            {getDate(guest.eventType)}
          </h3>
          <h3 className="mt-10 font-cormorant">TRÂN TRỌNG KÍNH MỜI</h3>
          <h3 className="text-small md:text-medium font-1ftv mt-2">
            <span>{guest.salutation + " "} </span>
            <span className="font-bold">{guest.name}</span>
          </h3>
        </div>
        <div className="center-item text-white text-shadown-lg font-cormorant text-center">
          <h3 className="text-small txt-sub">{getTitle(guest.eventType)}</h3>
          <div className="txt-content mt-10">
            <p>TRÂN TRỌNG KÍNH MỜI</p>
            <p className="font-1ftv text-3xl">{guest.salutation}</p>
            <p>ĐẾN DỰ BỮA TIỆC RƯỢU</p>
            <p>CHUNG VUI CÙNG GIA ĐÌNH CHÚNG TÔI TẠI</p>
          </div>
          <div className="txt-content-2 mt-5">
            {getPlaceHtml(guest.eventType)}
          </div>
          <div className="txt-content-3 mt-5">
            {getTimeHtml(guest.eventType)}
          </div>
        </div>
      </div>
    </div>
  );
}
