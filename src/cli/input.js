const Select = require("../utils/select")

const selectMonth = (callback) => {
    const monthSelect = new Select({
        question: "Which month do you want to check for?",
        options: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        answers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        pointer: ">",
        color: 'red',
        callback
    });

    monthSelect.start();
}

module.exports = {
    selectMonth
};
