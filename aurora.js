//https://explorer.fuse.io/api?module=token&action=getTokenHolders&contractaddress=0x5dd8015cec49f4db01fd228f688bf30337d3e0a9&offset=300
const decimalsCronos = 18;
const pageSizeCronos = 10000;
const pageNumberCronos = 0;
const baseUrlCronos = `https://cronos.org/explorer/api?module=token&action=getTokenHolders&`;

async function downloadHolders() {
    const tokenAddress = document.querySelector("#tokenAddressInputCronos").value;
    const url = `${baseUrlCronos}contractaddress=${tokenAddress}&page=0&offset=${pageSizeCronos}`;
  
    const response = await fetch(url);
    const data = await response.json();
    if (data.status === '1') {
      const holders = data.result.map((holder) => ({
        address: holder.address,
        balance: (holder.value / 10 ** decimalsCronos).toFixed(2),
      }));
  
      const csvData = holders
        .map((holder) => `${holder.address},${holder.balance}\n`)
        .join("");
      const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvData);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "_Cronos.csv");
      link.click();
    } else {
      console.error('Error:', data.message);
    }
  }
  
  document.querySelector("#downloadButtonCronos").addEventListener("click", downloadHolders);
  
  

