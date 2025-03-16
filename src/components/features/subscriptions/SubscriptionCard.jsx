import { Check, Edit, Visibility } from "@mui/icons-material";
import React from "react";

const SubscriptionCard = ({ title, details, price, audience, onClick }) => {
  return (
    <div className="max-w-sm mx-auto p-6 shadow-lg bg-white rounded-xl cursor-pointer transition mr-4">
      <div className="flex justify-between">
        <h2 className="font-medium mb-4 text-xl">{title}</h2>
        <div className="p-2 rounded-full hover:bg-gray-100">
          <Edit onClick={onClick} className="text-[#8734A3]" />
        </div>
      </div>
      {details.map((detail, index) => (
        <div key={index} className="mb-2 flex items-start">
          <Check className="text-[#8734A3] mr-2 mt-1" />
          <p>{detail}</p>
        </div>
      ))}
      <p className="mt-4 text-xl">{price}</p>
      <div className="flex items-center mt-2">
        <Visibility className="text-gray-500 mr-2" />
        <p className="text-sm text-gray-500">{audience}</p>
      </div>
    </div>
  );
};

export default SubscriptionCard;
