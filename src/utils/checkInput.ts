export const checkDateFormat = (date: string): boolean => {
    return /^\d{2}\/\d{2}\/\d{4}$/.test(date);
};
