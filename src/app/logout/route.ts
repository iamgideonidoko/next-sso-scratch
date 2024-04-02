import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET() {
  cookies().delete("sso-auth");
  redirect("/");
}
