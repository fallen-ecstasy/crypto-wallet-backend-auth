const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const route = require("./routers/appRoutes");


app.use("/",route);

app.listen(port,()=>{
    console.log(`listning from port ${port}`);
});
