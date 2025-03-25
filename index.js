import { DateTime } from "luxon"; 
import dayjs from "dayjs";

// Using dayjs as it is used in client-side
let startOfToday = dayjs(new Date()).startOf("day");
let endOfToday = dayjs(new Date()).endOf("day");
const fromTz = "Asia/Manila";
const toTz = "America/New_York";
 
 
const startDate = startOfToday.toISOString();
console.log("Start: " + startDate);

const endDate = endOfToday.toISOString();
console.log("End: " + endDate);
 

const serverToLocal = (date) => {
    console.log("Converting " + date + " to " + toTz);
    const serverDate = DateTime.fromISO(date, { zone: toTz });

    // convert time to time from fromTz
    const localDate = serverDate.setZone(fromTz);
    return localDate;
}

function convertLocalToServer(isoDate, userTimeZone) {
    try {
        console.log("Converting " + isoDate + " to " + userTimeZone);
      // Convert ISO to User's Local Time
      const userLocalDate = DateTime.fromISO(isoDate).setZone(
        userTimeZone
      );
      // Convert to UTC for Storage
      const serverDate = userLocalDate.setZone(
        toTz 
      );
      // Format for MySQL (yyyy-MM-dd HH:mm:ss)
      const mysqlDateTime = serverDate.toJSDate();
      return mysqlDateTime;
    } catch (error) {
      console.error('Conversion Error:', error.message);
      return null;
    }
  }
 
// console.log("Converted to Server Timezone: " + localeToServer(startDate).toISO());

console.log("-------------------START DATE----------------------");

let storedStartDate = convertLocalToServer(startDate, fromTz);
console.log("Saved to DB: " + storedStartDate);
console.log("Converted to Local Timezone: " + serverToLocal(
    storedStartDate.toISOString()
).toISO());

console.log("-------------------END DATE----------------------");

let storedEndDate = convertLocalToServer(endDate, fromTz);
console.log("Saved to DB: " + storedEndDate);
console.log("Converted to Local Timezone: " + serverToLocal(
    storedEndDate.toISOString()
).toISO());