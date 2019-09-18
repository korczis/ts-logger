type LogMessage = {
    msg: string;
}

type LogFunction = (msg: string) => void;

enum LogTarget {
    Database,
    Datadog,
}

const formatMessage = (msg: LogMessage) => {
    return `${msg.msg}`;
}

const logToDatabase = (msg: LogMessage) => {
    console.log("database", formatMessage(msg));
}

const logToDatadog = (msg: LogMessage) => {
    console.log("datadog", msg);
}

const logToConsole = (msg: LogMessage) => {
    console.log(msg);
}

const createLogger = (opts = {}, impl = logToConsole) => {
    return (msg: string, optsExt = {}) => {
        let payload = null;
        if (typeof msg === "string") {
            payload = {
                msg
            }
        } else {
            payload = msg;
        }

        impl({
            ...opts,
            ...optsExt,
            ...payload,
        });
    };
}

const executeElement = (log: LogFunction) => {
    log("Executing element");
}

const executePage = (log: LogFunction) => {
    log("Executing page");

    executeElement(createLogger({ pageId: "123" }, log));
}

const executeTemplate = (log: LogFunction) => {
    log("Executing template");

    executePage(createLogger({ templateId: "abc" }, log));
}

const main = () => {
    const loggerDatadog = createLogger({
        moduleName: "ne:engine"
    }, logToDatadog);

    const loggerDatabase = createLogger({
        moduleName: "ne:engine"
    }, logToDatabase);

    // Smart logger here

    // executeTemplate(loggerDatadog);
    executeTemplate(loggerDatabase);
}

main();
