import requests
import json
import csv

# Set the token address
token_address = "E5rk3nmgLUuKUiS94gg4bpWwWwyjCMtddsAXkTFLtHEy"

# Open a CSV file for writing
with open("holders.csv", "w", newline="") as csvfile:
    fieldnames = ["address", "owner", "amount"]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()

    # Initialize the offset
    offset = 0
    limit = 100
    holders = []

    # Retrieve all holders
    while True:
        # Send a GET request to the API
        url = f"https://public-api.solscan.io/token/holders?tokenAddress={token_address}&limit={limit}&offset={offset}"
        response = requests.get(url)
        data = json.loads(response.text)
        for holder in data['data']:
            if 'address' in holder and 'owner' in holder and 'amount' in holder:
                exact_amount = round(holder["amount"] / 10**holder["decimals"], 2)
                formatted_amount = '{:,.2f}'.format(exact_amount)
                holders.append({'address':holder["address"],'owner':holder["owner"], 'amount':formatted_amount})
        # Exit the loop if there are no more holders
        if len(data['data']) < limit:
            break

        # Increment the offset
        offset += limit
    # Write the holders to the CSV file
    for holder in holders:
        writer.writerow(holder)
