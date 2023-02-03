//https://andromeda-explorer.metis.io/api?module=token&action=getTokenHolders&contractaddress=0x66673f0a3b5d99524bA76A558B93A9ca1386f4Cd
const decimalsMetis = 18;
const pageSizeMetis = 1000;
const pageNumberMetis = 0;
const baseUrlMetis = `https://andromeda-explorer.metis.io/api?module=token&action=getTokenHolders&`;

async function downloadHolders() {
    const tokenAddress = document.querySelector("#tokenAddressInputMetis").value;
    const url = `${baseUrlMetis}contractaddress=${tokenAddress}&page=0&offset=${pageSizeMetis}`;
  
    const response = await fetch(url);
    const data = await response.json();
    if (data.status === '1') {
      const holders = data.result.map((holder) => ({
        address: holder.address,
        balance: (holder.value / 10 ** decimalsMetis).toFixed(2),
      }));
  
      const csvData = holders
        .map((holder) => `${holder.address},${holder.balance}\n`)
        .join("");
      const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvData);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "Metis.csv");
      link.click();
    } else {
      console.error('Error:', data.message);
    }
  }
  
  document.querySelector("#downloadButtonMetis").addEventListener("click", downloadHolders);
  
  

