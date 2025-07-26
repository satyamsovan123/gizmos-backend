class LoggerService {
  constructor() {}

  log(message, type = "INFO") {
    const date = new Date();
    const options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour24: false,
    };
    const formattedDate = date.toLocaleString("en-IN", options) + " IST";
    this.message = `${formattedDate} - ${type} - ${message}\n`;
    console.log(this.message);
  }
}

export { LoggerService };
