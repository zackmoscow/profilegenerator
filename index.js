const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
const html = require("./generateHTML");
const util = require("util");
const pdf = require('html-pdf');
const writeFileAsync = util.promisify(fs.writeFile);


const questions = [
    {
        type: "input",
        name: "username",
        message: "What is your Github username?"
    },
    {
        name: "color",
        type: "list",
        message: "Choose a color:",
        choices: ["red", "blue", "green", "pink"]
    }
];

function writeToFile(htmlFile){
    const options = { format: 'Letter'};
    pdf.create(htmlFile, options).toFile('index.pdf', function(err){
    console.log("Success! index.pdf file written")
    });
  }

async function init() {
    const answers = await inquirer.prompt([questions[0], questions[1]]);
    let username = answers.username;
    let colorTheme = answers.color;
    try {
        const response = await axios(`https://api.github.com/users/${username}`);
        let userInfo = {
            image: response.data.avatar_url,
            name: response.data.name,
            location: response.data.location,
            profile: response.data.html_url,
            blog: response.data.blog,
            bio: response.data.bio,
            publicrepos: response.data.public_repos,
            followers: response.data.followers,
            following: response.data.following,
        }
        let userStars = await axios(`https://api.github.com/users/${username}/starred`);
        let stars = userStars.data.length;
        
        const createHTML = html.generateHTML(colorTheme, userInfo, stars);
        writeFileAsync("index.html", createHTML);

        fs.readFile('index.html', 'utf8', (err, data) => {
            writeToFile(data, "index.html");
            console.log("Success! index.html file written")
        })

    } catch (error) {
        throw error;
    }
}

init()
