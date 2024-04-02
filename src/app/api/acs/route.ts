import { getProviders } from "@/saml";
import type { NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { authenticate } from "@/auth";

export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(request: NextRequest) {
  const { idp, sp } = await getProviders();
  // Get SAML Response
  const raw = (await request.text()).replace("SAMLResponse=", "");
  const SAMLResponse = decodeURIComponent(raw);
  const { extract } = await sp.parseLoginResponse(idp, "post", {
    body: { SAMLResponse },
  });
  // extract.attributes, should contains : firstName, lastName, email, uid, groups
  authenticate(extract.attributes);
  redirect("/dashboard");
}
