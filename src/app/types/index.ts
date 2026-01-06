export interface HotelType {
  hotel_name: string;
  hotel_address: string;
  price_per_night: string;
  hotel_image_url: string;
  description?: string;
  geo_coordinates?: {
    latitude: number;
    longitude: number;
  };
  rating?: number;
}

export interface DayItineraryType {
  day: number;
  day_plan?: string;
  theme?: string;
  activities: Array<{
    time: string;
    activity?: string;
    place_name?: string;
    place_address?: string;
    place_details?: string;
    description?: string;
    best_time_to_visit?: string;
    ticket_pricing?: string;
    time_travel_each_location?: string;
  }>;
}

export interface TripInfo {
  destination: string;
  duration: string;
  origin: string;
  budget: string;
  group_size: string;
  hotels?: HotelType[];
  itinerary?: DayItineraryType[];
}
