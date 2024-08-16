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