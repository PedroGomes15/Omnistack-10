module.exports = function parseStringAtArray(stringAsArray) {
    return stringAsArray.split(',').map(tech => tech.trim())
}