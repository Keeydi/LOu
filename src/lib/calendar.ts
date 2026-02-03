/**
 * Build a Google Calendar "Add event" URL.
 * Opens in new tab so user can add the event to their calendar.
 */
export function getGoogleCalendarUrl(
  title: string,
  date: string,
  time: string,
  details: string,
  location = ""
): string {
  // Parse "Feb 14, 2026" and "6:00 PM" into YYYYMMDD and HHMM
  const dateObj = new Date(date + " " + time);
  if (Number.isNaN(dateObj.getTime())) {
    // Fallback: Feb 14, 2026 6:00 PM
    return "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Valentine+Date&dates=20260214T180000/20260214T200000&details=Karinderya+date";
  }
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const start = `${year}${month}${day}T${String(hours).padStart(2, "0")}${String(minutes).padStart(2, "0")}00`;
  const endDate = new Date(dateObj);
  endDate.setHours(endDate.getHours() + 2);
  const endHours = String(endDate.getHours()).padStart(2, "0");
  const endMinutes = String(endDate.getMinutes()).padStart(2, "0");
  const end = `${year}${month}${day}T${endHours}${endMinutes}00`;

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${start}/${end}`,
    details: details,
    location: location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Create and download an .ics file for Outlook/Apple Calendar.
 */
export function downloadIcs(
  title: string,
  date: string,
  time: string,
  details: string,
  location = ""
): void {
  let dateObj = new Date(date + " " + time);
  if (Number.isNaN(dateObj.getTime())) {
    dateObj = new Date(2026, 1, 14, 18, 0, 0); // Feb 14, 2026 6:00 PM
  }
  const end = new Date(dateObj);
  end.setHours(end.getHours() + 2);

  const formatUtc = (d: Date) => {
    return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  };

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `DTSTART:${formatUtc(dateObj)}`,
    `DTEND:${formatUtc(end)}`,
    `SUMMARY:${title.replace(/\n/g, "\\n")}`,
    `DESCRIPTION:${details.replace(/\n/g, "\\n")}`,
    location ? `LOCATION:${location}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "valentine-date.ics";
  a.click();
  URL.revokeObjectURL(url);
}
