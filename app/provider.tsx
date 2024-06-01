"use client";
import { ThemeProvider } from "next-themes";
import { useState, useEffect, use } from "react";
import {
  useRouter,
  useParams,
  useSearchParams,
  usePathname,
} from "next/navigation";

export default function Providers({ children }: any) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const path = usePathname();
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
