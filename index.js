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
            message: 'What is this homework about?',
            name: 'about'
        },
        {
            type: 'input',
            message: 'Github Repository URL?',
            name: 'repository'
        }, 
        {
            type: 'input',
            message: 'Github Page URL?',
            name: 'webpage'
        }, 
    ])

// Writing to a markdown file
    .then((response) => {
        title();

        function title() {
// writes to the README.md file and appends a title to the first line in the file with the cursor moved to the second new line
            fs.writeFile('README.md', (`# ${response.title}\n\n`),
// ternary operator for error message being requested as a console log in case of errors lest a console log message denoting success
                (err) => err ? console.error(err) : console.log('ReadME with title'))
        }
// now appending more information by calling the about function
        about();
        function about() {
            fs.appendFile('README.md', 
// few sentences about the HW
            (`${response.about}\n\n` +
// DNB's Solutions with links to repo and github page
        `# DNB's SOLUTION:\n
            UNC Boot Camp Submission: \n
                🗂️[Github Repository](${response.repository}) \n\n 
                📄[Github Page](${response.webpage})\n\n`), 
            (err) => err ? console.error(err) : console.log('and appended content was successfully created.'))
        }
    })