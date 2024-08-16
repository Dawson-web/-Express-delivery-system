import { useState, useEffect } from "react";
import useMeasure from "react-use-measure";
import { useSpring, animated } from "@react-spring/web";

const Loading = () => {
  const [ref, { width }] = useMeasure();
  const [progress, setProgress] = useState(0);
  const [totalResources, setTotalResources] = useState(0);
  const [loadedResources, setLoadedResources] = useState(0);

  const props = useSpring({
    config: { duration: 500 },
    progress,
  });

  useEffect(() => {
    const entries = performance.getEntriesByType(
      "resource"
    ) as PerformanceResourceTiming[];

    const countResources = entries.filter(
      (entry): entry is PerformanceResourceTiming =>
        entry.initiatorType !== "navigation"
    ).length;
    setTotalResources(countResources);

    const loadedCount = entries.filter(
      (entry): entry is PerformanceResourceTiming => entry.responseEnd > 0
    ).length;
    setLoadedResources(loadedCount);

    const updateProgress = () => {
      const newProgress = (loadedCount / countResources) * 100;
      setProgress(newProgress);
    };

    updateProgress();

    const observer = new PerformanceObserver((list, observer) => {
      for (const entry of list.getEntries() as PerformanceResourceTiming[]) {
        if (entry.name && entry.responseEnd > 0) {
          setLoadedResources((prev) => prev + 1);
          updateProgress();
        }
      }
    });

    observer.observe({ entryTypes: ["resource"] });

    return () => {
      observer.disconnect();
    };
  }, [setProgress, setTotalResources, setLoadedResources]);

  return (
    <div className="sm:h-full h-[80%]">
      <div className="flex flex-col items-center h-full justify-center">
        <div className="animate-bounce">Loading...</div>
        <div
          ref={ref}
          className="relative w-[200px] h-[50px] cursor-pointer border-[2px] dark:border-gray-100 border-gray-900 rounded-md"
        >
          <animated.div
            className="w-full h-full absolute bg-blue-600 rounded-sm "
            style={{ width: props.progress.interpolate((p) => `${p}%`) }}
          />
          <animated.div className="absolute w-full h-full flex items-center justify-center text-white ">
            {props.progress.to((p) => p.toFixed(0))}
          </animated.div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
