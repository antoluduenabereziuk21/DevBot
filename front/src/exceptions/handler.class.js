class GlobalExceptionHandler extends Error{
    constructor(message) {
        super(message);
        this.name= this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
        this.timestamp = new Date();
    }
}

class NotFoundDataException extends GlobalExceptionHandler{
    constructor(message) {
        super(message);
    }
}
class OptionNotValidException extends GlobalExceptionHandler{
    constructor(message) {
        super(message);
    }
}

module.exports = {NotFoundDataException,OptionNotValidException};