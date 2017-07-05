require('env2')('./env.json');
require('./app/config/initializer/appVars')(__dirname);

const db = require('./app/config/initializer/db');
const app = require('./app/config/initializer/app');

app.listen(GlobalAppVars.env.SERVER_PORT, () => {
    console.log(`server is listening on port ${GlobalAppVars.env.SERVER_PORT}`);
});

module.exports = app;