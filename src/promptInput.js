const inquirer = require("inquirer");

// Function to prompt user input using inquirer
const promptInput = (name, type, message, choices = [], validate) => {
    return inquirer.prompt([
        {
            name: name,
            type: type,
            message: message,
            choices: choices,
            validate: validate
        }
    ]);
};

module.exports = promptInput;