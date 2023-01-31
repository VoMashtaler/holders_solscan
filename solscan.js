function downloadFile() {
    var tokenAddress = document.getElementById("token-address").value;
    var limit = 100;
    var offset = 0;
    var holders = [];
    var csvData = "address,owner,amount\n";
    var totalHolders = 0;
    var fileName = "solscan.csv";
    var link = document.createElement("a");

    function getHolders() {
        var url = `https://public-api.solscan.io/token/holders?tokenAddress=${tokenAddress}&limit=${limit}&offset=${offset}`;

        document.querySelector("#loadingSpinner").style.display = "block";
        document.querySelector("#downloadButtonSol").disabled = true;
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                holders = holders.concat(data.data);
                totalHolders = data.total;
                if (holders.length < totalHolders) {
                    offset += limit;
                    getHolders();
                } else {
                    holders.forEach(function(holder) {
                        csvData += holder.address + "," + holder.owner + "," + (holder.amount / (10 ** holder.decimals)) + "\n";
                    });
                    var blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
                    if (link.download !== undefined) {
                        var url = URL.createObjectURL(blob);
                        link.setAttribute("href", url);
                        link.setAttribute("download", fileName);
                        link.style = "visibility:hidden";
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                          document.querySelector("#loadingSpinner").style.display = "none";
    document.querySelector("#downloadButtonSol").disabled = false;
                    }
                }
            })
            
            .catch(error => console.log(error));
            document.querySelector("#loadingSpinner").style.display = "none";
            document.querySelector("#downloadButtonSol").disabled = false;
    }

    getHolders();
  
}
