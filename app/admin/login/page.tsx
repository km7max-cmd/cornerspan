import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { hasAdminAccess } from "../../../lib/admin-auth";
import LoginForm from "./login-form";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Admin Sign In | CornerSpan",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await hasAdminAccess()) redirect("/admin");
  return <LoginForm />;
}
