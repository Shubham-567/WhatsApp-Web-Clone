import { useEffect } from "react";
import ChatListItem from "./ChatListItem";
import useChatStore from "../store/chatStore";
import { Plus, Search } from "lucide-react";

function Sidebar() {
  const { chats, activeChat, fetchChats, fetchMessages } = useChatStore();

  // console.log(chats);

  useEffect(() => {
    fetchChats();
  }, []);
  return (
    <div className='sidebar'>
      <div className='flex-between'>
        <span className='font-bold text-2xl'>My Chats</span>
        <div className='icon-container'>
          <Plus className='size-6 hover:text-primary' />
        </div>
      </div>

      <div className='input-box-container'>
        <Search className='size-6 text-txt-muted' />
        <input
          type='text'
          placeholder='Search'
          className='w-full outline-none border-none'
        />
      </div>

      <ul className='flex flex-col gap-1'>
        {chats.map((chat) => (
          <li key={chat._id}>
            <ChatListItem
              chat={chat}
              isActive={activeChat === chat._id}
              onClick={() => fetchMessages(chat._id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
