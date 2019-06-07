const chalk = require('chalk');
const yargs = require('yargs');

// console.log(process.argv);

yargs.command({
    command: "add",
    describe: "Add new data",
    handler: () => {
        console.log('Adding newe data');
    }
});

console.log(yargs.argv);