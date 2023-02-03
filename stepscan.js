//https://stepscan.io/api?module=token&action=getTokenHolders&contractaddress=0xe6801928061CDbE32AC5AD0634427E140EFd05F9
const decimalsStep = 18;
const pageSizeStep = 1000;
const pageNumberStep = 0;
const baseUrlStep = `https://stepscan.io/api?module=token&action=getTokenHolders&`;

async function downloadHolders() {
    const tokenAddress = document.querySelector("#tokenAddressInputStep").value;
    const url = `${baseUrlStep}contractaddress=${tokenAddress}&page=0&offset=${pageSizeStep}`;
  
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
      link.setAttribute("download", "Step.csv");
      link.click();
    } else {
      console.error('Error:', data.message);
    }
  }
  
  document.querySelector("#downloadButtonStep").addEventListener("click", downloadHolders);
  
  

