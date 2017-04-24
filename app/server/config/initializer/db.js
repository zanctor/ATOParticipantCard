const mongoose = require("mongoose");
mongoose.Promise = Promise;
mongoose.connect(global.GlobalAppVars.env.DB_URL)
    .then(
        () => console.log("DB connected"),
        (error) => console.log(error)
    );

require("../../models/appModels");