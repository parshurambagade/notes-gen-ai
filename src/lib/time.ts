/**
   * Converts an ISO timestamp to relative time (e.g., "2 hours ago", "1 min ago")
   * @param timestamp - ISO timestamp string (e.g., "2025-06-23T06:30:11.29+00:00")
   * @returns Formatted relative time string
   */
  export function formatRelativeTime(timestamp: string | Date): string {
    try {
      const now = new Date();
      const past = new Date(timestamp);
  
      // Check if the date is valid
      if (isNaN(past.getTime())) {
        return "Invalid date";
      }
  
      const diffInMs = now.getTime() - past.getTime();
      const diffInSeconds = Math.floor(diffInMs / 1000);
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      const diffInHours = Math.floor(diffInMinutes / 60);
      const diffInDays = Math.floor(diffInHours / 24);
      const diffInWeeks = Math.floor(diffInDays / 7);
      const diffInMonths = Math.floor(diffInDays / 30);
      const diffInYears = Math.floor(diffInDays / 365);
  
      // Handle future dates
      if (diffInMs < 0) {
        return "Just now";
      }
  
      // Less than 1 minute
      if (diffInSeconds < 60) {
        return diffInSeconds <= 5 ? "Just now" : `${diffInSeconds} seconds ago`;
      }
  
      // Less than 1 hour
      if (diffInMinutes < 60) {
        return diffInMinutes === 1
          ? "1 minute ago"
          : `${diffInMinutes} minutes ago`;
      }
  
      // Less than 1 day
      if (diffInHours < 24) {
        return diffInHours === 1 ? "1 hour ago" : `${diffInHours} hours ago`;
      }
  
      // Less than 1 week
      if (diffInDays < 7) {
        return diffInDays === 1 ? "1 day ago" : `${diffInDays} days ago`;
      }
  
      // Less than 1 month
      if (diffInDays < 30) {
        return diffInWeeks === 1 ? "1 week ago" : `${diffInWeeks} weeks ago`;
      }
  
      // Less than 1 year
      if (diffInDays < 365) {
        return diffInMonths === 1 ? "1 month ago" : `${diffInMonths} months ago`;
      }
  
      // 1 year or more
      return diffInYears === 1 ? "1 year ago" : `${diffInYears} years ago`;
    } catch (error) {
      console.error("Error formatting relative time:", error);
      return "Unknown time";
    }
  }
  
  /**
   * Formats timestamp to a more readable format (e.g., "Dec 23, 2025 at 2:30 PM")
   * @param timestamp - ISO timestamp string
   * @returns Formatted date string
   */
  export function formatAbsoluteTime(timestamp: string | Date): string {
    try {
      const date = new Date(timestamp);
  
      if (isNaN(date.getTime())) {
        return "Invalid date";
      }
  
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch (error) {
      console.error("Error formatting absolute time:", error);
      return "Unknown date";
    }
  }
  
  /**
   * Returns both relative and absolute time for tooltips
   * @param timestamp - ISO timestamp string
   * @returns Object with relative and absolute time
   */
  export function formatTimeWithTooltip(timestamp: string | Date) {
    return {
      relative: formatRelativeTime(timestamp),
      absolute: formatAbsoluteTime(timestamp),
    };
  }