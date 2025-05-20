export function validateUsername(username) {
    return /^[a-zA-Z0-9]{3,20}$/.test(username); 
}

export function validatePassword(password) {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,25}$/.test(password); 
}


export function validatePhoneNumber(phone) {
    return /^\+?[0-9]{10,15}$/.test(phone); 
}

export function validateBirthDate(birthday) {
    const date = new Date(birthday);
    const minDate = new Date('1920-01-01');
    const currentDate = new Date();
    return date >= minDate && date <= currentDate; 
}
