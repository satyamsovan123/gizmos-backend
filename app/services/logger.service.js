class LoggerService {
  constructor() {}

  log(message, type = "INFO") {
    this.message = `${new Date().toISOString()} - ${type} - ${message}\n`;
    console.log(this.message);
  }
}

export { LoggerService };
