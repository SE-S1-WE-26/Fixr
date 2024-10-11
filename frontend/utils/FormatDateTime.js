// utils/FormatDateTime.js

const FormatDateTime = (timestamp) => {
    const date = new Date(timestamp);
  
    // Options for formatting the date and time
    const options = {
      year: 'numeric',
      month: 'short', // e.g., 'Jan', 'Feb'
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true // For 12-hour clock (AM/PM)
    };
  
    // Format the date and time according to the options
    return date.toLocaleString('en-US', options);
  };
  
  export default FormatDateTime;
  