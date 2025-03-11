import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // 只在客户端执行，且只在根路径时执行
    if (typeof window !== 'undefined' && router.pathname === '/' && router.locale === 'default') {
      const userLanguage = navigator.language || (navigator as any).userLanguage;
      const isChinese = /^zh(-.*)?$/.test(userLanguage); // 匹配所有中文语言代码（简体、繁体等）
      
      // 根据用户语言重定向到相应的语言版本
      if (isChinese) {
        router.push(router.asPath, router.asPath, { locale: 'cn' });
      } else {
        router.push(router.asPath, router.asPath, { locale: 'en' });
      }
    }
  }, [router]);

  return <Component {...pageProps} />;
}
