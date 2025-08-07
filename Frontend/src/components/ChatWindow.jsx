import useChatStore from "../store/chatStore.js";

function ChatWindow() {
  const { activeChat, messages, chats } = useChatStore();

  const contact = chats.find((chat) => chat.wa_id === activeChat);

  if (!activeChat) {
    return (
      <div className='flex-1 flex items-center justify-center text-txt-muted text-xl'>
        Select a chat to start messaging
      </div>
    );
  }

  return (
    <div className='flex-1 flex flex-col h-full'>
      <div className='p-4 border-b border-border font-semibold'>
        Chat with {contact?.name || activeChat}
      </div>

      <div className='flex-1 p-4 overflow-y-auto'>
        {messages.length === 0 ? (
          <p className='text-txt-muted'>No messages yet.</p>
        ) : (
          // todo: add chat bubbles
          <div>Message bubbles are coming soon....</div>
        )}
      </div>
    </div>
  );
}

export default ChatWindow;
