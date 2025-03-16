import React, { useState } from "react";

const ChatUI = () => {
  const [messages] = useState([
    {
      text: "What is the best programming language?",
      type: "text",
      role: "sender",
      name: "Jordyn Siphron",
    },
    {
      text: "It depends on your use case. Python is great for beginners and AI, while JavaScript is essential for web development.",
      type: "text",
      role: "receiver",
      name: "Jordyn Siphron",
    },
    {
      text: "/path/to/audio.mp3",
      type: "audio",
      role: "sender",
      name: "Jordyn Siphron",
    },
    {
      images: ["/path/to/image1.jpg", "/path/to/image2.jpg"],
      type: "image",
      role: "receiver",
      name: "Jordyn Siphron",
    },
    {
      text: "/path/to/audio.mp3",
      type: "audio",
      role: "receiver",
      name: "Jordyn Siphron",
    },
    {
      images: [
        "/path/to/image3.jpg",
        "/path/to/image4.jpg",
        "/path/to/image5.jpg",
      ],
      type: "image",
      role: "sender",
      name: "Jordyn Siphron",
    },
  ]);

  return (
    <div className="flex flex-col h-[500px] bg-gray-100 rounded-xl p-4">
      {/* Chat Messages (Scrollable) */}
      <div className="flex flex-col flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 pr-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex mb-2 ${
              message.role === "sender" ? "justify-end" : "justify-start"
            }`}
          >
            {/* Container for name and message */}
            <div
              className={`flex flex-col max-w-[70%] ${
                message.role === "sender" ? "items-end" : "items-start"                                   
              }`}
            >
              {/* Sender Name */}
              <span className="text-gray-500 text-sm mb-1">{message.name}</span>

              {/* Message Rendering */}
              {message.type === "text" && (
                <div
                  className={`py-2 px-4 break-words whitespace-pre-line ${
                    message.role === "sender"
                      ? "bg-[#8734A3] text-white rounded-2xl rounded-tr-md"
                      : "bg-gray-200 text-[#666666] rounded-2xl rounded-bl-md"
                  }`}
                >
                  {message.text}
                </div>
              )}

              {message.type === "image" && (
                <div className="flex flex-wrap gap-2 text-end">
                  {message.images.map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={image}
                      alt={`Sent image ${imgIndex + 1}`}
                      className="w-48 h-auto rounded-lg"
                    />
                  ))}
                </div>
              )}

              {message.type === "audio" && (
                <audio
                  controls
                  className={`mt-2 w-50 border-4 rounded-full ${
                    message.role === "sender"
                      ? "border-[#8734A3] rounded-tr-md"
                      : "border-gray-300 rounded-bl-md"
                  }`}
                >
                  <source src={message.text} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatUI;
