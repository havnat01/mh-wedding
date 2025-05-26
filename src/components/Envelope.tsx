export default function Envelope({ guestName }: { guestName: string }) {
  return (
    <div className='p-4 bg-pink-100 text-center rounded-lg shadow-lg'>
      <p className='text-xl font-cursive'>Thiệp mời đến</p>
      <h2 className='text-3xl font-bold mt-2'>{guestName}</h2>
    </div>
  );
}
