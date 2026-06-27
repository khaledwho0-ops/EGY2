"use server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { z } from "zod";

const Login = z.object({ email: z.string().email(), password: z.string().min(12) });

export async function signin(form: FormData) {
  const { email, password } = Login.parse(Object.fromEntries(form));
  
  // Placeholder for real DB logic: e.g. await db.user.findUnique({ where: { email } });
  const user = { id: "1", email: "test@example.com", passwordHash: "$2a$12$D2M/mB/z5H.d1.6D6w8X.ecO8T.Fh1x9SgOq3j3jGzD3M.8B.3uM2", role: "user" }; 
  
  if (!user || user.email !== email || !(await bcrypt.compare(password, user.passwordHash))) {
    throw new Error("invalid_credentials");
  }

  const token = await new SignJWT({ sub: user.id, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret_for_dev"));
    
  (await cookies()).set("auth", token, { httpOnly: true, secure: true, sameSite: "lax", path: "/" });
}
