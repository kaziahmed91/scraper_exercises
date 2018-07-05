let getData = () => {
    nightmare
    .on('console', (log, msg) => {
        console.log(msg)
    })
    // .inject('js', path.join('js', `node_modules/jquery/dist/jquery.slim.min.js`)) // 
    // .inject('js', 'jquery.min.js') // 
    .goto('https://www.google.com').wait(2000)
    .evaluate( () =>{        
        // 1.  Return ID of search input field from google.com page using javascript
        let input = document.querySelectorAll("input[type=text]")[0].id
        // 2.  Return value of "title" attribute of search input from google.com using javascript
        let title = document.querySelectorAll("input[type=text]")[0].title
        // 3.  Return value of "title" attribute of search input from google.com using jquery
        let $title =  $("input[type=text]").id() 
        
        return {
            input, title, $title
        }

    }).end()
    .then(console.log)
    .catch(error => {
        console.error('Search failed:', error)
    })
}

getData();
