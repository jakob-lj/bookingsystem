
export const getToken = () => {
    return localStorage.getItem('accessToken')
}

export const getId = () => {
    return parseInt(localStorage.getItem('user_id'))
}