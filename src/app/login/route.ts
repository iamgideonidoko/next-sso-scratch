import { getUser } from "@/auth";
import { getProviders } from "@/saml";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET() {
  const user = getUser();
  if (user) redirect("/dashboard");
  try {
    const { idp, sp } = await getProviders();
    const { context } = sp.createLoginRequest(idp, "redirect");
    return NextResponse.redirect(context);
  } catch (e) {
    console.error("Error: ", e);
    return redirect("/");
  }
}
