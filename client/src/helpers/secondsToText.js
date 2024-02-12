export const secondsToText = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const timeParts = [];
    if (hours > 0) {
        timeParts.push(`${hours} ч.`);
    }
    if (remainingMinutes > 0) {
        timeParts.push(`${remainingMinutes} мин.`);
    }

    return timeParts.join(' ');
}