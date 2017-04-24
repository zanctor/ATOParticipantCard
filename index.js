require('env2')('./env.json');
require('./app/server/config/initializer/appVars')(__dirname);

const db = require('./app/server/config/initializer/db');
const app = require('./app/server/config/initializer/app');

app.listen(GlobalAppVars.env.SERVER_PORT, () => {
    console.log(`server is listening on port ${GlobalAppVars.env.SERVER_PORT}`);
});

module.exports = app;
