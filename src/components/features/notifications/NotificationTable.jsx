import GeneralTable from "../../layout/Table/GeneralTable";

const AllNotificationTable = () => {
  const rows = [
    {
      campaign: "New Pros",
      content: "sjhsdjahkgjh",
      audience: "Everyone",
      type: "In-App",
      created_on: "2023-01-01",
      created_by: "Vicente Lonzono",
      published_on: "2023-01-01",
    },
    {
      campaign: "New Pros",
      content: "angsrhe",
      audience: "Everyone",
      type: "In-App",
      created_on: "2023-01-01",
      created_by: "Vicente Lonzono",
      published_on: "2023-01-01",
    },
    {
      campaign: "New Pros",
      content: "jkhactyauyl",
      audience: "Everyone",
      type: "In-App",
      created_on: "2023-01-01",
      created_by: "Vicente Lonzono",
      published_on: "2023-01-01",
    },
  ];
  const columns = [
    { id: "campaign", label: "Campaign" },
    { id: "content", label: "Content" },
    { id: "audience", label: "Audience" },
    { id: "type", label: "Type" },
    { id: "created_on", label: "Created On" },
    { id: "published_on", label: "Published On" },
    { id: "created_by", label: "Created By" },
  ];

  return (
    <div>
    <GeneralTable columns={columns} data={rows} clickableRows={true} openModal={true} modalName={"NotificationModal"} />
    </div>
  );
};

export default AllNotificationTable;
