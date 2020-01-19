export default (ts) => { // ts is a unix time stamp (in seconds)
    const dtms = new Date() - new Date(ts * 1000);
    const dts = Math.floor(dtms / 1000);

    if (dts <= 59) {
        return Math.floor(dts)  + 's';
    } else if (dts <= 60 * 60) {
        return Math.floor(dts / 60) + 'm ' + Math.floor(dts % 60) + 's';
    } else {
        return Math.floor(dts / 3600) + 'h ' + Math.floor((dts / 60) % 60) + 'm ' + Math.floor(dts % 60) + 's';
    }
}