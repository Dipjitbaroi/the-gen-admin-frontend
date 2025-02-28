import { useState } from "react";
import SubscriptionCard from "../components/features/subscriptions/SubscriptionCard.jsx";
import SubscriptionModal from "../components/features/subscriptions/SubscriptionModal.jsx";


const Subscriptions = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const handleCardClick = (data) => {
    setModalData(data);
    setOpenModal(true);
  };

  const subscriptions = [
    {
      title: "Unlimited",
      details: [
        "Unlimited messages with other peers",
        "Upgrade to Pro plan anytime",
        "Book appointments with Pros*",
      ],
      price: "£5.99/month",
      audience: "Everyone",
    },
    {
      title: "Pro",
      details: [
        "Unlimited messages with other peers",
        "Upgrade to Pro plan anytime",
        "Book appointments with Pros*",
      ],
      price: "£5.99/month",
      audience: "Peers",
    },
  ];

  return (
    <div className="">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Subscriptions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subscriptions.map((subscription, index) => (
          <SubscriptionCard
            key={index}
            title={subscription.title}
            details={subscription.details}
            price={subscription.price}
            audience={subscription.audience}
            onClick={() => handleCardClick(subscription)}
          />
        ))}
      </div>

      {/* Modal */}
      <SubscriptionModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        data={modalData}
      />
    </div>
  );
};

export default Subscriptions;
