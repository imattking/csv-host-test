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
    
    // set up for different levels table csv/table complexity in CMS
    const tableType = 'simple';
    let csvURL = ""
    if (tableType === 'simple') {
        csvURL = 'https://uploads-ssl.webflow.com/6155e0c2fe4ef5f637f9f979/639108fd2383c4ed63830b1f_can-tho-top-10-litter-items.csv';
    } else if (tableType === 'complex') {
        csvURL = 'https://uploads-ssl.webflow.com/6155e0c2fe4ef5f637f9f979/639789213d789b740e14479d_can-tho-source-to-store.csv';
    }

    
    fetch(csvURL)
        .then(res => res.text())
        .then(data => {
                    //console.log(data);
            // split csv into comma separated rows w/line break as delimiter
            const rowStrings = data.split('\n')//.join();
                    //console.table(rowStrings);
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

            //conditional check for url - REMOVE LATER
            if (tableType === 'simple') {
                // iterate through data and fill 2 column table
                fillSimpleTable(rowsArray);
            } else if (tableType === 'complex') {
                // itreate through data and fill 9 column table
                fillComplexTable(rowsArray);
            }
        })
        .catch(err => console.log(err))
};

/******************* Populate Table w/Data ************************/
function fillSimpleTable(data) {
    for(let e of data) {
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