const processName = (n) => {
    const splitName = n.split("-");
    return `${splitName[0]}${splitName[1][0].toUpperCase()}${splitName[1].slice(1)}`
}

export { processName };