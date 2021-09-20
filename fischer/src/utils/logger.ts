const silent = !!process.env.SERVER_SILENT_LOGGER;

const logger = silent ? Function.prototype : console.log;
export default logger;
