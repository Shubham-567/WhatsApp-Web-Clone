import { formatTimestamp } from "../utils/utils.js";

function MessageBubble({ messages }) {
  return (
    <div className='flex flex-col gap-4'>
      {messages.map((msg) => (
        <div
          key={msg.meta_msg_id}
          className={`max-w-xs px-3 py-2 rounded-xl text-sm ${
            msg.direction === "outgoing"
              ? "bg-gradient-to-br from-cyan-800 to-cyan-900 text-text-primary self-end rounded-br-none"
              : "bg-bg-light text-text-primary self-start rounded-bl-none"
          }`}>
          <p>{msg.message}</p>

          <p
            className={`mt-2 text-xs text-right ${
              msg.direction === "outgoing" ? "text-white/80" : "text-txt-muted"
            }`}>
            {formatTimestamp(msg.timestamp)}
          </p>
        </div>
      ))}
    </div>
  );
}

export default MessageBubble;
