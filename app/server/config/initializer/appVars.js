let rootDir;
let appVars;
module.exports = (cwd = rootDir) => {
    if (appVars) return appVars;
    rootDir = cwd;
    const {DB_URL, API_URL, SERVER_PORT} = process.env;
    appVars = {
        appModelsFilePath: `${rootDir}/app/models/appModels`,
        env: {
            DB_URL,
            API_URL,
            SERVER_PORT
        }
    };
    global.GlobalAppVars = appVars;

    return appVars;
};