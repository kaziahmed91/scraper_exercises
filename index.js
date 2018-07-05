const Nightmare = require('nightmare'); 
const $ = jQuery = require('jquery')
const nightmare = Nightmare({ show: false }); 
const fs = require('fs');

nightmare.on('console', (log, msg) => {
    console.log(msg)
}).goto('https://datatables.net/').wait('table').evaluate( () => {
    console.log($)
    let headers = $('thead tr').children().map( (index, value) => {
        return value.innerText;
    }).toArray();
    headers = headers.reduce( (accu, curr,i) => { accu[i] = curr; return accu},{})
    
    let values = $('tbody tr').get().slice(1).map( (row) => {
        let rowData = {};
        $(row).find('td').each( (index,field) => {
            rowData[index] = $(field).html();
        })
        return rowData;
    });
    
    return  [headers, ...values];

})
.end()
.then( (data) => {
    
    data.forEach(obj => {
        let row = Object.values(obj)+ '\n\r'.split(',').join('","')
        fs.appendFileSync('data.csv', row, 'utf8', (err) => {
            console.log(err)
        })
    });

})
.then(console.log).catch(error => {
    console.error('Search failed:', error)
})