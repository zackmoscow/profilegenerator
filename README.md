# profilegenerator

## index.js
- set up modules (using inquirer, axios, fs, html-pdf)
- build questions array via inquirer
- init...
1. await inquirer prompt and set username and colorTheme
2. axios call for github using username... pulling all needed response.data fields
3. second axios call to pull user's starred data
4. send all needed parameters to generateHTML.js
5. generateHTML returns HTML data and it is written to index.html
- writeToFile takes the index.html data and converts to PDF

## generateHTML.js
- parsed through provided CSS to sketch out what the site should look like
- created HTML body framework
- used template literals to populate necessary fields
- set generateHTML into module.exports