export function arrayDeepCopy(arr) {
    let copy = []

    for (let element of arr) {
        copy.push(element)
    }

    return copy
}

export function setValueOnPath(obj, path, value) {
    let element = obj

    for (var i = 0; i < path.length - 1; i++) {
        element = element[path[i]]
    }

    element[path[path.length - 1]] = value
}