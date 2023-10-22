// example: creating a promise manually
const promiseObject = new Promise((resolve, reject) => {
    // do something
    // if successful:
        // call resolve() -> enter 'fulfilled' state
            // value = whatever we call resolve() with
            // resolve(5) places 5 in the box
    // if unsuccessful:
        // call reject() -> enter 'rejected' state

    // resolve with the value "hello" after 5 seconds
    setTimeout(() => {
        resolve("hello");
    }, 5000);
});

const compoundPromise = promiseObject.then((value) => { //resolves after 5s
    
    const fetchPromise = fetch("https://events.umich.edu/day/json?v=2");
    return fetchPromise;
});

compoundPromise.then((value) => {
    console.log(value);
});



// creating a promise using 'fetch()':
const fetchPromise = fetch("https://blahblah.com");
const jsonPromise = fetchPromise.then((response) => {
    const jsonDataPromise = response.json();
    console.log("response", response);
    return jsonDataPromise;
});
jsonPromise.then((data) => {
    console.log("data", data);
});

console.log("fetchPromise", fetchPromise);