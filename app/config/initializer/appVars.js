let rootDir;
let appVars;
module.exports = (cwd = rootDir) => {
    if (appVars) return appVars;
    rootDir = cwd;
    const {DB_URL, API_URL, SERVER_PORT, SECRET_KEY} = process.env;
    appVars = {
        appModelsFilePath: `${rootDir}/app/models/appModels`,
        env: {
            DB_URL,
            API_URL,
            SERVER_PORT,
            SECRET_KEY
        }
    };
    global.GlobalAppVars = appVars;

    return appVars;
};