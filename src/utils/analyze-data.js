module.exports = (data, delayKey, selectedMonth) => {
    const obj = {
        data: [],
        length: 0,
        total: 0,
        average: 0,
        max: 0,
        min: 0,
        distribution: []
    };
    for (const _data of data) {
        const { month } = _data;
        const weather_delay = _data[delayKey];

        if (month === selectedMonth) {
            obj.data.push(weather_delay);
        }
    }

    const length = obj.data.length;
    const total = obj.data.reduce((acc, cur) => acc + Number(cur), 0);
    const max = obj.data.reduce((acc, cur) => {
        if (acc < Number(cur)) {
            return Number(cur);
        } else {
            return acc;
        }
    }, Number(obj.data[0]));
    const min = obj.data.reduce((acc, cur) => {
        if (acc > Number(cur)) {
            return Number(cur);
        } else {
            return acc;
        }
    }, Number(obj.data[0]));

    const distribution = {};
    let breakingPoint = max / 2;
    breakingPoint -= ((breakingPoint % 10) - 10);

    for (let i = 0; i < breakingPoint; i += 10) {
        const key = `${i}-${i + 10} minutes`;
        const rangedCount = obj.data.filter(_data => Number(_data) >= i && Number(_data) < (i + 10)).length;
        if (rangedCount > 0) {
            distribution[key] = rangedCount;
        }
    }
    distribution[`more than ${breakingPoint} minutes`] = obj.data.filter(_data => Number(_data) >= 300).length;

    for (const key of Object.keys(distribution)) {
        distribution[key] = `${(distribution[key] * 100 / length).toFixed(5)}%`
    }


    obj.length = length;
    obj.total = total.toFixed(5);
    obj.average = (total / length).toFixed(5);
    obj.max = max;
    obj.min = min;
    obj.distribution = distribution;
    obj.data = [];

    return obj;
}