export const formatDate = (date) => {
    const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    return new Date(date).toLocaleDateString('ru-RU', options);
}

export const formatTime = (date) => {
    const options = {
        hour: 'numeric',
        minute: 'numeric'
    };
    return new Date(date).toLocaleTimeString('ru-RU', options);
}