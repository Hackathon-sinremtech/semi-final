
const StatsCard = ({ title, value, change, color }) => {
    const colorClasses = {
      blue: 'bg-blue-100 text-blue-600',
      purple: 'bg-purple-100 text-purple-600',
      green: 'bg-green-100 text-green-600',
      orange: 'bg-orange-100 text-orange-600'
    };
  
    return (
      <div className="p-6 rounded-xl border border-gray-200">
        <p className="text-sm text-gray-500 mb-2">{title}</p>
        <div className="flex justify-between items-end">
          <p className="text-2xl font-bold">{value}</p>
          <span className={`text-sm ${colorClasses[color]}`}>
            {change}
          </span>
        </div>
      </div>
    );
  };
  
  
  export default StatsCard;