let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


export const getDay = (timestamp) => {
    let date = new Date(timestamp);
    return `${date.getDate()} ${months[date.getMonth()]}`
}

export const getFullDate = (timestamp) =>{
    let date = new Date(timestamp)
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
}