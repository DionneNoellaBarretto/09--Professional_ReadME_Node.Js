// node modules to import  
const inquirer = require('inquirer'); // this is for the q&a prompts commonly used in cmd interfaces as per https://www.npmjs.com/package/inquirer
const fs = require('fs'); // this is for access to the filesystem
const { title } = require('node:process');

//Q&A Prompts in an array form
inquirer.prompt([
{
    type: 'input', //defines the type of the prompt. Could be input, number, confirm, list, rawlist, expand, checkbox, password, editor 
    message: 'Title:', // this is the qn prompt
    name: 'title' // this is the answer prompt being referenced by a tag 'name'
}
//, 
// {
//     https://dionnenoellabarretto.github.io/09--Professional_ReadME_Node.Js/ 
// }
])

// Writing to a markdown file
.then((response)=>{
    title();
    function title(){
        // writes to the README.md file and appends a title to the first line in the file with the cursor moved to the second new line
        fs.writeFile('README.md', (`# ${response.title}\n\n`),
        // ternary operator for error message being requested as a console log in case of errors lest a console log message denoting success
        (err) => err ? console.error(err) : console.log('ReadME with a title successfully created.'))
    }
})