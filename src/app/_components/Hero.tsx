"use client"
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { Globe2, Send, MapPin, Users, BookOpenCheck, ArrowDown } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export const suggestions = [
  {
    title: "Create New Trip",
    icon: <Globe2 className="text-blue-400 h-5 w-5" />,
  },
  {
    title: "View Popular Destinations",
    icon: <MapPin className="text-green-400 h-5 w-5" />,
  },
  {
    title: "Destination Suitable with friends",
    icon: <Users className="text-purple-400 h-5 w-5" />,
  },
  {
    title: "Adventure Destination",
    icon: <BookOpenCheck className="text-orange-400 h-5 w-5" />,
  },
];

export default function Hero() {
  const {user}=useUser();

  const router=useRouter();
  const onSend=()=>{
    if(!user){
      router.push('/sign-in')
      return ;
    }
    router.push('/create-new-trip')
  }
  return (
    <div className="mt-24 px-4 w-full flex flex-col items-center space-y-10">
      {/* Heading Section */}
      <div className="max-w-3xl w-full text-center space-y-6">
        <h1 className="text-2xl md:text-5xl font-bold leading-tight">
          Hey, I&apos;m your personal{" "}
          <span className="text-primary">Trip Bandhu</span> — your{" "}
          <span className="text-primary">travel buddy!</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Tell me what you want, and I&apos;ll handle the rest: Flights, Hotels, Trip
          Planner – all in seconds.
        </p>
      </div>

      {/* Input Box */}
      <div className="w-full max-w-xl relative border rounded-2xl p-4 bg-white shadow">
        <Textarea
          placeholder="Create a trip from Paris to New York"
          className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none"
        />
        <Button size="icon" className="absolute bottom-6 right-6" onClick={()=>onSend()} >
          <Send className="h-4 w-4" />
        </Button>
      </div>

      {/* Suggestions */}
      <div className="flex flex-wrap justify-center gap-4 max-w-4xl">
        {suggestions.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 border rounded-full px-4 py-2 cursor-pointer hover:bg-primary hover:text-white transition"
          >
            {item.icon}
            <span className="text-sm font-medium">{item.title}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center items-center">
        <h2 className="my-7 mt-14 gap-2 text-center flex">Not Sure where to start?<strong>See how it works </strong> <ArrowDown/></h2>
      <HeroVideoDialog
        className="block"
        animationStyle="from-center"
        videoSrc="/trip.mp4"
        thumbnailSrc="/trip-thumbnail.webp" 
        thumbnailAlt="Trip Video Thumbnail"
      />
      </div>
    </div>
  );
}
