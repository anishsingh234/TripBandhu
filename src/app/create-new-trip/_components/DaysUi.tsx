export const SelectDaysOptions = [
  {
    id: 1,
    title: "1-3 Days",
    desc: "A quick getaway",
    icon: "⏳",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    title: "4-7 Days",
    desc: "A short vacation",
    icon: "📅",
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: 3,
    title: "8+ Days",
    desc: "A long adventure",
    icon: "🌍",
    color: "bg-pink-100 text-pink-600",
  },
];

export default function DaysUi({ onSelectOption }: any) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {SelectDaysOptions.map((item) => (
        <div
          key={item.id}
          className="p-5 rounded-xl border shadow-sm transition transform hover:scale-105 hover:shadow-md cursor-pointer bg-white"
          onClick={() => onSelectOption(`${item.title}: ${item.desc}`)}
        >
          <div
            className={`w-12 h-12 flex items-center justify-center rounded-full text-2xl ${item.color} mb-3`}
          >
            {item.icon}
          </div>
          <h2 className="text-lg font-semibold">{item.title}</h2>
          <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}
