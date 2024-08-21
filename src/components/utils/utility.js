export function waitForNSeconds(n) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, n * 1000);
    });
}

export function formatISODate(isoDateString) {
    // Parse the ISO string into a Date object
    let date;
    if (/^\d+$/.test(isoDateString)) {
        date = new Date(Number(isoDateString));
    } else {
        date = new Date(isoDateString);

    }

    // Define an array of month names
    const months = ["Jan", "Feb", "Mar", "April", "May", "June", 
                    "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

    // Extract the day and year from the Date object
    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.getMonth(); // getMonth() returns month index (0 = January, 11 = December)

    // Construct the formatted date string
    return `${months[month]}, ${day} ${year}`;
}

export const concatNameForDropDown = (text) => {
    if (text.length > 14) {
        return `${text.substring(0, 13)}...`
    } else {
        return text
    }
}

export function isTimeBefore(time1, time2) {
    // Helper function to convert time string "hh:mm am/pm" to a date object
    function parseTime(t) {
        const [time, modifier] = t.split(' ');
        let [hours, minutes] = time.split(':');
        hours = parseInt(hours, 10);
        minutes = parseInt(minutes, 10);

        // Adjust hours for am/pm
        if (hours === 12) {
            hours = 0; // Treat 12 as 0 for both am and pm
        }
        if (modifier.toLowerCase() === 'pm') {
            hours += 12;
        }

        // Create a date object using a fixed date and variable time
        const date = new Date();
        date.setHours(hours, minutes, 0, 0); // Resetting seconds and milliseconds for accuracy
        return date;
    }

    const dateTime1 = parseTime(time1);
    const dateTime2 = parseTime(time2);

    // Compare and return if time1 is before time2
    return dateTime1 < dateTime2;
}
