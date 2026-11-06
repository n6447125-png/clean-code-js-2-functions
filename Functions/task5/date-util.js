const ONE_DAY = 1;

function getMidnightAfterDays(date, days) {
    const newDate = new Date(date.getTime());
    newDate.setDate(newDate.getDate() + days);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
}

module.exports = {
    getNextDayMidnight: function (date) {
        return getMidnightAfterDays(date, ONE_DAY);
    },

    getPreviousDayMidnight: function (date) {
        return getMidnightAfterDays(date, -ONE_DAY);
    },
};
