import { ArrowLeft, Paperclip, Phone, Send, Video } from "lucide-react";
import useChatStore from "../store/chatStore.js";
import MessageBubble from "./MessageBubble.jsx";
import { useState } from "react";

function ChatWindow() {
  const {
    activeChat,
    messages,
    chats,
    sendMessage,
    toggleSidebar,
    isSidebarOpen,
    setActiveChat,
    messageLoading,
  } = useChatStore();
  const [text, setText] = useState("");

  const contact = chats.find((c) => c._id === activeChat);

  const handleSend = () => {
    if (!text.trim()) {
      return;
    }

    sendMessage(activeChat, text);
    setText("");

    console.log("message sent..");
  };

  if (!activeChat) {
    return (
      <div className='max-md:hidden flex-1 flex items-center justify-center text-txt-muted text-xl'>
        Select a chat to start messaging
      </div>
    );
  }

  return (
    <div
      className={`flex-1 flex flex-col h-full min-h-screen ${
        !isSidebarOpen ? "flex" : "hidden"
      }`}>
      {/* header*/}
      <div className='px-4 py-3 flex-between border-b border-border bg-bg/40'>
        <div className='flex-center gap-2'>
          {/* go back for mobile */}
          <div
            className='md:hidden icon-container'
            onClick={() => {
              setActiveChat(null);
              toggleSidebar(true);
            }}>
            <ArrowLeft className='size-6' />
          </div>

          <img
            src={`https://eu.ui-avatars.com/api/?name=${contact?.contact}&size=250&background=41b5d8&color=fff`}
            alt='profile image'
            className='size-10 rounded-full bg-bg-light md:mr-2'
          />
          <div className='text-sm'>
            <p className='font-semibold'>{contact?.contact || "Unknown"}</p>
            <p className='text-sm text-txt-muted'>online</p>
          </div>
        </div>

        <div className='flex-center gap-2'>
          <div className='icon-container'>
            <Phone className='size-6 hover:text-primary' />
          </div>
          <div className='icon-container'>
            <Video className='size-6 hover:text-primary' />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className='flex-1 p-4 overflow-y-auto'>
        {messageLoading ? (
          <p className='text-center text-txt-muted mt-4'>
            Loading messages please wait...
          </p>
        ) : messages.length === 0 ? (
          <p className='text-txt-muted'>No messages yet.</p>
        ) : (
          <MessageBubble messages={messages} />
        )}
      </div>

      {/*Chat inputs*/}
      <div className='flex-between gap-2 px-4 py-2 border-t border-border bg-bg/40'>
        <div className='icon-container'>
          <Paperclip className='size-6 hover:text-primary' />
        </div>

        <div className='input-box-container w-full my-0'>
          <input
            type='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Type a message'
            className='w-full outline-none border-none'
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
        </div>

        <div
          className={`${!text.trim() && "cursor-not-allowed"} icon-container`}
          onClick={handleSend}>
          <Send className={`size-6 ${text.trim() && "hover:text-primary"}`} />
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
