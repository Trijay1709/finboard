import Image from "next/image";
import Link from "next/link";

function HeaderLogo() {
  return (
    <Link
      href="/"
      className="lg:flex items-center justify-center gap-x-2 font-bold italic text-3xl text-[#EEE] hidden"
    >
      <Image src="logo.svg" height={60} width={60} alt="FinBoard" />
      FinBoard
    </Link>
  );
}

export { HeaderLogo };
