export function formatTimestamp(dateInput) {
  const d = new Date(dateInput);
  const now = new Date();

  const isSameDay = (a, b) => a.toDateString() === b.toDateString();

  if (isSameDay(d, now)) {
    return d
      .toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      .toLowerCase();
  }

  const yesterday = new Date();

  yesterday.setDate(now.getDate() - 1);

  if (isSameDay(d, yesterday)) {
    return "Yesterday";
  }

  return d.toLocaleDateString("en-GB"); // dd/mm/yyyy
}
