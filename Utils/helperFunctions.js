
export const getTodayDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
}

export const getTomorrowDate = () => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const day = String(tomorrow.getDate()).padStart(2, '0');
        const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const year = tomorrow.getFullYear();
        return `${day}/${month}/${year}`;
}

export const getDateDescription = (date) => {
    const today = getTodayDate();
    const tomorrow = getTomorrowDate();

    if (date === today) {
        return 'Today';
    } else if (date === tomorrow) {
        return 'Tomorrow';
    } else {
        return date;
    }
}


export const isDateValid = (dateString) => {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(dateString)) {
        return false;
    }
    const [day, month, year] = dateString.split('/');
    const date = new Date(year, month - 1, day);
    if (date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day) {
        return false;
    }
    return true;
}

