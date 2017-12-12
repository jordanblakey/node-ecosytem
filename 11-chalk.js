const chalk = require('chalk');
const log = console.log

// BASIC USAGE /////////////////////////////////////////////////////////////////

log(chalk.blue('Hello world!')); // Colored text
log(chalk.redBright('Hello world!')); // Colored text
log(chalk.greenBright('Hello world!')); // Colored text
log(chalk.yellowBright('Hello world!')); // Colored text
log(chalk.blueBright('Hello world!')); // Colored text
log(chalk.magentaBright('Hello world!')); // Colored text
log(chalk.cyanBright('Hello world!')); // Colored text
log(chalk.whiteBright('Hello world!')); // Colored text
log(chalk.cyan('Hello ') + 'World' + chalk.red('!')) // multiple instances
log(chalk.magenta.bold('Hello world!')); // bold
log(chalk.dim('Hello world!')); // dim
log(chalk.dim.inverse('Hello world!')); // inverse
log(chalk.bold.inverse.black('Hello world!')); // bold, black, inverse
log(chalk.red.bgGreen.bold('Hello world!')); // BG
log(chalk.gray('Hello', 'World!', 'Foo', 'bar', 'biz', 'baz')); // Multi args

// Nest styles of the same type even (color, underline, background)
log(chalk.green(
	'I am a green line ' +
	chalk.blue.underline.bold('with a blue substring') +
	' that becomes green again!'
));


// TEMPLATE LITERALS ///////////////////////////////////////////////////////////
log(`
CPU: ${chalk.red('90%')}
RAM: ${chalk.green('40%')}
DISK: ${chalk.yellow('70%')}
`);


// TAGGED TEMPLATE LITERALS ////////////////////////////////////////////////////
let cpu = {totalPercent: 80}
let ram = {used: 750, total: 1200}
let disk = {used: 300, total: 1200}

log(chalk`
CPU: {red ${cpu.totalPercent}%}
RAM: {green ${ram.used / ram.total * 100}%}
DISK: {rgb(255,131,0) ${disk.used / disk.total * 100}%}
`);

const error = chalk.bold.red;
const warning = chalk.keyword('orange');


// CONSOLE STRING SUBSTITUTION /////////////////////////////////////////////////
console.log(error('Error!'));
console.log(warning('Warning!'));

const name = 'Sindre';
console.log(chalk.green('Hello %s'), name);
//=> 'Hello Sindre'