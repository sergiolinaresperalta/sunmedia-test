function random(resolve, reject) {
    setTimeout(function () {
        if (Math.round(Math.random()) === 1) {
            resolve('Success!');
        } else {
            reject('Fail!');
        }
    }, 1000);
}

function resolveMessage(response) {  
    console.log("Yes! " + response);
}

function rejectMessage(response) {  
    console.log("No! " + response);
}