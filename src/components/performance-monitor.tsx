"use client";

import { useEffect } from "react";
import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals";

interface PerformanceMonitorProps {
  onMetrics?: (metrics: any) => void;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({ onMetrics }) => {
  useEffect(() => {
    // Monitor Core Web Vitals
    getCLS((metric) => {
      console.log("CLS:", metric);
      onMetrics?.({ type: "CLS", value: metric.value });
    });

    getFID((metric) => {
      console.log("FID:", metric);
      onMetrics?.({ type: "FID", value: metric.value });
    });

    getFCP((metric) => {
      console.log("FCP:", metric);
      onMetrics?.({ type: "FCP", value: metric.value });
    });

    getLCP((metric) => {
      console.log("LCP:", metric);
      onMetrics?.({ type: "LCP", value: metric.value });
    });

    getTTFB((metric) => {
      console.log("TTFB:", metric);
      onMetrics?.({ type: "TTFB", value: metric.value });
    });

    // Monitor additional performance metrics
    if (typeof window !== "undefined") {
      // Monitor memory usage
      if ("memory" in performance) {
        const memory = (performance as any).memory;
        console.log("Memory Usage:", {
          used: Math.round(memory.usedJSHeapSize / 1048576) + " MB",
          total: Math.round(memory.totalJSHeapSize / 1048576) + " MB",
          limit: Math.round(memory.jsHeapSizeLimit / 1048576) + " MB",
        });
      }

      // Monitor navigation timing
      const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
      if (navigation) {
        console.log("Navigation Timing:", {
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
          domInteractive: navigation.domInteractive,
          firstPaint: performance.getEntriesByName("first-paint")[0]?.startTime,
          firstContentfulPaint: performance.getEntriesByName("first-contentful-paint")[0]?.startTime,
        });
      }
    }
  }, [onMetrics]);

  return null; // This component doesn't render anything
};

export default PerformanceMonitor;