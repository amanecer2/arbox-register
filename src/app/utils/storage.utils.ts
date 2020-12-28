export function getLocalStorage<T>(name: string): T {
    return JSON.parse(localStorage.getItem(name));
}

export function setLocalStorage(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
}
