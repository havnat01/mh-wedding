// src/components/InvitationContent.tsx

type Props = {
  guestName: string;
  eventType: 'tan-hon' | 'vu-quy' | 'bao-hy';
};

export default function InvitationContent({ guestName, eventType }: Props) {
  const renderContent = () => {
    switch (eventType) {
      case 'tan-hon':
        return (
          <>
            <h3 className='text-2xl font-bold'>Thiệp Tân Hôn</h3>
            <p>
              Trân trọng kính mời {guestName} đến dự lễ Tân Hôn của chúng tôi.
            </p>
            <p>Thời gian: 18h00, 30/06/2025</p>
            <p>Địa điểm: Nhà hàng A, TP.HCM</p>
          </>
        );
      case 'vu-quy':
        return (
          <>
            <h3 className='text-2xl font-bold'>Thiệp Vu Quy</h3>
            <p>Trân trọng kính mời {guestName} đến dự lễ Vu Quy tại tư gia.</p>
            <p>Thời gian: 9h00, 28/06/2025</p>
            <p>Địa điểm: Tư gia, Long An</p>
          </>
        );
      case 'bao-hy':
        return (
          <>
            <h3 className='text-2xl font-bold'>Thiệp Báo Hỷ</h3>
            <p>
              Trân trọng kính mời {guestName} đến chung vui tại tiệc Báo Hỷ.
            </p>
            <p>Thời gian: 17h00, 06/07/2025</p>
            <p>Địa điểm: Nhà hàng B, TP.HCM</p>
          </>
        );
    }
  };

  return (
    <div className='mt-6 p-4 bg-white rounded-lg shadow'>{renderContent()}</div>
  );
}
