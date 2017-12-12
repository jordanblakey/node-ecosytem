const Ora = require('ora');
const cliSpinners = require('cli-spinners');

const spinner = new Ora({
	text: 'Loading...',
  // spinner: process.argv[2]
  // spinner: cliSpinners.dots
  spinner: cliSpinners.moon
  // spinner: cliSpinners.weather
  // spinner: cliSpinners.arrow3
  // spinner: cliSpinners.circleHalves
});

spinner.start();

setTimeout(() => {
	spinner.color = 'yellow';
  spinner.text = 'Almost there...';
}, 1000)
setTimeout(() => {
	spinner.color = 'green';
	spinner.text = 'Making progress...';
}, 2000);
setTimeout(() => {
	spinner.color = 'blue';
	spinner.text = 'One of these days...';
}, 3000);
setTimeout(() => {
	spinner.color = 'magenta';
	spinner.text = 'So close...';
}, 4000);
setTimeout(() => {
	spinner.color = 'cyan';
	spinner.text = 'Zen...';
}, 4000);
setTimeout(() => {
	spinner.color = 'white';
	spinner.text = 'Wow...';
}, 5000);
setTimeout(() => {
	spinner.color = 'grey';
	spinner.text = 'Surely soon...';
}, 6000);

setTimeout(() => {
  spinner.text = 'Done.'
	spinner.succeed();
}, 7000);
