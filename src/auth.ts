import "server-only";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export function getUser() {
  const ssoAuth = cookies().get("sso-auth");
  if (!ssoAuth) return null;
  try {
    const user = jwt.verify(ssoAuth.value, process.env.JWT_SECRET!);
    return user as Record<"firstName" | "lastName" | "email" | "uid", string>;
  } catch (e) {
    return null;
  }
}

export function authenticate(user: object) {
  const token = jwt.sign(user, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
  cookies().set("sso-auth", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "lax",
    maxAge: 3600, // 1 hour
    path: "/",
  });
}
