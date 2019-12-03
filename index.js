const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
const html = require("./generateHTML.js");

const questions = [
    {
        type: "input",
        name: "username",
        message: "What is your Github username?"
    },
    {
        name: "color",
        type: "list",
        message: "Choose a color",
        choices: ["red", "blue", "green", "pink"]
    }
];

function writeToFile(fileName, data) {
 
}

function init() {
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
        stars = userStars.data.length;
    } catch (error) {
        throw error;
    }
}

init()
