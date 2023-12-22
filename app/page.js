import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Link
        href="/dashboard"
        className="mx-auto block p-3 my-3 border border-indigo-600 w-32 text-center"
      >
        Dashboard
      </Link>
      <section className="hero">
        <Image
          src="/hero-desktop.png"
          // Original img demensions are 2000 x 1520, the aspect ratio is the same here
          width={1000}
          height={760}
          className="hidden md:block m-auto"
          alt="Screenshot of dashboard on mobile and desktop"
        />
        <Image
          src="/hero-mobile.png"
          // Original img demensions are 560 x 620, aspect ratio unchanged
          width={560}
          height={620}
          className="md:hidden m-auto"
          alt="Screenshot of dashboard on mobile and desktop"
        />
      </section>
    </main>
  );
}
