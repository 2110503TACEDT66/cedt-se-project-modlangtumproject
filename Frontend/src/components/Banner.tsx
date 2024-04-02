import Partner from './Partner';
import Link from 'next/link';
import Image from 'next/image';

const Banner = () => {
  const partnerLogos = [
    { logoUrl: '/img/sp1.png', name: 'Chula' },
    { logoUrl: '/img/sp2.png', name: 'CEDT' },
  ];

  return (
    <div className="relative flex h-screen w-full flex-col py-5 lg:h-[80vh]">
      <div className="mx-[4vh] my-[8vh] flex flex-wrap items-center justify-between md:flex-row">
        <div className="flex flex-col space-y-6 md:space-y-12">
          <div className="space-y-3 text-4xl font-bold drop-shadow-lg md:space-y-1 md:text-6xl">
            <h1>Your Career</h1>
            <h1>Path Starts</h1>
            <h1>Here !</h1>
          </div>
          <div className="text-md space-y-2 drop-shadow-sm md:space-y-1 md:text-xl">
            <p>Connect with top companies, find your dream job,</p>
            <p>and take your professional journey to the next level.</p>
          </div>
          <Link
            href="/company"
            className="flex w-auto min-w-[20%] max-w-[50%] items-center justify-center rounded-2xl bg-blue1 px-4 py-2 text-white"
          >
            Interview Now
          </Link>
        </div>
        <Image
          src="/img/banner.png"
          alt="Banner"
          width={0}
          height={0}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="mt-5 h-[40vh] w-auto min-w-[40vh] max-w-[100vh] rounded-3xl object-cover md:ml-10 md:mt-0"
        />
      </div>

      <div className="absolute bottom-0 right-0 flex flex-row space-x-10 p-5">
        {partnerLogos.map((partner, index) => (
          <Partner key={index} logoUrl={partner.logoUrl} name={partner.name} />
        ))}
      </div>
    </div>
  );
};

export default Banner;
