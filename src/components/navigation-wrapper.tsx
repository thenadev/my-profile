"use client";

import NavigationDesktop from "@/components/layout/NavigationDesktop";
import NavigationMobile from "@/components/layout/NavigationMobile";
import { useEffect, useState } from "react";

export default function NavigationWrapper() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile ? <NavigationMobile /> : <NavigationDesktop />;
}
