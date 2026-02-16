export function cookieOptions({ maxAgeMs }) {
  const prod = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: prod,
    sameSite: prod ? "none" : "lax",
    maxAge: maxAgeMs,
  };
}