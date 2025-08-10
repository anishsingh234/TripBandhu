import React from 'react'
import ChatBot from './_components/ChatBot'
import Itinerary from '../_components/Itinerary'

export default function page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-10">
        <div>
            <ChatBot/>
        </div>
        <div>
          <Itinerary/>
        </div>
    </div>
  )
}
