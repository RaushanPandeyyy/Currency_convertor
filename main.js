console.log("Currency Converter Running");

const resultContainer = document.querySelector(".result-area");
const tableContent = document.querySelector("tbody");

async function getCurrencyData(amount, selectedCurrency) {

    try {

        const apiUrl = `https://api.currencyapi.com/v3/latest?apikey=cur_live_KUN9pRX1QW64Nv0Rvl9e4KxdFAQgpupcRDloqa4v&base_currency=${selectedCurrency}`;

        const response = await fetch(apiUrl);

        const data = await response.json();

        let rows = "";

        resultContainer.style.display = "block";

        const currencyData = data.data;

        for (const currencyKey in currencyData) {

            rows += `
                <tr>
                    <td>${currencyKey}</td>
                    <td>${currencyData[currencyKey].code}</td>
                    <td>${Math.round(currencyData[currencyKey].value * amount)}</td>
                </tr>
            `;
        }

        tableContent.innerHTML = rows;

    } 
    
    catch(error) {

        console.log("Error fetching currency data", error);

    }
}

const convertButton = document.querySelector(".submit-btn");

convertButton.addEventListener("click", function(event){

    event.preventDefault();

    const enteredAmount = Number(document.querySelector("#amount").value);

    const selectedCurrency = document.querySelector("#currencyType").value;

    if(enteredAmount <= 0 || isNaN(enteredAmount)){
        alert("Please enter a valid amount");
        return;
    }

    getCurrencyData(enteredAmount, selectedCurrency);

});