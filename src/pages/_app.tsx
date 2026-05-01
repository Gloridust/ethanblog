import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

function applySystemTheme() {
  const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Theme: follow system, listen for changes
  useEffect(() => {
    applySystemTheme();
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => applySystemTheme();
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Language detection
  useEffect(() => {
    if (typeof window !== 'undefined' && router.pathname === '/' && router.locale === 'default') {
      const userLanguage = navigator.language || (navigator as any).userLanguage;
      const isChinese = /^zh(-.*)?$/.test(userLanguage);

      if (isChinese) {
        router.push(router.asPath, router.asPath, { locale: 'cn' });
      } else {
        router.push(router.asPath, router.asPath, { locale: 'en' });
      }
    }
  }, [router]);

  return <Component {...pageProps} />;
}
