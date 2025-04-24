export default function HomeCounter() {
  const stats = [
    { number: '239,564', label: 'tradespeople' },
    { number: '40+', label: 'categories' },
    { number: '2,557,114', label: 'reviews' },
  ];

  return (
    <div className="bg-white py-12">
      <div className="w-full px-4 lg:w-[880px] md:mx-auto flex xs:flex-col justify-between items-center md:gap-24 text-center">
        {stats.map((item, index) => (
          <div key={index} className="flex flex-col items-start md:gap-3 border-l-6 border-[#2f76d9] px-2">
            <p className="xs:text-md sm:text-xl md:text-4xl font-bold text-gray-900">{item.number}</p>
            <p className="xs:text-md sm:text-lg font-bold text-gray-700">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
