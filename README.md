# Description
App provides currency data using https://app.freecurrencyapi.com/

# Installation
npm install

# Running the app
npm run start

# Usage
const response = await getCurrenciesData();
console.log(response);

const response = await exchange(10, 'USD', ['EUR', 'GBP'], '2024-11-10');
console.log(response);

...

# Test
npm run test