

const ConvertTime = (props) => {
  let time = props.time;
  let templates = {
    prefix: "",
    suffix: " ago",
    seconds: "less than a minute",
    minute: " a minute",
    minutes: "%d minutes",
    hour: " an hour",
    hours: " %d hours",
    day: "a day",
    days: "%d days",
    month: " a month",
    months: "%d months",
    year: " a year",
    years: "%d years"
};

let template = function(t, n) {
    return templates[t] && templates[t].replace(/%d/i, Math.abs(Math.round(n)));
};

time = time.replace(/\.\d+/, ""); // remove milliseconds
time = time.replace(/-/, "/").replace(/-/, "/");
time = time.replace(/T/, " ").replace(/Z/, " UTC");
time = time.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2"); // -04:00 -> -0400
time = new Date(time * 1000 || time);

let now = new Date();
let seconds = ((now.getTime() - time) * .001) >> 0;
let minutes = seconds / 60;
let hours = minutes / 60;
let days = hours / 24;
let years = days / 365;

return templates.prefix + (
    seconds < 45 && template('seconds', seconds) ||
    seconds < 90 && template('minute', 1) ||
    minutes < 45 && template('minutes', minutes) ||
    minutes < 90 && template('hour', 1) ||
    hours < 24 && template('hours', hours) ||
    hours < 42 && template('day', 1) ||
    days < 30 && template('days', days) ||
    days < 45 && template('month', 1) ||
    days < 365 && template('months', days / 30) ||
    years < 1.5 && template('year', 1) ||
    template('years', years)
) + templates.suffix;


}

export default ConvertTime;
