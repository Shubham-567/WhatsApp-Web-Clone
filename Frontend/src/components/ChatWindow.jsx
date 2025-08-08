import { ArrowLeft, Paperclip, Phone, Send, Video } from "lucide-react";
import useChatStore from "../store/chatStore.js";
import MessageBubble from "./MessageBubble.jsx";

function ChatWindow() {
  const { activeChat, messages, chats } = useChatStore();

  const contact = chats.find((c) => c._id === activeChat);

  // console.log(contact)
  // console.log(messages);

  if (!activeChat) {
    return (
      <div className='flex-1 flex items-center justify-center text-txt-muted text-xl'>
        Select a chat to start messaging
      </div>
    );
  }

  return (
    <div className='flex-1 flex flex-col h-full'>
      {/* header*/}
      <div className='px-4 py-2 flex-between border-b border-border bg-bg/40'>
        <div className='flex-center gap-2'>
          <div className='icon-container'>
            <ArrowLeft className='size-6' />
          </div>

          <img
            src={`https://avatar.iran.liara.run/public?username=${contact?.name}`}
            alt='profile image'
            className='size-12 rounded-full bg-bg-light'
          />
          <div className='text-sm'>
            <p className='font-semibold'>{contact?.name || "Unknown"}</p>
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
        {messages.length === 0 ? (
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
            placeholder='Search'
            className='w-full outline-none border-none'
          />
        </div>

        <div className='icon-container'>
          <Send className='size-6 hover:text-primary' />
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
