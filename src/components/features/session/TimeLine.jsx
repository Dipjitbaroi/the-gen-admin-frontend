const Timeline = () => (
  <div className="max-w-md mx-auto">
    {["Session created", "User joined", "Session ended"].map((event, index) => (
      <div key={index} className="grid grid-cols-4 items-center">
        <div className="col-span-1 text-right pr-4">
          <p className="text-base text-gray-500">10:23</p>
          <p className="text-base text-gray-500">May 8, 2024</p>
        </div>
        <div className="col-span-3">
          <div className="flex items-center border-l h-20 ml-4">
            <div className="bg-gray-300 w-8 h-8 rounded-full -ml-4"></div>
            <p className="text-lg ml-8">{event}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default Timeline;
