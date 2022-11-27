module.exports = (timestamp) => {
    var month;
    var day;
    var suffix;
    var year;
    var hour;
    var minute;
    var ampm;

    var current = timestamp.toString()
    let dayandtime = current.split(' ');

    month = dayandtime[1];
    day = dayandtime[2];
    year = dayandtime[3];

    let dayArray = day.split("");

    let lastDigit = dayArray[dayArray.length]

    if (lastDigit === "1" && day !== "11") {
        suffix = `st`;
    } else if (lastDigit === "2" && day !== "12") {
        suffix = `nd`;
    } else if (lastDigit === "3" && day !== "13") {
        suffix = `rd`;
    } else {
        suffix = `th`;
    }

    let fullhour = dayandtime[4]

    let fullhourarray = fullhour.split(":");

    if (fullhourarray[0] > 12) {
        ampm = "PM";
        hour = fullhourarray[0] - 12;
    } else {
        ampm = "AM";
        hour = fullhourarray[0]
    }

    minute = fullhourarray[1]

    return `${month} ${day}${suffix}, ${year} at ${hour}:${minute} ${ampm}`
}