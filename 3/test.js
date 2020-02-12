if (typeof Promise == "function"){
    let promise = new Promise((resolve, reject) => {
        random(resolve, reject);
    });
    
    promise
        .then(resolveMessage)
        .catch(rejectMessage);
}
else{
    random(resolveMessage, rejectMessage);
}