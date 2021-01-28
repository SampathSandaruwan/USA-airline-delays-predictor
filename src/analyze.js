const fs = require('fs');
const utils = require('./utils');
const output = require('./cli/output');
const input = require('./cli/input');

const readTextFile = (file) => {
    output.initialize();
    fs.readFile(file, 'utf8', (err, dataCSV) => {
        if (err) {
            output.error('Read the CSV file error', err);
        } else {
            output.csvCompleted(utils.calculateMemorySize(dataCSV));

            const { success, data, error } = utils.csvToJSON(dataCSV, ["year", "month", "weather_ct"]);

            if (success && data.length > 0) {
                const totalNumberOfData = data.length;

                output.cleaningCompleted(totalNumberOfData, utils.calculateMemorySize(data));

                // const months = Array.from(new Set(data.map(d => Number(d.year) * 12 + (Number(d.month) - 1))))
                // console.log(months.length);

                const totalDelayDueToWeather = data.reduce((acc, cur) => acc + Number(cur.weather_ct), 0);
                const maxDelay = data.reduce((acc, cur) => {
                    if (acc < cur.weather_ct) {
                        return Number(cur.weather_ct);
                    } else {
                        return acc;
                    }
                }, data[0].weather_ct);
                const minDelay = data.reduce((acc, cur) => {
                    if (acc > cur.weather_ct) {
                        return Number(cur.weather_ct);
                    } else {
                        return acc;
                    }
                }, data[0].weather_ct);

                output.displayRangeDetails(maxDelay, minDelay, (totalDelayDueToWeather / totalNumberOfData).toFixed(2));

                input.selectMonth(selectedMonth => {
                    console.log('input comes from here', selectedMonth);
                });

            } else {
                output.error('JSON conversion error!', error);
            }
        }
    });
};

readTextFile('./data/2004-jan-2020-nov.csv');