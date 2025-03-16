import { useState } from "react";
import SubscriptionCard from "../components/features/subscriptions/SubscriptionCard.jsx";
import SubscriptionModal from "../components/features/subscriptions/SubscriptionModal.jsx";
import { useGetSubscriptionsQuery } from "../services/apiConfig.js";
import Loader from "../components/layout/Loader/Loader.jsx";
import currencyConfig from "../assets/currencies/currencies.json";

const Subscriptions = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const currency = currencyConfig.currencies["MAIN"];

  const handleCardClick = (data) => {
    setModalData(data);
    setOpenModal(true);
  };

  const { data: subscriptions, isLoading, error } = useGetSubscriptionsQuery();

  if (isLoading) return <Loader />;
  if (error)
    return <p className="text-red-500">Error loading subscriptions.</p>;

  return (
    <div className="">
      <h1 className="text-4xl font-bold text-gray-800 h-12 mb-6">
        Subscriptions
      </h1>
      <div className="flex w-fit">
        {subscriptions?.map((subscription) => (
          <SubscriptionCard
            key={subscription._id}
            title={subscription.name}
            details={subscription.benefits}
            price={`${currency.symbol}${subscription.price}/month`}
            audience={
              subscription.name.toLowerCase() === "pro" ? "Peer" : "Everyone"
            }
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
