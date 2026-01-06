"use client";
import React, { useState, useEffect } from "react";
import { Timeline } from "@/components/ui/timeline";
import { useTripDetail } from "../provider";
import { TripInfo, HotelType } from "../types";

// const TRIP_DATA = {
//   destination: "New York, USA",
//   duration: "8+ days",
//   origin: "Delhi, India",
//   budget: "High",
//   group_size: "5 to 10 People",
//   hotels: [
//     {
//       hotel_name: "The Plaza Hotel",
//       hotel_address: "768 5th Ave, New York, NY 10019, USA",
//       price_per_night: "$1,200+",
//       hotel_image_url:
//         "https://upload.wikimedia.org/wikipedia/commons/4/4d/The_Plaza_Hotel_NYC.jpg",
//       geo_coordinates: {
//         latitude: 40.7679,
//         longitude: -73.9707,
//       },
//       rating: 4.5,
//       description:
//         "An iconic Luxury hotel with stunning views of Central Park and a rich history, offering world-class service and elegance.",
//     },
//     {
//       hotel_name: "The Chic Luxury Apartments",
//       hotel_address: "304 W 37th St, New York, NY 10018, USA",
//       price_per_night: "$1000+",
//       hotel_image_url:
//         "https://cf.bstatic.com/xdata/images/hotel/max1024x768/234910098.jpg?k=c8849fbfdd99c7a3b3acf285d9b2946b81ddecb9a6a58e218a0bc90768bbc2df&o=&hp=1",
//       geo_coordinates: {
//         latitude: 40.7534,
//         longitude: -73.9959,
//       },
//       rating: 4.7,
//       description:
//         "Modern luxury with full self-catering suites and Unlimited access to social terrace and lounges. ",
//     },
//     {
//       hotel_name: "The St. Regis New York",
//       hotel_address: "2 E 55th St, New York, NY 10022, USA",
//       price_per_night: "$1,500+",
//       hotel_image_url:
//         "https://uploads-ssl.webflow.com/5ea7952f6ad9de69912ece2c/5ec38ad49b7e7b186c5e23ba_190229_POP%20St%20Regis%20(New%20York)_David%20Mitchell_068.jpg",
//       geo_coordinates: {
//         latitude: 40.7606,
//         longitude: -73.9704,
//       },
//       rating: 4.8,
//       description:
//         "Luxury meets sophistication at this historic hotel, offering opulent rooms and exceptional service.",
//     },
//   ],
//   itinerary: [
//     {
//       day: 1,
//       day_plan: "Arrival and Exploration",
//       best_time_to_visit_day: "Morning",
//       activities: [
//         {
//           place_name: "One World Observatory",
//           place_details:
//             "Experience breathtaking views of New York City from the tallest building in the Western Hemisphere.",
//           place_image_url:
//             "https://upload.wikimedia.org/wikipedia/commons/8/88/One_World_Trade_Center_viewed_from_Brooklyn_Bridge_Park_-_June_2015.jpg",
//           geo_coordinates: {
//             latitude: 40.7128,
//             longitude: -74.013,
//           },
//           place_address: "285 Fulton St, New York, NY 10007, USA",
//           ticket_pricing: "$42 (adults), $35 (children)",
//           time_travel_each_location: "3 hours",
//           best_time_to_visit: "Morning",
//         },
//         {
//           place_name: "Brooklyn Bridge",
//           place_details:
//             "Walk across this historic and iconic bridge for stunning views of the Manhattan skyline and the East River.",
//           place_image_url:
//             "https://upload.wikimedia.org/wikipedia/commons/3/3c/Brooklyn_Bridge_Manhattan_bridge_towers_newyorkcity.jpg",
//           geo_coordinates: {
//             latitude: 40.7061,
//             longitude: -73.9969,
//           },
//           place_address: "Brooklyn Bridge, New York, NY 10038, USA",
//           ticket_pricing: "Free",
//           time_travel_each_location: "2 hours",
//           best_time_to_visit: "Evening",
//         },
//       ],
//     },
//     {
//       day: 2,
//       day_plan: "Cultural Immersion and Shopping",
//       best_time_to_visit_day: "Afternoon",
//       activities: [
//         {
//           place_name: "Times Square",
//           place_details:
//             "The heart of New York City, known for its bright lights, theaters, and bustling atmosphere.",
//           place_image_url:
//             "https://upload.wikimedia.org/wikipedia/commons/6/6a/Times_Square_New_York_City.jpg",
//           geo_coordinates: {
//             latitude: 40.7587,
//             longitude: -73.9847,
//           },
//           place_address: "Manhattan, New York, NY 10036, USA",
//           ticket_pricing: "Free",
//           time_travel_each_location: "2 hours",
//           best_time_to_visit: "Evening",
//         },
//         {
//           place_name: "Rockefeller Center",
//           place_details:
//             "A world-famous complex featuring the Top of the Rock observation deck, ice skating rink, and numerous shops and restaurants.",
//           place_image_url:
//             "https://upload.wikimedia.org/wikipedia/commons/6/67/Rockefeller_Center.jpg",
//           geo_coordinates: {
//             latitude: 40.7587,
//             longitude: -73.9829,
//           },
//           place_address: "45 Rockefeller Plaza, New York, NY 10112, USA",
//           ticket_pricing: "$38 (adults), $32 (children)",
//           time_travel_each_location: "3 hours",
//           best_time_to_visit: "Afternoon",
//         },
//       ],
//     },
//     {
//       day: 3,
//       day_plan: "Adventure Day",
//       best_time_to_visit_day: "Morning",
//       activities: [
//         {
//           place_name: "Central Park",
//           place_details:
//             "One of the world's most famous urban parks, perfect for biking, picnics, and outdoor activities.",
//           place_image_url:
//             "https://upload.wikimedia.org/wikipedia/commons/4/46/Bethesda_Fountain_Central_Park.jpg",
//           geo_coordinates: {
//             latitude: 40.7851,
//             longitude: -73.9683,
//           },
//           place_address: "Central Park, New York, NY 10025, USA",
//           ticket_pricing: "Free",
//           time_travel_each_location: "4 hours",
//           best_time_to_visit: "Morning",
//         },
//         {
//           place_name: "Statue of Liberty",
//           place_details:
//             "Visit the iconic symbol of freedom and democracy with a ferry ride to Liberty Island.",
//           place_image_url:
//             "https://upload.wikimedia.org/wikipedia/commons/2/2d/Statue_of_Liberty%2C_New_York%2C_USA%2C_2.jpg",
//           geo_coordinates: {
//             latitude: 40.6892,
//             longitude: -74.0445,
//           },
//           place_address: "Liberty Island, New York, NY 10004, USA",
//           ticket_pricing: "$24 (adults), $12 (children)",
//           time_travel_each_location: "3 hours",
//           best_time_to_visit: "Afternoon",
//         },
//       ],
//     },
//     {
//       day: 4,
//       day_plan: "Food and Nightlife",
//       best_time_to_visit_day: "Evening",
//       activities: [
//         {
//           place_name: "Bronx Zoo",
//           place_details:
//             "One of the largest zoos in the world, featuring a wide variety of animals and exhibits.",
//           place_image_url:
//             "https://www.bronxzoo.com/wp-content/uploads/2018/03/Tiger-Mountain.jpg",
//           geo_coordinates: {
//             latitude: 40.8499,
//             longitude: -73.8777,
//           },
//           place_address: "2300 Southern Blvd, Bronx, NY 10460, USA",
//           ticket_pricing: "$33 (adults), $25 (children)",
//           time_travel_each_location: "4 hours",
//           best_time_to_visit: "Morning",
//         },
//         {
//           place_name: "Brownstone Pizzeria Co.",
//           place_details:
//             "A renowned pizzeria known for its authentic New York-style pizza.",
//           place_image_url:
//             "https://pbs.twimg.com/media/FuM2Q5cXsAAdIJ4?format=jpg&name=900x900",
//           geo_coordinates: {
//             latitude: 40.7492,
//             longitude: -74.0002,
//           },
//           place_address: "251 3rd Ave, New York, NY 10010, USA",
//           ticket_pricing: "$25 to $50 per person",
//           time_travel_each_location: "1 hours",
//           best_time_to_visit: "Evening",
//         },
//       ],
//     },
//     {
//       day: 5,
//       day_plan: "Adventure Day & Relaxation Continued",
//       best_time_to_visit_day: "Morning",
//       activities: [
//         {
//           place_name: "America's First Guns & Range",
//           place_details:
//             "Super fun and interactive recollecting and appreciating the history of old America!",
//           place_image_url:
//             "https://media-cldnry.s-nbcnews.com/image/upload/mpx/262022221555/mc-weapon-nyc-gun-range-140626-tease-1403b.jpg",
//           geo_coordinates: {
//             latitude: 40.7245,
//             longitude: -74.0064,
//           },
//           place_address: "201 Varick St 2nd Floor, New York, NY 10014, USA",
//           ticket_pricing: "$50 to $150 per person",
//           time_travel_each_location: "2 hours",
//           best_time_to_visit: "Morning",
//         },
//         {
//           place_name: "South Street Seaport",
//           place_details:
//             "A historic area featuring shopping, restaurants, and beautiful views of the East River.",
//           place_image_url:
//             "https://www.nycgo.com/images/styles/hero_large_s Wähler/s3/2017-12/bulletin_ssa.jpeg",
//           geo_coordinates: {
//             latitude: 40.7039,
//             longitude: -74.0032,
//           },
//           place_address: "63 Fulton St, New York, NY 10038, USA",
//           ticket_pricing: "$20 to $40 per person",
//           time_travel_each_location: "3 hours",
//           best_time_to_visit: "Afternoon",
//         },
//       ],
//     },
//     {
//       day: 6,
//       day_plan: "Cultural Immersion and Relaxation",
//       best_time_to_visit_day: "Afternoon",
//       activities: [
//         {
//           place_name: "The Metropolitan Museum of Art",
//           place_details:
//             "One of the world's largest and finest art museums, featuring a vast collection of artworks from around the world.",
//           place_image_url:
//             "https://upload.wikimedia.org/wikipedia/commons/4/43/MOCKUP_of_MetMusionat5th.jpg",
//           geo_coordinates: {
//             latitude: 40.7794,
//             longitude: -73.9632,
//           },
//           place_address: "1000 5th Ave, New York, NY 10028, USA",
//           ticket_pricing: "$25 (adults), $12 (children)",
//           time_travel_each_location: "4 hours",
//           best_time_to_visit: "Morning",
//         },
//         {
//           place_name: "Empire State Building",
//           place_details:
//             "Visit the iconic Empire State Building for panoramic views of New York City from its observation decks.",
//           place_image_url:
//             "https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_new_york-city-2017.jpg",
//           geo_coordinates: {
//             latitude: 40.7484,
//             longitude: -73.9857,
//           },
//           place_address: "20 W 34th St, New York, NY 10118, USA",
//           ticket_pricing: "$42 (adults), $37 (children)",
//           time_travel_each_location: "2 hours",
//           best_time_to_visit: "Evening",
//         },
//       ],
//     },
//     {
//       day: 7,
//       day_plan: "Nightlife and Relaxation",
//       best_time_to_visit_day: "Evening",
//       activities: [
//         {
//           place_name: "Madame Tussauds New York",
//           place_details:
//             "A wax museum featuring lifelike figures of celebrities, historical figures, and sports stars.",
//           place_image_url:
//             "https://dynamic-media-cdn.tripadvisor.com/image-proxy/3a620ad4e16ff79772441f35cd5d9282/360/mx1748240/w1100.jpg",
//           geo_coordinates: {
//             latitude: 40.7546,
//             longitude: -73.9852,
//           },
//           place_address: "234 W 42nd St, New York, NY 10036, USA",
//           ticket_pricing: "$38 (adults), $30 (children)",
//           time_travel_each_location: "2 hours",
//           best_time_to_visit: "Morning",
//         },
//         {
//           place_name: "Gramercy Park",
//           place_details:
//             "A private and serene park in Manhattan, known for its beautiful gardens and peaceful atmosphere.",
//           place_image_url:
//             "https://dynamic-media-cdn.tripadvisor.com/image-proxy/c50d4f53c7a10dc94c93f6e50c45cf27/360/mx1100.jpg",
//           geo_coordinates: {
//             latitude: 40.737,
//             longitude: -73.9849,
//           },
//           place_address: "1A Gramercy Park, New York, NY 10003, USA",
//           ticket_pricing: "Free",
//           time_travel_each_location: "3 hours",
//           best_time_to_visit: "Afternoon",
//         },
//       ],
//     },
//     {
//       day: 8,
//       day_plan: "Day Trip to Jersey City",
//       best_time_to_visit_day: "Morning",
//       activities: [
//         {
//           place_name: "Liberty Science Center",
//           place_details:
//             "A science museum located in Liberty State Park, featuring interactive exhibits and an IMAX theater.",
//           place_image_url:
//             "https://c8.alamy.com/comp/2D5FEH7/liberty-science-center-in-jersey-city-usa-liberty-state-park-new-jersey-2021-07-02-this-photo-c-2D5FEH7.jpg",
//           geo_coordinates: {
//             latitude: 40.7065,
//             longitude: -74.0782,
//           },
//           place_address: "251 Phillips Ave, Jersey City, NJ 07305, USA",
//           ticket_pricing: "$25 (adults), $20 (children)",
//           time_travel_each_location: "4 hours",
//           best_time_to_visit: "Morning",
//         },
//         {
//           place_name: "Jersey City Waterfront",
//           place_details:
//             "Enjoy stunning views of the Manhattan skyline from the waterfront promenade in Jersey City.",
//           place_image_url:
//             "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-680w/photography/2019-04/187777667-relieved-skyline-city-water.jpg",
//           geo_coordinates: {
//             latitude: 40.7136,
//             longitude: -74.0667,
//           },
//           place_address: "Jersey City, NJ, USA",
//           ticket_pricing: "Free",
//           time_travel_each_location: "2 hours",
//           best_time_to_visit: "Afternoon",
//         },
//       ],
//     },
//   ],
// };

export default function Itinerary() {
  
  const {tripDetailInfo}=useTripDetail()
  const [tripdata,setTripData]=useState<TripInfo |null>(null);
  useEffect(()=>{
    tripDetailInfo && setTripData(tripDetailInfo)
  },[tripDetailInfo])
  const data = tripdata ? [
    {
      title: "Recommended Hotels",
      content: (
        <div className="space-y-6">
          {tripdata?.hotels?.map((hotel:HotelType, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition-all"
            >
              <h4 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                {hotel.hotel_name}
              </h4>
              <p className="text-sm text-neutral-500 mt-1">
                {hotel.hotel_address}
              </p>
              <p className="mt-3 text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {hotel.description}
              </p>
              <div className="flex flex-wrap gap-3 mt-4 items-center">
                <span className="text-primary font-semibold">
                  {hotel?.price_per_night}/night
                </span>
                <span className="px-3 py-1 rounded-full bg-yellow-200 text-yellow-900 text-sm font-medium">
                  ⭐ {hotel?.rating}
                </span>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    ...(tripdata?.itinerary?.map((day) => ({
      title: `Day ${day.day} – ${day.day_plan}`,
      content: (
        <div className="space-y-6">
          {day?.activities?.map((act, i) => (
            <div
              key={i}
              className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition-all"
            >
              <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                {act.place_name}
              </h4>
              <p className="text-sm text-neutral-500">{act.place_address}</p>
              <p className="mt-2 text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {act.place_details}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                  🎟 {act.ticket_pricing}
                </span>
                <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-sm">
                  ⏱ {act.time_travel_each_location}
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm">
                  ☀ {act.best_time_to_visit}
                </span>
              </div>
            </div>
          ))}
        </div>
      ),
    })) || []),
  ] :[] ;

  return (
    <div className="relative w-full h-[85vh] overflow-auto">
      {tripdata &&<Timeline data={data} tripdata={tripdata} />}
    </div>
  );
}
