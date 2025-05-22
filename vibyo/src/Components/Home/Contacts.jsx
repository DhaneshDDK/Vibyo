import React, { useState } from "react";
import Search from "./Search";
import MenuIcon from "../../assets/menu_icon.png";
import Avatar_Icon from "../../assets/avatar_icon.png";

const Contacts = () => {
  const [isUserSelected, setIsUserSelected] = useState(false);
  const messageCount = 4000000;
  const data = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    name: `User Dhanesh Kumar ${index + 1}`,
    status: index < 3 ? "Online" : "Offline",
  }));
  const getDisplayCount = (count) => {
    if (count >= 1_000_000)
      return (count / 1_000_000).toFixed(count >= 10_000_000 ? 0 : 1) + "M";
    if (count >= 1_000)
      return (count / 1_000).toFixed(count >= 10_000 ? 0 : 1) + "k";
    return count.toString();
  };

  const formattedMessageCount = React.useMemo(() => {
    return getDisplayCount(messageCount);
  }, [messageCount]);

  return (
    <div className="pl-5 py-1 flex flex-col h-full w-full">
      <div
        className={`text-gray-300 font-bold text-[2em] flex items-center justify-between`}
      >
        <h1>Chats</h1>
        <div className="flex items-center justify-center gap-2 cursor-pointer">
          <img src={MenuIcon} alt="menu" width={25} />
        </div>
      </div>
      <Search />
      <div className="flex flex-col items-start justify-start gap-2 mt-5 w-full h-full overflow-y-auto">
        {data.map((user, index) => (
          <div
            key={index}
            onClick={() => setIsUserSelected(user)}
            className={`w-full grid grid-cols-[45px_1fr_auto] gap-2 px-1 py-1 rounded-lg cursor-pointer ${
              isUserSelected?.id === user.id ? "bg-gray-500" : ""
            }`}
          >
            {/* Avatar */}
            <div className="flex items-center justify-center">
              <img
                src={Avatar_Icon}
                alt="avatar"
                className="w-[35px] aspect-square rounded-full"
              />
            </div>

            {/* Name + Status */}
            <div className="flex flex-col justify-center overflow-x-hidden">
              <p className="text-white text-md font-medium truncate whitespace-nowrap">
                {user.name}
              </p>
              <span
                className={`text-xs ${
                  index < 3 ? "text-green-400" : "text-neutral-400"
                }`}
              >
                Online
              </span>
            </div>

            {/* Timestamp + Badge */}
            <div className="flex flex-col items-end justify-center gap-1">
              {index > 0 && (
                <>
                  <div className="text-xs text-gray-300">Yesterday</div>
                  {/* <div className="min-w-[1.5rem] aspect-square px-1 text-xs font-semibold text-white bg-violet-500/60 flex justify-center items-center rounded-full">
                    {4}
                  </div> */}
                  <div className="px-2 min-w-[1.5rem] h-[1.5rem] text-xs font-semibold text-white bg-violet-500/60 flex justify-center items-center rounded-full">
                    {formattedMessageCount}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contacts;
