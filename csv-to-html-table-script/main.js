const answer = document.querySelector('#result');

window.addEventListener('load', getFetch('source-to-store'));
window.addEventListener('load', getFetch('stakeholder'));



/******************** Write with Promise ********************/
function getFetch(type) {
    console.log('function loaded');
    
    // set up for different levels table csv/table complexity in CMS relative to table type
    const tableType = type;
    let csvURL = '';

    if (tableType === 'stakeholder') {
        csvURL = 'https://uploads-ssl.webflow.com/6231f855efbbfbc60052053d/6397970979fcf80bb213c125_2-stakeholders.csv';
    } else if (tableType === 'litter-density') {
        csvURL = 'https://uploads-ssl.webflow.com/6231f855efbbfbc60052053d/63990ae6169b53f3286c16e9_9-litter-densities.csv';
    } else if (tableType === 'source-to-store') {
        csvURL = 'https://uploads-ssl.webflow.com/6231f855efbbfbc60052053d/639917184a2dbf1e0c3f4645_1-source-to-store.csv';
    } else {
        //do nothing
    }
    fetch(csvURL)
        .then(res => res.text())
        .then(data => {
            //console.log(data);
            //conditional check for url - REMOVE LATER
            if (tableType === 'litter-density' || tableType === 'stakeholder') {
                // iterate through data and fill 2 column table
                fillTwoColumnTable(data);
            } else if (tableType === 'source-to-store') {
                // itreate through data and fill 9 column table
                fillMultipleColumnTable(data);
            }
        })
        .catch(err => console.log(err))
};

/******************* Populate Table w/Data ************************/
function fillTwoColumnTable(data) {
    const rowStrings = data.split('\n')
    // iterate through strings and replace last comma with hypen
    // split each row into an array of individual data points with hypen as delimeter
    const rowsArray = rowStrings.map(e => {
        console.log(e.lastIndexOf(','));
        const pos = e.lastIndexOf(',');
        // replace last comma with hypen
        const csvString = e.slice(0, pos);
        const numString = e.slice(pos+1);
        const newString = csvString + '-' + numString;
        // split string into array using hyphen is delimiter
        return newString.split('-')
    })
    console.table(rowsArray);
    // loop through
    for(let e of rowsArray) {
        //set up table rows and cells
        const tableRef = document.querySelector('#simple.cap-table');
        const newRow = tableRef.insertRow(-1);
        const newMaterialCell = newRow.insertCell(0);
        const newValueCell = newRow.insertCell(1);

        // set value of cells based on element index in array
        const newMaterialText = document.createTextNode(e[0].replaceAll('\"','')); // pull double quotes out of any strings
        const newValueText = document.createTextNode(e[1]);

        // append cell values as children to each row
        newMaterialCell.appendChild(newMaterialText);
        newValueCell.appendChild(newValueText);
        };
}

function fillMultipleColumnTable(data) {
    // split into rows array using line return as delimiter
    const rowStrings = data.split('\n')//.join('');
    console.table(rowStrings);
    const rowsArray = rowStrings.map(e => e.split(','))
    //clean out first set of empty cells in first row
    rowsArray[0].splice(2,3);
    //clean out second set of empty cells in second row
    rowsArray[0].splice(3,3);
    console.table(rowsArray[0]);
    const tableRef = document.querySelector('#complex.cap-table');
    // iterate through row arrays to populate table
    for(let e of rowsArray) {
    //for (let i = 0; i < rowsArray.length; i++) {
    const newRow = tableRef.insertRow(-1);
        for(let i = 0; i < e.length; i++) {
            const newCell = newRow.insertCell(-1);
            // set value of cells based on element index in array
            const cellText = document.createTextNode(e[i]);
            // append cell values as children to each row
            newCell.appendChild(cellText);
        }
    }
    /******* Replace data & build colspan for top header row *******/
    const tableAdjust = document.querySelector('#complex.cap-table')
    const rowOne = tableAdjust.rows[0];
    rowOne.innerHTML = `<tr><td></td><td colspan="4">Distance Store to Parent Company (km)</td><td colspan="4">Distance Store to Manufacturer (km)</td><tr>`;
    console.log(rowOne);
}


/************* Alternate option to Write Fetch as an Async function *************/
async function getFetch2() {
    try{
        const fileURL = 'https://uploads-ssl.webflow.com/6155e0c2fe4ef5f637f9f979/63910ab630e2fcd5375b5760_can-tho-hml-chart.csv';

        const res = await fetch(fileURL, { method: 'get', headers: {'content-type': 'text/csv'}})
        if (res.status === 200) {
            const data = await res.text();
            console.log(data);
            answer.textContent = data;
        } else {
            console.error(`Error Code: ${res.status}`)
        }
    }
    catch (err) {
        console.error(err);
    }
}