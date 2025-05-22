import { random } from "lodash";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const ChatRoom = () => {
  const { user } = useSelector((state) => state.user);
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const messagesEndRef = useRef(null);

  const handleSendMessage = (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: messages.length + 1,
        userId: random(1, 2),
        text: message,
      },
    ]);
    setMessage("");
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop =
        messagesEndRef.current.scrollHeight -
        messagesEndRef.current.clientHeight;
    }
  }, [messages]);

  return (
    <div className="md:pr-5 py-1 pl-4 md:pl-10 h-full w-full flex flex-col">
      <div className="text-[1em] pt-2 md:pt-0 md:text-[2em] pb-2 font-semibold text-white">
        Chat Room
      </div>
      <div className="h-[2px] w-full bg-gray-700"></div>

      {/* Message List */}
      <div
        className="flex flex-col gap-3 py-5 overflow-y-auto h-full w-full pr-3"
        ref={messagesEndRef}
      >
        {messages.map(({ id, userId, text }, index) => {
          const isCurrentUser = userId !== 1;

          return (
            <div
              key={`${id}-${index}`}
              className={`flex items-end gap-2 max-w-full ${
                isCurrentUser
                  ? "self-start flex-row"
                  : "self-end flex-row-reverse"
              }`}
            >
              {/* Avatar */}
              <img
                src={user?.profile_photo_url}
                alt="avatar"
                className="w-9 h-9 rounded-full shadow-lg"
              />

              {/* Message bubble */}
              <div className="relative max-w-[70%]">
                <p
                  className={`p-3 rounded-2xl text-md font-medium leading-relaxed shadow-md break-words whitespace-pre-wrap ${
                    isCurrentUser
                      ? "bg-gray-800/50 text-gray-300"
                      : "bg-gradient-to-br from-fuchsia-500/50 to-violet-700/50 text-white"
                  }`}
                >
                  {text}
                </p>

                {/* Triangle tail */}
                <div
                  className={`absolute bottom-3 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent ${
                    isCurrentUser
                      ? "border-r-8 border-r-violet-600 -left-2"
                      : "border-l-8 border-l-violet-700 -right-2"
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Input box */}
      <div className="p-4 rounded-lg flex items-center gap-3">
        <div className="flex-1 text-white px-4 py-3 border-2 border-gray-800 rounded-full bg-gray-700/50">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && message.trim()) {
                handleSendMessage(message);
              }
            }}
            className="w-full bg-transparent outline-none placeholder-gray-400"
            placeholder="Type a message..."
          />
        </div>
        <button
          onClick={() => handleSendMessage(message)}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
