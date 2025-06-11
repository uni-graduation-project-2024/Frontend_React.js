export const TimeAgo = ({dateString}) => {
    if (!dateString) return "Invalid date is undef";
    const date = new Date(dateString);
    if (isNaN(date)) return "Invalid date";

    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    const intervals = {
      year: 31536000,
      month: 2592000,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };

    for (let unit in intervals) {
      const interval = Math.floor(diffInSeconds / intervals[unit]);
      if (interval >= 1) {
        return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
          -interval,
          unit
        );
      }
    }
  }

export const TimeUntil = ({ dateString }) => {
  if (!dateString) return "Invalid date";

  const targetDate = new Date(dateString);
  if (isNaN(targetDate)) return "Invalid date";

  const now = new Date();
  const diffInSeconds = Math.floor((targetDate - now) / 1000);

  if (diffInSeconds <= 0) return "Ended";

  const intervals = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (let unit in intervals) {
    const interval = Math.floor(diffInSeconds / intervals[unit]);
    if (interval >= 1) {
      return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
        interval,
        unit
      );
    }
  }

  return "Less than a second";
};
