const ParseCSV = (csv) => {
    const nutrient = [];
    let j;
    let i;
    let currentline;
    const lines = csv.split('\n');
    const headers = lines[0].split(',');
    for (i = 0; i < lines.length; i += 1) {
        const obj = {};
        currentline = lines[i].split(',');

        for (j = 0; j < headers.length; j += 1) {
            obj[headers[j]] = currentline[j];
        }
        nutrient.push(obj);
    }
    return nutrient;
};

export default ParseCSV;
