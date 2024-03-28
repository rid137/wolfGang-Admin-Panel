import React, { useEffect, useState } from "react";

type TimeAgoProps = {
  timestamp: string;
};


export const clipSentence = (str: string, wordAmout: number, fromFront?: boolean): string => {
    if(str.length > wordAmout) {
        fromFront ? str =  '**** **** ****' + str.slice(-wordAmout) : str = str.substring(0, wordAmout) + '...'
    };
    return str;
};

export const getCurrentDate = (): string => {
    const timestamp = Date.now();
    const date = new Date(timestamp);

    const year = date.getFullYear();
    // const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const monthAbbreviation = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
    const day = ('0' + date.getDate()).slice(-2);

    const currentDate = `${day} ${monthAbbreviation} ${year}`;
    return currentDate;
}

export const getCurrentTime = (): string => {
    const timestamp = Date.now();
    const date = new Date(timestamp);

    const hours = date.getHours();
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const meridiem = hours >= 12 ? 'PM' : 'AM';

    let formattedHours: number | string = hours % 12 || 12;
    formattedHours = ('0' + formattedHours).slice(-2);

    const formattedTime = `${formattedHours}:${minutes} ${meridiem}`;
    return formattedTime;
}

export const getGreeting = (): string => {
    const timestamp = Date.now();
    const date = new Date(timestamp);

    const hours = date.getHours();
    let greeting: string;

    if (hours < 12) {
        greeting = 'Good Morning';
    } else if (hours < 18) {
        greeting = 'Good Afternoon';
    } else {
        greeting = 'Good Evening';
    }

    return greeting;
}



export const TimeAgo: React.FC<TimeAgoProps> = ({ timestamp }) => {
  const [timeAgo, setTimeAgo] = useState<string>("");

  useEffect(() => {
    const calculateTimeAgo = (timestamp: string): string => {
      const currentDate = new Date();
      const date = new Date(timestamp);

      const timeDifference = currentDate.getTime() - date.getTime();
      const seconds = Math.floor(timeDifference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (days > 0) {
        return `${days} ${days === 1 ? "day" : "days"} ago`;
      } else if (hours > 0) {
        return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
      } else if (minutes > 0) {
        return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
      } else {
        return `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
      }
    };

    setTimeAgo(calculateTimeAgo(timestamp));
  }, [timestamp]);

  return <span>{timeAgo}</span>;
};


export const checkExtension = (str: string): string => {
  return str.slice(str.lastIndexOf("."))
}

export const generateRandomNumber = (): number =>  {
  return Math.floor(Math.random() * 100000);
}


// export const getDateTime = (apiDate: string | Date): string => {
//   // const apiDate = '2023-10-27T13:26';
//   const date = new Date(apiDate);

//   const formattedDate = format(date, 'EEE MMM dd yyyy HH:mm:ss');

//   return formattedDate; 
// }

export const capitalize = (str: string): string => {
  return str[0].toUpperCase() + str.slice(1).toLowerCase()
}
