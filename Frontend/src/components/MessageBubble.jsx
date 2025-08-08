import { Check, CheckCheck } from "lucide-react";
import { formatTimestamp } from "../utils/utils.js";

const getStatusIcon = (status) => {
  switch (status) {
    case "sent":
      return <Check className='size-4 inline text-gray-400' />;
    case "delivered":
      return <CheckCheck className='size-4 inline text-gray-400' />;
    case "read":
      return <CheckCheck className='size-4 inline text-primary' />;
    default:
      return;
  }
};

function MessageBubble({ messages }) {
  return (
    <div className='flex flex-col gap-2'>
      {messages.map((msg) => (
        <div
          key={msg.meta_msg_id}
          className={`max-w-xs px-3 py-2 rounded-2xl text-sm break-words ${
            msg.direction === "outgoing"
              ? "bg-gradient-to-br from-cyan-800 to-cyan-900 text-text-primary self-end rounded-br-none"
              : "bg-bg-light text-text-primary self-start rounded-bl-none"
          }`}>
          <p>{msg.message}</p>

          <p className={`mt-2 space-x-1 text-xs text-right text-txt-muted`}>
            <span>{formatTimestamp(msg.timestamp)}</span>
            {msg.direction === "outgoing" && getStatusIcon(msg.status)}
          </p>
        </div>
      ))}
    </div>
  );
}

export default MessageBubble;
