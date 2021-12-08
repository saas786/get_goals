export const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h12",
  };
  
  export const dateFormat = (
    date: string | Date,
    locales?: string
  ) => {
    const convertedDate = new Date(date);
  
    return convertedDate.toLocaleDateString(
      locales ?? "en-GB",
      options
    );
  };