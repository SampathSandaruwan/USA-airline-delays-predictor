const csvToJSON = (csv = '', allowedHeaders = []) => {
    const keysOrder = [
        "year",
        "month",
        "carrier",
        "carrier_name",
        "airport",
        "airport_name",
        "arr_flights",
        "arr_del15",
        "carrier_ct",
        "weather_ct",
        "nas_ct",
        "security_ct",
        "late_aircraft_ct",
        "arr_cancelled",
        "arr_diverted",
        "arr_delay",
        "carrier_delay",
        "weather_delay",
        "nas_delay",
        "security_delay",
        "late_aircraft_delay"
    ];
    const lines = csv.split('\n');

    const result = [];
    const headersList = lines.shift().trim();
    if (headersList === `${keysOrder.join(',')},`) {
        const headers = headersList.split(',');

        let skip = 0;

        for (let line of lines) {
            line = line.trim();

            const obj = {};
            const currentLineValues = line.split(',');

            if (headers.length <= currentLineValues.length) {
                const withoutQuotations = (value) => {
                    const lastChatIndex = value.length - 1;
                    if (value.charAt(0) === '"' && value.charAt(lastChatIndex) === '"') {
                        return value.substring(1, lastChatIndex);
                    } else {
                        return value;
                    }
                };

                headers.forEach((header, index) => {
                    if (allowedHeaders.includes(header)) {
                        // Clear double quotations
                        obj[header] = withoutQuotations(currentLineValues[index]);
                    }
                });

                if (headers.length < currentLineValues.length) {
                    const lastIndex = keysOrder.length - 1;
                    const lastKey = keysOrder[lastIndex];
                    obj[lastKey] += `, ${currentLineValues.slice(headers.length).join(', ')}`;

                    // Clear double quotations
                    obj[lastKey] = withoutQuotations(obj[lastKey]);
                }
                result.push(obj);
            } else {
                skip++;
            }
        }

        return {
            success: true,
            data: result
        };
    } else {
        return {
            success: false,
            error: {
                message: 'INVALID_KEYS_ORDER'
            }
        };
    }
};

const calculateMemorySize = (object) => {
    var size = 0;

    const sizeOf = (obj) => {
        if (obj !== null && obj !== undefined) {
            switch (typeof obj) {
                case 'number':
                    size += 8;
                    break;
                case 'string':
                    size += obj.length * 2;
                    break;
                case 'boolean':
                    size += 4;
                    break;
                case 'object':
                    var objClass = Object.prototype.toString.call(obj).slice(8, -1);
                    if (objClass === 'Object' || objClass === 'Array') {
                        for (var key in obj) {
                            if (!obj.hasOwnProperty(key)) continue;
                            sizeOf(obj[key]);
                        }
                    } else size += obj.toString().length * 2;
                    break;
            }
        }
        return size;
    };

    const formatByteSize = (bytes) => {
        if (bytes < 1024) return bytes + " bytes";
        else if (bytes < 1048576) return (bytes / 1024).toFixed(3) + " KiB";
        else if (bytes < 1073741824) return (bytes / 1048576).toFixed(3) + " MiB";
        else return (bytes / 1073741824).toFixed(3) + " GiB";
    };

    return formatByteSize(sizeOf(object));
};

Object.defineProperty(Array.prototype, 'chunk', {
    value: function (chunkSize) {
        const chunks = []
        for (let i = 0; i < this.length; i += chunkSize) {
            chunks.push(this.slice(i, i + chunkSize))
        }

        return chunks
    }
});

module.exports = {
    csvToJSON,
    calculateMemorySize
};
