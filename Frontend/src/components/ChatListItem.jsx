import { formatTimestamp } from "../utils/utils";

function ChatListItem({ chat, onClick, isActive }) {
  return (
    <div
      className={`flex-center p-2 cursor-pointer hover:bg-bg rounded-xl transition-all ${
        isActive ? "bg-bg-light" : ""
      }`}
      onClick={onClick}>
      <img
        src='https://avatar.iran.liara.run/public'
        alt='profile image'
        className='size-12 rounded-full bg-bg-light'
      />
      <div className='text-sm space-y-1.5 w-full'>
        <p className='font-semibold flex-between'>
          {chat.name}

          <span className='text-primary font-normal text-xs'>
            {formatTimestamp(chat.lastTimestamp)}
          </span>
        </p>
        <p className='text-sm text-txt-muted line-clamp-1'>
          {chat.name}: {chat.lastMessage}
        </p>
      </div>
    </div>
  );
}

export default ChatListItem;
