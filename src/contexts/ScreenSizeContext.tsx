import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

type ScreenCtx = {
  width: number;
  height: number;
  isMobile: boolean;   
  isTablet: boolean;   
  isDesktop: boolean;  
};

const BREAKPOINTS = { sm: 640, md: 768, lg: 1024, xl: 1280 };

const ScreenSizeContext = createContext<ScreenCtx>({
  width: 0, height: 0, isMobile: false, isTablet: false, isDesktop: true
});

function getWH() {
  if (typeof window === "undefined") return { width: 0, height: 0 };
  return { width: window.innerWidth, height: window.innerHeight };
}

export const ScreenSizeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [wh, setWH] = useState(getWH());
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const onResize = () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => setWH(getWH()));
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const value = useMemo<ScreenCtx>(() => {
    const { width, height } = wh;
    const isMobile = width < BREAKPOINTS.md;
    const isTablet = width >= BREAKPOINTS.md && width < BREAKPOINTS.lg;
    const isDesktop = width >= BREAKPOINTS.lg;
    return { width, height, isMobile, isTablet, isDesktop };
  }, [wh]);

  return <ScreenSizeContext.Provider value={value}>{children}</ScreenSizeContext.Provider>;
};

export const useScreenSize = () => useContext(ScreenSizeContext);
