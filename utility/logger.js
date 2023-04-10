const chalk = require('chalk'),
fs = require("fs"),
{ DateTime } = require('luxon'),
{ join } = require('path'),
LogState = {
none: '',
debug: 'DEBUG',
err: 'ERROR',
log: 'LOG'
};

class LogManager {
  currentTime() {
    return DateTime.now().toFormat("tt");
  }

  log(text, inConsole = true, pre, state = LogState.none) {
    const logstack = [`[${this.currentTime()}]`];
    if (state) logstack.push(`[${state}]`);
    if (pre)
      logstack.push(
        Array.isArray(pre) ? pre.map((p) => `[${p}]`).join("") : `[${pre}]`
      );
    logstack.push(text);

    const logstr = logstack.join(" ").split("\n").join("\n> ");
    if (inConsole) {
        if(state == LogState.none) {
            console.log(chalk.greenBright(logstr));
        } else if(state == LogState.debug) {
            console.log(chalk.yellowBright(logstr));
        } else if( state == LogState.err) {
            console.log(chalk.redBright(logstr));
        } else {
            console.log(chalk.blueBright(logstr));
        }
    }
    return logstr;
  }

  info(text, pre) {
    return this.log(text, true, pre, LogState.log)
  }

  debug(text, pre) {
    return this.log(text, true, pre, LogState.debug);
  }

  error(text, pre) {
    return this.log(text, true, pre, LogState.err);
  }

  logForError(err, pre) {
    return this.error(
      `err: ${err.name}\nmsg: ${err.message}\nstk: ${err.stack || "No Stack"}`,
      pre
    );
  }
}

const logger = new LogManager();

module.exports = logger;
