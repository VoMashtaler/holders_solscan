//https://explorer.sx.technology/api?module=token&action=getTokenHolders&contractaddress=0xaa99bE3356a11eE92c3f099BD7a038399633566f
const decimalsSX = 18;
const pageSizeSX = 1000;
const pageNumberSX = 0;
const baseUrlSX = `https://explorer.sx.technology/api?module=token&action=getTokenHolders&`;

async function downloadHolders() {
    const tokenAddress = document.querySelector("#tokenAddressInputSX").value;
    const url = `${baseUrlSX}contractaddress=${tokenAddress}&page=0&offset=${pageSizeSX}`;
  
    const response = await fetch(url);
    const data = await response.json();
    if (data.status === '1') {
      const holders = data.result.map((holder) => ({
        address: holder.address,
        balance: (holder.value / 10 ** decimalsStep).toFixed(2),
      }));
  
      const csvData = holders
        .map((holder) => `${holder.address},${holder.balance}\n`)
        .join("");
      const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvData);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "SX.csv");
      link.click();
    } else {
      console.error('Error:', data.message);
    }
  }
  
  document.querySelector("#downloadButtonSX").addEventListener("click", downloadHolders);
  
  

