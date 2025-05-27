export default function Envelope({ guestName }: { guestName: string }) {
  return (
    <section className="p-4 bg-white-100 text-center shadow-lg text-red-sangria w-screen h-screen flex flex-col items-center justify-center">
      <h2 className="text-huge font-1ftv">Ngọc Minh & Ngân Hà</h2>
      <h3 className="mt-5 text-3xl font-cormorant">13 . 07 . 2025</h3>
      <h3 className="mt-10 font-cormorant">TRÂN TRỌNG KÍNH MỜI</h3>
      <h3 className="text-medium font-1ftv mt-2">
        <span>Vợ chồng bạn </span>
        <span className="font-bold">{guestName}</span>
      </h3>
    </section>
  );
}
