import { getUser } from "@/auth";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const user = getUser();
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="flex items-end gap-3.5">
        <Image
          className="relative"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        <h1 className="text-5xl font-medium translate-y-1.5">SSO Demo</h1>
      </div>
      {user && (
        <Link href="/dashboard" className="underline mt-4">
          Go dashboard
        </Link>
      )}
      <div className="mt-12 flex items-center flex-col">
        {user ? (
          <>
            <p>LOGGED IN</p>
            <Link
              href="/logout"
              className="inline-block py-2 px-3 rounded bg-red-500 text-white mt-8"
            >
              Log out
            </Link>
          </>
        ) : (
          <>
            <p>LOGGED OUT</p>
            <Link
              href="/login"
              className="inline-block py-2 px-3 rounded bg-green-500 text-white mt-8"
            >
              Log in
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
