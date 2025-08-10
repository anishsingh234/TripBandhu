import { div } from 'motion/react-client';
import React from 'react'

export const SelectTravelersList = [
  {
    id: 1,
    title: 'Just Me',
    desc: 'A sole traveler in exploration',
    icon: '✈️',
    people: '1'
  },
  {
    id: 2,
    title: 'A Couple',
    desc: 'Two travelers in tandem',
    icon: '🥂',
    people: '2 People'
  },
  {
    id: 3,
    title: 'Family',
    desc: 'A group of fun loving adventurers',
    icon: '🏡',
    people: '3 to 5 People'
  },
  {
    id: 4,
    title: 'Friends',
    desc: 'A bunch of thrill-seekers',
    icon: '⛵',
    people: '5 to 10 People'
  }
];
export default function GroupSizeUi({ onSelectOption }: any) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {SelectTravelersList.map((item) => (
        <div
          key={item.id}
          className="p-5 rounded-xl border shadow-sm transition transform hover:scale-105 hover:shadow-md cursor-pointer bg-white"
          onClick={() => onSelectOption(`${item.title}: ${item.people}`)}
        >
          {/* Icon */}
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-2xl mb-3">
            {item.icon}
          </div>

          {/* Title */}
          <h2 className="text-lg font-semibold">{item.title}</h2>

          {/* Description */}
          <p className="text-gray-500 text-sm">{item.desc}</p>

          {/* People count */}
          <p className="text-sm mt-2 font-medium text-blue-600">
            {item.people}
          </p>
        </div>
      ))}
    </div>
  );
}
