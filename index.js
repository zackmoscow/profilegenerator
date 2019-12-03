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
            image: response1.data.avatar_url,
            name: response1.data.name,
            location: response1.data.location,
            profile: response1.data.html_url,
            blog: response1.data.blog,
            bio: response1.data.bio,
            public_repos: response1.data.public_repos,
            followers: response1.data.followers,
            following: response1.data.following,
        }
        
        let userStars = await axios(`https://api.github.com/users/${username}/starred`);
        stars = userStars.data.length;
    } catch (error) {
        throw error;
    }
}

init()
