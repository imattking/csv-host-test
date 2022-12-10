const answer = document.querySelector('#result');
const promiseButton = document.querySelector('#promise-button');
const asyncButton = document.querySelector('#async-button')

promiseButton.addEventListener('click', getFetch);
asyncButton.addEventListener('click', getFetch2);

/******************** Write with Promise ********************/
function getFetch() {
    console.log('function loaded');

    const fileURL = 'https://uploads-ssl.webflow.com/6155e0c2fe4ef5f637f9f979/639108fd2383c4ed63830b1f_can-tho-top-10-litter-items.csv';

    fetch(fileURL)
        .then(res => res.text())
        .then(data => {
            console.log(data);
            answer.textContent = data;
        })
        .catch(err => console.log(err))
};

/******************** Write as Async function ********************/
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