import { suggestions } from '@/app/_components/Hero'
import React from 'react'

export default function EmptyBoxState({ onSelectOption }: { onSelectOption: (option: string) => void }) {
  return (
    <div className="mt-6 flex flex-col items-center text-center px-4">
      <h2 className="text-2xl font-semibold">
        Start planning your new <strong className="text-primary">Trip</strong> using AI
      </h2>
      <p className="mt-2 text-gray-600 max-w-xl">
        Let AI help you create personalized travel itineraries. Select one of the options below to get started.
      </p>

      <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mt-6 max-w-3xl">
        {suggestions.map((item, index) => (
          <div
            key={index}
            onClick={() => onSelectOption(item.title)}
            className="flex items-center gap-2 border rounded-full px-5 py-2 cursor-pointer hover:border-primary hover:text-primary shadow-sm transition-all duration-200 hover:shadow-md"
          >
            {item.icon}
            <span className="text-lg font-medium">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
