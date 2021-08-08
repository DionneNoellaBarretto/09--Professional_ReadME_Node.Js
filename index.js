// node modules to import 
const inquirer = require('inquirer'); // this is for the q&a prompts commonly used in cmd interfaces as per https://www.npmjs.com/package/inquirer
const fs = require('fs'); // this is for access to the filesystem

//Q&A Prompts in an array form
inquirer.prompt([{
            type: 'input', //defines the type of the prompt. Could be input, number, confirm, list, rawlist, expand, checkbox, password, editor 
            message: 'Title:', // this is the qn prompt
            name: 'title' // this is the answer prompt being referenced by a tag 'title'
        },
        {
            type: 'input',
            message: 'What is this homework about? Add a quick description: ',
            name: 'about'
        },
        {
            type: 'input',
            message: 'Installation Instructions:',
            name: 'instructions'
        },
        {
            type: 'input',
            message: 'Contributors?',
            name: 'contributors'
        },
        {
            type: "list",
            message: "Using the up/down arrow keys, select an appropriate license badge by clicking enter:",
            choices: ["Apache-2.0", "MIT", "BSD-3-Clause", "gpl-3.0"], // list of license options --> https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-on-github/licensing-a-repository#choosing-the-right-license
            name: "license",
        },
        {
            type: 'input',
            message: 'Your Github username?',
            name: 'username'
        },
        {
            type: "input",
            message: "Enter your email address:",
            name: "email",
        },
        {
            type: 'input',
            message: 'Github Repository Name?',
            name: 'repoName'
        },
       //If User Story and Acceptance Criteria were hardcoded these following 2 could be skipped
        {
            type: 'input',
            message: 'User Story:',
            name: 'userStory'
        },
        {
            type: 'input',
            message: 'Acceptance Criteria:',
            name: 'acceptanceCriteria'
        },  
    ])

    // Writing to a markdown file
    .then((response) => {
        title();
        function title() {
// writes to the README.md file and appends a title to the first line in the file with the cursor moved to the second new line
            fs.writeFile('README.md', (`# ${response.title}\n\n`),
// ternary operator for error message being requested as a console log in case of errors lest a console log message denoting success
                (err) => err ? console.error(err) : console.log('A README.md file with user supplied content and a table of contents section was successfully created!'))
        }

//table of contents
        toc();
        function toc() {
            fs.appendFile('README.md',
// dynamically generating a placeholder based on the users github username and repo section as outlined https://www.setcorrect.com/portfolio/work11/  
            (`## Table of Contents\n` +
                    `👉 [Qns - Contact Me](https://github.com/${response.username}/${response.repoName}#for-any-questions-reach-me-via-my-username-at-${response.username}-or-email-me-at-denverdionnegmailcom)\n\n` +
                    `👉 [License](https://github.com/${response.username}/${response.repoName}#license-badges)\n\n` +
                    `👉 [Description](https://github.com/${response.username}/${response.repoName}#description)\n\n` +
                    `👉 [Instructions](https://github.com/${response.username}/${response.repoName}#installation-instructions)\n\n` +
                    `👉 [User Story (Usage)](https://github.com/${response.username}/${response.repoName}#user-story-usage)\n\n` +
                    `👉 [Acceptance Criteria](https://github.com/${response.username}/${response.repoName}#acceptance-criteria)\n\n` +
                    `👉 [Contributors](https://github.com/${response.username}/${response.repoName}#contributors)\n\n` +
                    `👉 [DNB Solution](https://github.com/${response.username}/${response.repoName}#dnbs-solution)\n\n`),
                (err) => err ? console.error(err) : console.log(''))
            }
// now appending more information by calling the about function
        about();
        function about() {
            fs.appendFile('README.md', (
// Github username & Email address
            `\n ##### For any questions, reach me via my ![Github Logo](./assets/images/octocat.png?raw=true "Github Logo")username at: [${response.username}](https://github.com/${response.username}) or email me at: 📧${response.email}.\n\n` +
// license badges
            `## License:\n This repository is released under the license of: [${response.license}](https://opensource.org/licenses/${response.license})\n\n` +
// few sentences like in an about / description
            `## Description: \n${response.about}\n\n` +
// Installation Instructions: \n
            `## Installation Instructions: \n${response.instructions}\n\n` +
//Contributor Section: \n
            `## Contributor(s): \n${response.contributors}\n\n` +
// DNB's Solutions with links to repo and github page that are dynamically generated using the repoName and username input values
            `## DNB's SOLUTION:\n` +
            `#### UNC Boot Camp Submission: \n` +
            `🗂️ [Github Repository](https://github.com/${response.username}/${response.repoName}) | 📄 [Github Page](https://${response.username}.github.io/${response.repoName})\n\n`+
// User Story
            `## User Story (Usage):\n ${response.userStory}\n
            [09-Professional README_Node.js_Demonstration](https://drive.google.com/file/d/1i2ydpq66Lm8Iq8cuaFbdUhQKCRBB1cSr/view?usp=sharing)\n\n` + 
//--> If user story/acceptable criteria was not provided as a part of input it would be formatted using this instead
// `## User Story (Usage): \n AS A developer I WANT a README generator SO THAT I can quickly create a professional README for a new project\n\n` +
// Acceptance Criteria
            `## Acceptance Criteria:\n ${response.acceptanceCriteria} ![Gif Demo](./assets/images/09-Professional_README_Node.js.gif)\n\n`), 
// alternative hardcoded option: 
//         `## Acceptance Criteria: \n##### GIVEN a command-line application that accepts user input \n
// ✓ WHEN I am prompted for information about my application repository THEN a high-quality, professional README.md is generated with the title of my project and sections entitled Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions\n
// ✓ WHEN I enter my project title THEN this is displayed as the title of the README\n
// ✓ WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests\n
// ✓ WHEN I choose a license for my application from a list of options THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under\n
// ✓ WHEN I enter my GitHub username THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile\n
// ✓ WHEN I enter my email address THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions\n
// ✓ WHEN I click on the links in the Table of Contents THEN I am taken to the corresponding section of the README\n\n`
            (err) => err ? console.error(err) : console.log(''))
}
})