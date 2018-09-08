const FORMATTERS = {
    JOIN: parsedValue => parsedValue.join(''),
    EXTRACT_FIRST_ELEMENT: parsedValue => parsedValue[0],
    NONE: parsedValue => parsedValue
}

module.exports = FORMATTERS