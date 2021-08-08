// node modules to import  
// const generatorMarkdown = require("./generateMarkdown")
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
            message: 'What is this homework about?',
            name: 'about'
        },
        // User Story and Acceptance Criteria can be taken as input from the user however this is being hardcoded for the sake of this homework exercise
        // {
        //     type: 'input',
        //     message: 'User Story',
        //     name: 'userStory'
        // },
        // {
        //     type: 'input',
        //     message: 'Acceptance Criteria',
        //     name: 'acceptanceCriteria'
        // },  
        {
            type: 'input',
            message: 'Github Repository Name?',
            name: 'repoName'
        }, 
        {
            type: 'input',
            message: 'Your Github username?',
            name: 'username'
        }, 
    ])

// Writing to a markdown file
    .then((response) => {
        title();

        function title() {
// writes to the README.md file and appends a title to the first line in the file with the cursor moved to the second new line
            fs.writeFile('README.md', (`# ${response.title}\n\n`),
// ternary operator for error message being requested as a console log in case of errors lest a console log message denoting success
                (err) => err ? console.error(err) : console.log('Successfully Created:'))
        }
// now appending more information by calling the about function
        about();
        function about() {
            fs.appendFile('README.md', 
// Github username
            (`## Github Username: ![Github Logo](./assets/images/octocat.png?raw=true "Github Logo") [${response.username}](https://github.com/${response.username})\n\n` +
// few sentences about the HW
            `## Description: \n${response.about}\n\n` +

// User Story
// `## User Story:\n ${response.userStory}\n\n` + --> If user story was provided as a part of input it would be formatted using this line instead of the next hardcoded version
`## User Story: \nAS A developer\nI WANT a README generator\nSO THAT I can quickly create a professional README for a new project\n\n` +

// Acceptance Criteria
// `## Acceptance Criteria:\n ${response.acceptanceCriteria}\n\n` + --> If acceptance criteria was provided as a part of input it would be formatted using this line instead of the next hardcoded version
`## Acceptance Criteria:\n
GIVEN a command-line application that accepts user input\n
✓ WHEN I am prompted for information about my application repository THEN a high-quality, professional README.md is generated with the title of my project and sections entitled Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions\n
✓ WHEN I enter my project title THEN this is displayed as the title of the README\n
✓ WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests\n
✓ WHEN I choose a license for my application from a list of options THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under\n
✓ WHEN I enter my GitHub username THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile\n
✓ WHEN I enter my email address THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions\n
✓ WHEN I click on the links in the Table of Contents THEN I am taken to the corresponding section of the README\n\n` +

// DNB's Solutions with links to repo and github page that are dynamically generated using the repoName and username input values
        `## DNB's SOLUTION:\n` +
         `##### UNC Boot Camp Submission: \n` +
            `🗂️ [Github Repository](https://github.com/${response.username}/${response.repoName}) | 📄 [Github Page](https://${response.username}.github.io/${response.repoName})\n\n`), 
            (err) => err ? console.error(err) : console.log('A README.md file with user supplied content!')) 
        }
    })