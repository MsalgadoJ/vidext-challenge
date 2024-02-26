import Link from 'next/link';
import HeaderAuth from './HeaderAuth';
import Image from 'next/image';

export default function Header() {
  return (
    <div className="flex justify-between items-center border-b border-zinc-400 mt-4 pb-2">
      <Link href="/" className="flex gap-2 items-center">
        <Image
          src="/videx-logo.webp"
          alt="vidext logo"
          width={50}
          height={50}
        />
        <p className="hidden text-[#38422C] font-bold sm:flex lg:text-lg">
          vidext
        </p>
      </Link>
      <div>
        <HeaderAuth />
      </div>
    </div>
  );
}
