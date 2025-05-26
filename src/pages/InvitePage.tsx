import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Envelope from '../components/Envelope';
import InvitationContent from '../components/InvitationContent';

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
    <div className='flex flex-col items-center mt-10'>
      <Envelope guestName={guest.name} />
      <InvitationContent guestName={guest.name} eventType={guest.eventType} />
    </div>
  );
}
