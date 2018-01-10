onmessage = function(msg) {
    console.log(msg.data);
    postMessage(workerObj);
};

var workerObj = {
    words: Array(200).join("1").split(""),
}