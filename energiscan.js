const decimalsEn = 18;
const pageSizeEn = 1000;
const pageNumberEn = 0;
const baseUrlEn = `https://explorer.energi.network/api?module=token&action=getTokenHolders&`;

async function downloadHolders() {
    const tokenAddress = document.querySelector("#tokenAddressInputEne").value;
    const url = `${baseUrlEn}contractaddress=${tokenAddress}&page=0&offset=${pageSizeEn}`;
  
    const response = await fetch(url);
    const data = await response.json();
    if (data.status === '1') {
      const holders = data.result.map((holder) => ({
        address: holder.address,
        balance: (holder.value / 10 ** decimalsEn).toFixed(2),
      }));
  
      const csvData = holders
        .map((holder) => `${holder.address},${holder.balance}\n`)
        .join("");
      const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvData);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "Energi.csv");
      link.click();
    } else {
      console.error('Error:', data.message);
    }
  }
  
  document.querySelector("#downloadButtonEne").addEventListener("click", downloadHolders);
  
  

