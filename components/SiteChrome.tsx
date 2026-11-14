'use client';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  if (path === '/admin' || path.startsWith('/admin/')) return <main className="min-h-screen">{children}</main>;
  return <><Header/><main className="min-h-screen min-h-[100svh] pt-[76px]">{children}</main><Footer/></>;
}
