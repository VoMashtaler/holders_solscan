//https://explorer.fuse.io/api?module=token&action=getTokenHolders&contractaddress=0x5dd8015cec49f4db01fd228f688bf30337d3e0a9&offset=300
const decimalsAurora = 18;
const pageSizeAurora = 10000;
const pageNumberAurora = 0;
const baseUrlAurora = `https://explorer.mainnet.aurora.dev/api?module=token&action=getTokenHolders&`;

async function downloadHolders() {
    const tokenAddress = document.querySelector("#tokenAddressInputAurora").value;
    const url = `${baseUrlAurora}contractaddress=${tokenAddress}&page=0&offset=${pageSizeAurora}`;
  
    const response = await fetch(url);
    const data = await response.json();
    if (data.status === '1') {
      const holders = data.result.map((holder) => ({
        address: holder.address,
        balance: (holder.value / 10 ** decimalsAurora).toFixed(2),
      }));
  
      const csvData = holders
        .map((holder) => `${holder.address},${holder.balance}\n`)
        .join("");
      const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvData);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "_Aurora.csv");
      link.click();
    } else {
      console.error('Error:', data.message);
    }
  }
  
  document.querySelector("#downloadButtonAurora").addEventListener("click", downloadHolders);
  
  

