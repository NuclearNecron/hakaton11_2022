// change host next time
const host = '192.168.184.184:8000'

export const getStatuses = async () => {
    return await fetch(`http://${host}/status/`)
        .then(async (response) => {
            // console.log(response.json())
            return await response.json();
        })
        .catch((e) => {
            console.log(e)
            return {
                resultCount: 0,
                results: []
            }
        });
}

export const getTaskList = async (id) => {
    return await fetch(`http://${host}/users/${id}/usertasks/`)
        .then(async (response) => {
            return await response.json();
        })
        .catch(() => {
            return {
                resultCount: 0,
                results: []
            }
        });
}

export const getEvents = async (id) => {
    return await fetch(`http://${host}/users/${id}/userevents/`)
        .then(async (response) => {
            return await response.json();
        })
        .catch(() => {
            return {
                resultCount: 0,
                results: []
            }
        });
}

export const getNotes = async (id) => {
    return await fetch(`http://${host}/users/${id}/usernotes/`)
        .then(async (response) => {
            return await response.json();
        })
        .catch(() => {
            return {
                resultCount: 0,
                results: []
            }
        });
}

export const getBookmarks = async (id) => {
    return await fetch(`http://${host}/users/${id}/userbookmarks/`)
        .then(async (response) => {
            return await response.json();
        })
        .catch(() => {
            return {
                resultCount: 0,
                results: []
            }
        });
}