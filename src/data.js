const fs = require('fs');
const readline = require("readline");
const utils = require('./utils');

const readTextFile = (file) => {
    console.info('INFO:', 'App started.');
    console.info('INFO:', 'Reading dataset.')
    fs.readFile(file, 'utf8', (err, dataCSV) => {
        if (err) {
            console.error(err);
        } else {
            console.info('INFO:', 'Reading dataset, Done!');
            console.log('LOG:', `CSV file captured with size of ${utils.calculateMemorySize(dataCSV)}`);
            console.info('INFO:', 'Cleaning and converting into JSON.');

            const { success, data, error } = utils.csvToJSON(dataCSV, ["year", "month", "weather_ct"]);

            if (success && data.length > 0) {
                const totalNumberOfData = data.length;

                console.info('INFO:', 'Cleaning and converting into JSON, Done!');
                console.log('LOG:', `Filtered out ${totalNumberOfData} records witch are currently size of ${utils.calculateMemorySize(data)}\n`);

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

                console.log('DATA:', 'Maximum delay', `${maxDelay} minutes`);
                console.log('DATA:', 'Minimum delay', `${minDelay} minutes`);
                console.log('DATA:', 'Average delay', `${(totalDelayDueToWeather / totalNumberOfData).toFixed(2)} minutes`);

                const rl = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout
                });

                rl.question("What is your name ? ", function (name) {
                    rl.question("Where do you live ? ", function (country) {
                        console.log(`${name}, is a citizen of ${country}`);
                        rl.close();
                    });
                });

                rl.on("close", function () {
                    console.log("\nBYE BYE !!!");
                    process.exit(0);
                });
            } else {
                console.error('JSON conversion error!', error);
            }
        }
    });
};

readTextFile('./data/2004-jan-2020-nov.csv');
