export const checkDateFormat = (date: string): boolean => {
    return /^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/.test(date);
};

export const checkLicensePlateFormat = (plate: string): boolean => {
    return /^[A-Z]{3}-\d{3,4}$/.test(plate);
};

export const validateDate = (date: string): boolean => {
    const [day, month, year] = date.split(/[/-]/).map(Number);
    const dateObj = new Date(year, month - 1, day);

    // console.log(dateObj);

    return (
        dateObj.getFullYear() === year &&
        dateObj.getMonth() === month - 1 &&
        dateObj.getDate() === day
    );
};
