import {
  ArrowBack,
  Language,
  LocationOn,
  OpenInNew,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import ChatUI from "../components/layout/ChatUI/ChatUi";

const ReportPage = () => {
  const [activeTab, setActiveTab] = useState("About");
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    if (activeTab === "Recording") {
      fetchVideoUrl();
    }
  }, [activeTab]);

  const fetchVideoUrl = async () => {
    // Replace this URL with the actual API endpoint
    const response = await fetch("https://api.example.com/video");
    const data = await response.json();
    setVideoUrl(data.url);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between h-12 mb-6">
        <div className="flex items-center">
          <IconButton>
            <ArrowBack />
          </IconButton>
          <h5 className="ml-2 text-3xl font-semibold">00001</h5>
        </div>
        <div className="flex gap-2">
          <button className="border-2 border-[#8734A3] hover:bg-gray-200 text-[#8734A3] py-2 px-6 rounded-lg font-semibold">
            Temporarily Ban User
          </button>
          <button className="border-2 border-[#8734A3] hover:bg-gray-200 text-[#8734A3] py-2 px-6 rounded-lg font-semibold">
            Permanently Ban User
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg border border-gray-300">
        <div className="flex border-b border-gray-300">
          {["About", "Transcript", "Recording"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex px-6 py-4 text-sm font-medium justify-center ${
                activeTab === tab
                  ? "border-b-2 border-purple-600 text-purple-600"
                  : "text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Section */}
        <div className="flex p-4">
          {/* Left Section: Report Details */}
          <div className="w-2/3">
            {activeTab === "About" && (
              <div className="mb-4">
                <h6 className="text-lg font-semibold">About The Report</h6>
                <div className="grid grid-cols-2 gap-y-4">
                  <div className="flex flex-col">
                    <p className="text-sm text-[#666666]">Report ID</p>
                    <p className="text-base">00001</p>
                  </div>

                  <div className="flex flex-col">
                    <p className="text-sm text-[#666666]">Report Type</p>
                    <p className="text-base">Harassment</p>
                  </div>

                  <div className="flex flex-col">
                    <p className="text-sm text-[#666666]">Status</p>
                    <p className="text-base text-green-600">Open</p>
                  </div>

                  <div className="flex flex-col">
                    <p className="text-sm text-[#666666]">Reported On</p>
                    <p className="text-base">20/02/2024 04:56 PM</p>
                  </div>

                  <div className="col-span-2 flex flex-col">
                    <p className="text-sm text-[#666666]">Communication</p>
                    <p className="text-base">10 minutes</p>
                  </div>

                  <div className="col-span-2 flex flex-col">
                    <p className="text-sm text-[#666666]">Comment</p>
                    <p className="text-base">
                      Lorem ipsum dolor sit amet consectetur...
                    </p>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "Transcript" && (
              <div className="mb-4">
                <h6 className="text-lg mb-4 font-semibold">Transcript</h6>
                <div className="mr-4">
                  <ChatUI />
                </div>
              </div>
            )}
            {activeTab === "Recording" && (
              <div className="mb-4">
                <h6 className="text-lg mb-4 font-semibold">Recording</h6>
                <div className="mr-4">
                  {videoUrl ? (
                    <ReactPlayer url={videoUrl} controls width="100%" />
                  ) : (
                    <p>No video available</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Section: People */}
          <div className="border-l pl-4 w-1/3">
            <h6 className="text-lg font-semibold mb-4">People</h6>
            <div>
              <p className="text-sm font-medium text-[#666666]">
                REPORTED USER
              </p>
              <div className="flex items-center p-4 rounded-3xl border shadow-md bg-white">
                <div className="relative mr-4">
                  <Avatar
                    src="profile-picture-url"
                    alt="Fiona Albert"
                    className="w-24 h-24"
                  />
                  <div className="absolute top-0 right-0 w-4 h-4 bg-purple-600 rounded-full"></div>
                </div>
                <div className="flex-1">
                  <h6 className="text-base font-semibold">
                    Fiona Albert, She/Her
                  </h6>
                  <div className="flex items-center text-[#666666] text-sm">
                    <span>👤 28</span>
                    <LocationOn fontSize="small" className="ml-1 mr-1 " />{" "}
                    London, UK
                  </div>
                  <div className="flex items-center text-[#666666] text-sm">
                    <Language fontSize="small" className="mr-1" /> English,
                    Spanish, Arabic
                  </div>
                </div>
                <IconButton>
                  <OpenInNew className="text-[#8734A3]" />
                </IconButton>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-[#666666]">REPORTED BY</p>
              <div className="flex items-center p-4 rounded-3xl border shadow-md bg-white">
                <div className="relative mr-4">
                  <Avatar
                    src="profile-picture-url"
                    alt="Fiona Albert"
                    className="w-24 h-24"
                  />
                  <div className="absolute top-0 right-0 w-4 h-4 bg-purple-600 rounded-full"></div>
                </div>
                <div className="flex-1">
                  <h6 className="text-base font-semibold">
                    Fiona Albert, She/Her
                  </h6>
                  <div className="flex items-center text-[#666666] text-sm">
                    <span>👤 28</span>
                    <LocationOn fontSize="small" className="ml-1 mr-1" />{" "}
                    London, UK
                  </div>
                  <div className="flex items-center text-[#666666] text-sm">
                    <Language fontSize="small" className="mr-1" /> English,
                    Spanish, Arabic
                  </div>
                </div>
                <IconButton>
                  <OpenInNew className="text-[#8734A3]" />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
