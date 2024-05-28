// Define the base URL for the currency API
const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies/";

// Select required elements from the HTML
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const baseCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Execute this function when the window is loaded
window.addEventListener("load", () => {
    updateExchangeRate();
});

// Iterate over dropdowns and countryList to populate options
for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    // Add event listener to update flag when dropdown value changes
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

// Function to update flag based on selected currency
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

// Add event listener to button to update exchange rate
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

// Function to update the exchange rate
const updateExchangeRate = async () => {
    let amount = document.querySelector("form input");
    let amtVal = amount.value;
    // If amount is empty or less than 1, set it to 1
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }
    const code = baseCurr.value.toLowerCase();

    const URL = `${BASE_URL}/${baseCurr.value.toLowerCase()}.json`;
    // Fetch data from the API
    let response = await fetch(URL);
    let data = await response.json();
    // Get the exchange rate for the selected currency
    let rate = data[code][`${toCurr.value.toLowerCase()}`];

    // Calculate the final amount
    let finalAmount = (amtVal * rate).toFixed(2);
    // Update the message with the exchange rate
    msg.innerText = `${amtVal} ${baseCurr.value} = ${finalAmount} ${toCurr.value}`;
};
