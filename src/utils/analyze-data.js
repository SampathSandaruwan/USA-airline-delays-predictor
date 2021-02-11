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

    distribution[`0-15 minutes`] = obj.data.filter(_data => Number(_data) >= 0 && Number(_data) < 15).length;
    distribution[`15-30 minutes`] = obj.data.filter(_data => Number(_data) >= 15 && Number(_data) < 30).length;
    distribution[`30-60 minutes`] = obj.data.filter(_data => Number(_data) >= 30 && Number(_data) < 60).length;
    distribution[`1-5 hours`] = obj.data.filter(_data => Number(_data) >= 60 && Number(_data) < 300).length;
    distribution[`5-10 hours`] = obj.data.filter(_data => Number(_data) >= 300 && Number(_data) < 600).length;
    distribution['10-20 hours'] = obj.data.filter(_data => Number(_data) >= 600 && Number(_data) < 1200).length;
    distribution['more than 20 hours'] = obj.data.filter(_data => Number(_data) >= 1200).length;

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