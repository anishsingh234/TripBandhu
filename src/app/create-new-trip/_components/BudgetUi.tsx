export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of costs",
    icon: "💵",
    color: "bg-green-100 text-green-600",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep cost on the average side",
    icon: "💰",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Don't worry about cost",
    icon: "🛳️",
    color: "bg-purple-100 text-purple-600",
  },
];

export default function BudgetUi({ onSelectOption }: any) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {SelectBudgetOptions.map((item) => (
        <div
          key={item.id}
          className={`p-5 rounded-xl border shadow-sm transition transform hover:scale-105 hover:shadow-md cursor-pointer bg-white`}
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
