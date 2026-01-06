"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { TripInfo } from "@/app/types";
import { Calendar, Wallet, Users } from "lucide-react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({
  data,
  tripdata,
}: {
  data: TimelineEntry[];
  tripdata: TripInfo;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.getBoundingClientRect().height);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-white dark:bg-neutral-950 font-sans md:px-10"
      ref={containerRef}
    >
      {/* Header Section */}
      <div className="max-w-7xl mx-auto py-7 px-4 md:px-8 lg:px-10 border-b border-neutral-200 dark:border-neutral-800">
        <h2 className="text-xl md:text-4xl font-bold mb-4 text-black dark:text-white">
          Your Trip Itinerary from{" "}
          <span className="text-primary">{tripdata?.origin}</span>
        </h2>

        <div className="flex flex-wrap gap-4 text-neutral-700 dark:text-neutral-300">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <span className="font-medium">{tripdata?.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-primary" />
            <span className="font-medium">{tripdata?.budget}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <span className="font-medium">{tripdata?.group_size}</span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:gap-10"
          >
            {/* Left Side Sticky Title */}
            <div className="sticky top-32 self-start max-w-xs lg:max-w-sm md:w-[40%] flex flex-col items-start z-40">
              {/* Dot */}
              <div className="h-10 w-10 mb-4 flex items-center justify-center rounded-full bg-primary/10 border border-primary/20">
                <div className="h-3 w-3 rounded-full bg-primary" />
              </div>
              {/* Title */}
              <h3 className="hidden md:block text-lg md:text-2xl font-semibold text-neutral-800 dark:text-neutral-200">
                {item.title}
              </h3>
            </div>

            {/* Right Side Content */}
            <div className="relative pl-6 md:pl-4 w-full">
              <h3 className="md:hidden block text-lg font-semibold mb-3 text-neutral-800 dark:text-neutral-200">
                {item.title}
              </h3>
              <div className="bg-neutral-50 dark:bg-neutral-900 p-5 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800">
                {item.content}
              </div>
            </div>
          </div>
        ))}

        {/* Timeline Vertical Line */}
        <div
          style={{ height: height + "px" }}
          className="absolute md:left-5 left-8 top-0 overflow-hidden w-[2px] bg-neutral-200 dark:bg-neutral-700"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-primary via-blue-500 to-transparent rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
