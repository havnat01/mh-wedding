import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

type Guest = {
  name: string;
  inviteCode: string;
  eventType: 'tan-hon' | 'vu-quy' | 'bao-hy';
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
        console.error('Lỗi khi gọi API', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGuest();
  }, [inviteCode]);

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (!guest) return <p>Không tìm thấy lời mời.</p>;

  return (
    <div className='flex flex-col items-center scroll-container'>
      <div className='sticky-container'>
        <div className='bg-scroll'></div>
        <div className='bg-main brightness-50'></div>
        <div className='txt-main text-white text-shadow-lg'>
          <h2 className='text-small md:text-medium lg:text-huge font-1ftv'>
            Ngọc Minh & Ngân Hà
          </h2>
          <h3 className='mt-5 text-3xl font-cormorant'>13 . 07 . 2025</h3>
          <h3 className='mt-10 font-cormorant'>TRÂN TRỌNG KÍNH MỜI</h3>
          <h3 className='text-small md:text-medium font-1ftv mt-2'>
            <span>Vợ chồng bạn </span>
            <span className='font-bold'>{guest.name}</span>
          </h3>
        </div>
      </div>
    </div>
  );
}
