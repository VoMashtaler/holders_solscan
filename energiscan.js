const apiKey = "ckey_95e70fc1dfa8425a903559936d0";
const decimals = 18;
const pageSize = 1000;
const pageNumber = 0;
const baseUrl = `https://api.covalenthq.com/v1/1666600000/tokens/`;

async function downloadHolders() {
  const tokenAddress = document.querySelector("#tokenAddressInput").value;
  const url = `${baseUrl}${tokenAddress}/token_holders/?quote-currency=USD&format=JSON&block-height=latest&page-size=${pageSize}&page-number=${pageNumber}&key=${apiKey}`;

  document.querySelector("#loadingSpinner").style.display = "block";
  document.querySelector("#downloadButton").disabled = true;

  const response = await fetch(url);
  const data = await response.json();
  const holders = data.data.items.map((holder) => ({
    address: holder.address,
    balance: (holder.balance / 10 ** decimals).toFixed(2),
  }));

  const csvData = holders
    .map((holder) => `${holder.address},${holder.balance}\n`)
    .join("");
  const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvData);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "Energi.csv");
  link.click();

  document.querySelector("#loadingSpinner").style.display = "none";
  document.querySelector("#downloadButton").disabled = false;
}

document.querySelector("#downloadButton").addEventListener("click", downloadHolders);
