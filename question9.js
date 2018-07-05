/**
 * 9. The following code must be implemented with Nightmare.js.
    a). Navigate to Google page.
    b). Search for 'W3Schools'.
    c). In the first result page navigate on each link and check if the title from the result is the same with the title on website page.
    Hint: You can use evaluate method from Nightmare and return data from the page. You can include bluebird.js -> 
    Promise.each method to iterate serially.
 */

const Nightmare = require('nightmare');
const nightmare = Nightmare({
    show: false
});
const Promise = require('bluebird')

const getLinks =  () => {
    return nightmare.on('console', (log, msg) => {
            console.log(msg)
        }).goto('https://www.google.com')
        .evaluate(() => {
            return document.querySelectorAll("input[type=text]")[0].id
        }).then((id) => {
            return nightmare
                .type(`#${id}`, 'W3Schools')
                .click('input[type=submit]')
                .evaluate(() => {
                    let results = Array.from(document.getElementsByClassName('g'))
                    let currentPageTitle = document.title;
                    let links = results.map(el => {
                        return Array.from(el.getElementsByTagName('a')).map(collection => {
                            return collection.href
                        })
                    })
                    links = links.reduce((a, b) => [...a, ...b], [])
                    console.log(links)
                    return {
                        currentPageTitle,
                        links
                    }
                })
        })
}

const determineLinkTitle = async (links, currentPageTitle) => {
    
    try {

        let returnLinks = []
        let promises = links.map(async link => {
                let title = await  nightmare.goto(link).title().then(title => title)
                console.log(title)
                if (title && title === currentPageTitle)  return link
                // returnLinks.push(link);
            })

        return  Promise.all(promises);
    } catch (err) {
        console.log(err)
    }

}

getLinks().then(result => determineLinkTitle(result.links, result.currentPageTitle))
    .then(result => console.log('getting the results: ',result))
    .catch(err => console.log(err));
