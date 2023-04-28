export const currentTime = () => {
    var currentdate = new Date()
    return (
        currentdate.getHours() +
        ':' +
        (currentdate.getMinutes() < 9 ? '0' : '') +
        currentdate.getMinutes()
    )
}
