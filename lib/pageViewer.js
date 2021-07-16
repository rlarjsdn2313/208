var fs = require('fs');


// dataType(school, article)
let pageViewer = (page, dataType, constants) => {
    let dataPath = `${constants.data_path}${dataType}/`;
    let datas = fs.readdirSync(dataPath);
    let dataAmount = datas.length;
    
    if (page % 1 != 0 || page < 1) {
        return {result: [], error: true};
    }


    let start = 10 * (page - 1) + 1;
    let end = start + 9;

    let result = [];

    while (start <= dataAmount && start <= end) {
        result.push(JSON.parse(fs.readFileSync(`${dataPath}${start}.json`)));
        start++;
    }

    return {result: result, error: false};
}

module.exports.pageViewer = pageViewer;