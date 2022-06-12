import { formatDistanceToNowStrict } from 'date-fns';

export const formatTime = (date: Date): string => {
    const time: string[] = formatDistanceToNowStrict(date).split(' ');
    let dateTime: string = '';
    if (time[1] === "seconds" || time[1] === "second") {
        if (time[0] === "1") {
            dateTime = "секунду назад";
        }
        if (Number(time[0]) <= 4 && time[0] !== "1") {
            dateTime = "секунды назад";
        }
        if (Number(time[0]) > 4) {
            dateTime = "секунд назад";
        }
    }
    if (time[1] === "minutes" || time[1] === "minute") {
        if (time[0] === "1") {
            dateTime = "минуту назад";
        }
        if (Number(time[0]) <= 4 && time[0] !== "1") {
            dateTime = "минуты назад";
        }
        if (Number(time[0]) > 4) {
            dateTime = "минут назад";
        }
    }
    if (time[1] === "hours" || time[1] === "hour") {
        if (time[0] === "1") {
            dateTime = "час назад";
        }
        if (Number(time[0]) <= 4 && time[0] !== "1") {
            dateTime = "часа назад";
        }
        if (Number(time[0]) > 4) {
            dateTime = "часов назад";
        }
    }
    if (time[1] === "days" || time[1] === "day") {
        if (time[0] === "1") {
            dateTime = "день назад";
        }
        if (Number(time[0]) <= 4 && time[0] !== "1") {
            dateTime = "дня назад";
        }
        if (Number(time[0]) > 4) {
            dateTime = "дней назад";
        }
    }
    if (time[1] === "months" || time[1] === "month") {
        if (time[0] === "1") {
            dateTime = "месяц назад";
        }
        if (Number(time[0]) <= 4) {
            dateTime = "месяця назад";
        }
        if (Number(time[0]) > 4) {
            dateTime = "месяцев назад";
        }
    }
    if (time[1] === "years" || time[1] === "year") {
        if (time[0] === "1") {
            dateTime = "год назад";
        }
        if (Number(time[0]) <= 4 && time[0] !== "1") {
            dateTime = "года назад";
        }
        if (Number(time[0]) > 4) {
            dateTime = "лет назад";
        }
    }
    return time[0] + " " + dateTime
}