

const form = document.querySelector('#input-form');
const startNumInput = document.querySelector("#start-number");
const endNumInput = document.querySelector('#end-number');
const minTimeInput = document.querySelector('#min-time');
const maxTimeInput = document.querySelector('#max-time');
const displayBox = document.querySelector('.display-box');
const displayNumber = document.querySelector('#display-number');
const stopButton = document.querySelector('#stop-button');



const beginInterval = (startNum, endNum, minTime, maxTime) => {
    let current = Math.round((endNum - startNum) * Math.random()) + startNum;
    displayNumber.innerText = current;
    displayBox.classList.remove("hidden");
    let loop = true;

    stopButton.addEventListener("click", () => {
        console.log('HIT STOP BUTTON')
        loop = false;
        // hide number display and reveal form
        form.classList.remove("hidden");
        displayBox.classList.add("hidden");
    });

    (function randomizedInterval(){

        let next = Math.round((endNum - startNum) * Math.random()) + startNum;

        // If the next number is the same as the current number, keep assigning a random number until it differs
        while (current === next){
            console.log(`${current} = ${next}. Generating new number...`)
            next = Math.round((endNum - startNum) * Math.random()) + startNum;
        }
        const nextTime = (Math.round((maxTime - minTime) * Math.random()) + minTime) * 1000;
        console.log(`Next number: ${next}. Time until next number ${nextTime}`);

        const timer = setTimeout(() => {
            current = next;
            displayNumber.innerText = current;
            if(!loop){
                clearTimeout(timer);
                console.log("breaking out of loop...");
                return;
            }
            randomizedInterval();
        }, nextTime);


    })();


}

form.addEventListener("submit", e => {
    e.preventDefault();
    form.classList.add("hidden");
    // grab the input values
    console.log(`
    Displaying random numbers from ${startNumInput.value}-${endNumInput.value}
    Time range from ${minTimeInput.value}-${maxTimeInput.value} seconds
    `)
    // start interval
    beginInterval(+startNumInput.value, +endNumInput.value, +minTimeInput.value, +maxTimeInput.value)

});



