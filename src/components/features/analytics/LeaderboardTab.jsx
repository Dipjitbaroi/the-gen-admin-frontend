import React from "react";

const LeaderboardTab = () => {
  const topPros = [
    { name: "Robert Fox", joinedOn: "04/11/2022", sessions: 45 },
    { name: "Robert Fox", joinedOn: "04/11/2022", sessions: 45 },
    { name: "Robert Fox", joinedOn: "04/11/2022", sessions: 45 },
    { name: "Robert Fox", joinedOn: "04/11/2022", sessions: 45 },
    { name: "Robert Fox", joinedOn: "04/11/2022", sessions: 45 },
  ];

  const topPeers = [
    { name: "Robert Fox", joinedOn: "04/11/2022", sessions: 45 },
    { name: "Robert Fox", joinedOn: "04/11/2022", sessions: 45 },
    { name: "Robert Fox", joinedOn: "04/11/2022", sessions: 45 },
    { name: "Robert Fox", joinedOn: "04/11/2022", sessions: 45 },
    { name: "Robert Fox", joinedOn: "04/11/2022", sessions: 45 },
  ];

  const renderTable = (title, data) => (
    <div className="w-full lg:w-1/2 p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <select className="border rounded-md px-3 py-1 text-gray-600">
            <option>This Month</option>
            <option>Last Month</option>
          </select>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b py-2 text-sm text-gray-600 font-medium">
                Name
              </th>
              <th className="border-b py-2 text-sm text-gray-600 font-medium">
                Joined On
              </th>
              <th className="border-b py-2 text-sm text-gray-600 font-medium">
                Sessions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="text-sm text-gray-700">
                <td className="border-b py-2">{row.name}</td>
                <td className="border-b py-2">{row.joinedOn}</td>
                <td className="border-b py-2">{row.sessions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="flex flex-wrap">
      {renderTable("Top Pros", topPros)}
      {renderTable("Top Peers", topPeers)}
    </div>
  );
};

export default LeaderboardTab;
