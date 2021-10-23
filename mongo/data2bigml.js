var fs = require('fs');
var json2csv = require('json2csv').parse;
const path = require("path");
var newLine = '\r\n';


var fields = ['serial_number', 'reciever name', 'price', 'size', 'tax_status', 'address' ,'district', 'status', 'items'];

async function add2data(d){

    // Constructor method to assist our ReadFileSync
    const readFileSync = filePath =>
    fs.readFileSync(filePath, { encoding: "utf-8" });

    // A helper to search for values ​​in files =D
    const findWord = async (text, filePath) => {
    const result = await readFileSync(path.join(__dirname, filePath));
    return Promise.resolve(RegExp("\\b" + text + "\\b").test(result));
    };

    const write = async (fileName, fields, data) => {
    // output file in the same folder
    const filename = path.join(__dirname, "CSV", `${fileName}`);
    let rows;

    // I check if there is a header with these items
    const hasValue = await findWord("Name,Position,Salary", "./CSV/test.csv");
    //  If there is a header I add the other lines without it if I don't follow the natural flow
    if (hasValue) {
    rows = json2csv(data, { header: false });
    } else if (!fs.existsSync(fields)) {
    // If file doesn't exist, we will create new file and add rows with headers.
    rows = json2csv(data, { header: true });
    } else {
    // Rows without headers.
    rows = json2csv(data, { header: false });
    }

    // I deal with the information by removing the quotes
    const newRows = rows.replace(/[\\"]/g, "");
    // Append file function can create new file too.
    await fs.appendFileSync(filename, newRows);
    // Always add new line if file already exists.
    await fs.appendFileSync(filename, "\r\n");
    };

    fields = ['serial_number', 'reciever name', 'price', 'size', 'tax_status', 'address' ,'district', 'status', 'items'];

    write("test.csv", fields, d);
    };

module.exports = {add2data}