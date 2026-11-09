import type { Metadata } from "next";
import PostDashboard from "./PostDashboard";

export const metadata: Metadata = {
  title: "Post Editor",
  robots: { index: false, follow: false },
};

export default function PostEditorPage() {
  return <PostDashboard />;
}
