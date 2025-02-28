const SubscriptionCard = ({ title, details, price, audience, onClick }) => {
  return (
    <div
      className="border bg-white border-gray-300 p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition"
      onClick={onClick}
    >
      <h2 className="text-xl font-bold text-purple-600 mb-4">{title}</h2>
      <ul className="text-gray-700 mb-4 space-y-2">
        {details.map((detail, index) => (
          <li key={index} className="text-sm">
            {detail}
          </li>
        ))}
      </ul>
      <p className="text-gray-500 text-sm">Audience: {audience}</p>
      <p className="text-lg font-semibold text-gray-800">{price}</p>
    </div>
  );
};

export default SubscriptionCard;
