const Nightmare = require('nightmare'); 
const $ = jQuery = require('jquery')
const nightmare = Nightmare({ show: false }); 


const getInputId = async () => {
    try {
        return nightmare.on('console', (log, msg) => {
            console.log(msg)
        }).goto('https://www.google.com')
        .wait('input')
        .evaluate( () =>{    
            return document.querySelectorAll("input[type=text]")[0].id
        })
    } catch(err) {
        console.log(err)
    }
}

const retrieveValueAppendAndSearch = async  (id) => {
    try {
        return nightmare
        // a. Type manually "test" into search input at google.com

        .type(`#${id}`, 'test')
        .evaluate( () => {
            //  b. Retrieve and save in a variable value of input search field
            let value = document.querySelectorAll("input[type=text]")[0].value; 
            // c. Append the string " robot" the the variable from step b2
            let newValue = `${value} robot`
            // d. Set input search field value to variable from previous step
            document.querySelectorAll("input[type=text]")[0].value = newValue;
            // 5.  Click on Search Button using javascript
            document.querySelectorAll('input[type=submit]')[0].click()           

        })

    } catch(err) {
        console.log(err)
    } 
}

const searchAndFilterResults = async (value, append) => {
    try {
        return nightmare.evaluate( () => {
            let results = Array.from(document.getElementsByClassName('g'))
            // 6.  a. Filter all search results and store them into an array variable
            let links = results.map( el => {
                return Array.from(el.getElementsByTagName('a')).map( collection => {
                    return collection.href
                })
            }) 
            // b. Display all href attributes from array created at a.
            return links.reduce((a, b) => [...a, ...b], [])
        })  
        .then( value => {
            console.log(value)
           return nightmare.end()
        })
    } catch (err) {
        console.log(err)
    }
} 


getInputId()
    .then( id => retrieveValueAppendAndSearch(id) )
    .then( () => searchAndFilterResults())
    .catch(err => console.log(err))
