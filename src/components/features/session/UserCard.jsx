import { Language, LocationOn, OpenInNew } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import crown from "../../../assets/crown.png";

const UserCard = ({ user }) => (
  <div>
    <div className="flex items-center py-2 px-4 rounded-3xl border shadow-md bg-white">
      <div className="relative mr-4">
        <Avatar
          src={user?.profileAvatar || "default-profile.jpg"}
          alt={`${user?.firstName || "Unknown"} ${user?.lastName || ""}`}
        />
        {user?.role?.toLowerCase() === "pro" && (
          <img src={crown} className="absolute -top-2 -right-2 w-6 h-6 rounded-full" alt="Crown" />
        )}
      </div>
      <div className="flex-1">
        <h6 className="text-base font-semibold">
          {`${user?.firstName || "Anonymous"} ${user?.lastName || ""}`}
        </h6>
        <div className="flex items-center text-[#666666] text-sm">
          <span>👤 {user?.age || "N/A"}</span>
          <LocationOn fontSize="small" className="ml-1 mr-1" />
          {user?.location || "Unknown"}
        </div>
        <div className="flex items-center text-[#666666] text-sm">
          <Language fontSize="small" className="mr-1" />
          {user?.languages?.join(", ") || "N/A"}
        </div>
      </div>
      <IconButton>
        <OpenInNew className="text-[#8734A3]" />
      </IconButton>
    </div>
  </div>
);

export default UserCard;
