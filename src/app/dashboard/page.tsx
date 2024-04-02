import Image from "next/image";
import { getUser } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const user = getUser();
  if (!user) return redirect("/");
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
        <h1 className="text-5xl font-medium translate-y-1.5">
          SSO Demo Dashboard
        </h1>
      </div>
      <Link href="/" className="underline mt-4">
        Go home
      </Link>
      <div className="text-center">
        <h2 className="text-2xl mt-8">Hello {user.firstName},</h2>
        <p className="mt-3">
          You&apos;re signed in as <strong>{user.email}</strong>
        </p>
      </div>
      <Link
        href="/logout"
        className="inline-block py-2 px-3 rounded bg-red-500 text-white mt-8"
      >
        Log out
      </Link>
    </main>
  );
}
