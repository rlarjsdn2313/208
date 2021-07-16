var fs = require('fs');


// dataType(school, article)
let pageViewer = (page, dataType, constants) => {
    let dataPath = `${constants.data_path}${dataType}/`;
    let datas = fs.readdirSync(dataPath);
    let dataAmount = datas.length;

    let start = dataAmount - (page - 1) * 10;
    let end = start - 9;

    if (page % 1 != 0 || page < 1 || start < 0) {
        return {result: [], error: true};
    }


    let result = [];

    while (start >= 1 && start >= end) {
        result.push(JSON.parse(fs.readFileSync(`${dataPath}${start}.json`)));
        start--;
    }

    return {result: result, error: false};
}

module.exports.pageViewer = pageViewer;