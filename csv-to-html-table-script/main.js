const answer = document.querySelector('#result');
const simpleStyleButton = document.querySelector('#simple-button');
const complexStyleButton = document.querySelector('#complex-button')
const table = document.querySelector('#cap-table');

window.addEventListener('load', getFetch);
simpleStyleButton.addEventListener('click', () => table.setAttribute('type', 'simple'));
complexStyleButton.addEventListener('click', () => table.setAttribute('type', 'complex'));


/******************** Write with Promise ********************/
function getFetch() {
    console.log('function loaded');
    
    // set up for different levels table csv/table complexity in CMS relative to table type
    const tableType = 'litter-density';
    let csvURL = '';

    if (tableType === 'stakeholder') {
        csvURL = 'https://uploads-ssl.webflow.com/6231f855efbbfbc60052053d/6397970979fcf80bb213c125_2-stakeholders.csv';
    } else if (tableType === 'litter-density') {
        csvURL = 'https://uploads-ssl.webflow.com/6231f855efbbfbc60052053d/6398d661c11e2c8148b3814f_9-litter-densities.csv';
    } else if (tableType === 'source-to-store') {
        csvURL = 'https://uploads-ssl.webflow.com/6231f855efbbfbc60052053d/639796f1c84ce04109ce2269_1-source-to-store.csv';
    } else {
        //do nothing
    }
    fetch(csvURL)
        .then(res => res.text())
        .then(data => {
            console.log(data);
            //conditional check for url - REMOVE LATER
            if (tableType === 'litter-density' || tableType === 'stakeholder') {
                // iterate through data and fill 2 column table
                fillTwoColumnTable(data);
            } else if (tableType === 'source-to-store') {
                // itreate through data and fill 9 column table
                fillComplexTable(rowsArray);
            }
        })
        .catch(err => console.log(err))
};

/******************* Populate Table w/Data ************************/
function fillTwoColumnTable(data) {
    const rowStrings = data.split('\n')
    console.log(rowStrings);
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
        const tableRef = document.querySelector('#cap-table');
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

function fillComplexTable(data) {
    for(let e of data) {
        //set up table rows and cells
        const tableRef = document.querySelector('#cap-table');
        const newRow = tableRef.insertRow(-1);
        for(let i = 0; i < data.length; i ++) {
            const newCell = newRow.insertCell(i);
            // set value of cells based on element index in array
            const cellText = document.createTextNode(e[i]);
            // append cell values as children to each row
            newCell.appendChild(cellText);
        };
    };
};


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