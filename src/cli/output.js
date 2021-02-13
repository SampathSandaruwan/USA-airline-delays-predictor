const initialize = () => {
    console.info('INFO:', 'App started.');
    console.info('INFO:', 'Reading dataset.');
};

const csvCompleted = fileSize => {
    console.info('INFO:', 'Reading dataset, Done!');
    console.log('LOG:', `CSV file captured with size of ${fileSize}`);
    console.info('INFO:', 'Cleaning and converting into JSON.');
};

const cleaningCompleted = (totalNumberOfData, totalDataSize) => {
    console.info('INFO:', 'Cleaning and converting into JSON, Done!');
    console.log('LOG:', `Filtered out ${totalNumberOfData} records witch are currently size of ${totalDataSize}\n`);
};

const displayRangeDetails = (maxDelay, minDelay, averageDelay) => {
    console.log('DATA:', 'Maximum delay', `${maxDelay} minutes`);
    console.log('DATA:', 'Minimum delay', `${minDelay} minutes`);
    console.log('DATA:', 'Average delay', `${averageDelay} minutes`);
};

const displayFinalResult = result => {
    console.log('RESULT:', 'Total records:', result.length);
    console.log('RESULT:', 'Average possible delay:', `${result.average} minutes`);
    console.log('RESULT:', 'Delay Probabilities:', result.distribution);
};

const error = (message, ...err) => {
    console.error(message, err);
};

module.exports = {
    initialize,
    csvCompleted,
    cleaningCompleted,
    displayRangeDetails,
    displayFinalResult,
    error
};
