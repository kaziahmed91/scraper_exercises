
/**
 * 7. Given the sample HTML:

    <div class='container'>
    <p>Hello</p>
    <p>World</p>
    <p>!!!</p>
    </div>
    Please select the second 'p' element based on tag name. You can use JQuery or native JS. Use the query selector (CSS Selectors).
 */
let secondElement = document.querySelectorAll('p:nth-child(2)')
console.log('secondElement', secondElement);

/**
 *  8. The following code must be implemented with JS6. We have a class named 'Work'. 
 *  In this class we need to declare a function. Create asynchronous function (You can choose the name of the function).
 *  The function will get 1 parameter. (nightmare).
    We assume that there are declared 3 function named (log in,statement,fetch). 
    The first and the second function will accept 1 parameter.
    In the function body:
    a). Functions that accept parameter need to be invoked with nightmare as parameter.
    b). Every function must be called in serial (Every function depend on the previous called function). 
        The asynchronous function have a special keyword that you can use for it.
    c). In this class there is a method named 'success'. It accept one parameter 'message'. 
        Please return this method with a message.

 */

class Work {
    constructor(){}

    login (params)  {
        console.log(params)
        return params
    }

    statement (params) {
        let returnParams =  params + ' statement'
        console.log(returnParams)
        return returnParams
    }

    fetch (){
        console.log('fetching')
        return 'fetcing';
    }

    success(message) {
        return message
    }  

    async  asyncWorkFunction (nightmare) {
        try {
            let login = await this.login(nightmare); 
            let statement = await this.statement(login); 
            await this.fetch()
            return this.success('work is done')
        } catch (err ) {
            console.log(err)
        }
    }
}

const work = new Work()
console.log(work.asyncWorkFunction('bla'))