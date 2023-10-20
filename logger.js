const EventEmitter = require('events');
const uuid = require('uuid');

class Logger extends EventEmitter {
    // Class method
    log(msg) {
        // Call event, emit event called 'message'
        this.emit('message', { id: uuid.v4(), msg: msg });
    };
};

// module.exports = Logger;

// The below can be placed in an index.js file as long as the above
// exports command is uncommented.
const Logger = require('./logger');

const logger = new Logger();

logger.on('message', (data) => console.log('Called Listener:', data));

logger.log('Hello World');