export const to12HourFormat = (date: Date) => {
    return date.toLocaleTimeString([], {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });
}