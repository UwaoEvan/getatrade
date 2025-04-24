export default function HomeCounter() {
  const stats = [
    { number: '239,564', label: 'tradespeople' },
    { number: '40+', label: 'trade categories' },
    { number: '2,557,114', label: 'reviews' },
  ];

  return (
    <div className="bg-white py-12">
      <div className="w-[880px] mx-auto flex flex-col md:flex-row justify-between items-center gap-12 md:gap-24 text-center">
        {stats.map((item, index) => (
          <div key={index} className="flex flex-col items-start gap-3 border-l-6 border-[#2f76d9] px-2">
            <p className="text-3xl md:text-4xl font-bold text-gray-900">{item.number}</p>
            <p className="text-lg font-bold text-gray-700">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
