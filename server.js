const app = require("./src/app")
const connect = require("./src/db/db")
const PORT = process.env.PORT
app.listen(PORT , ()=>{
    console.log("SERVER IS RUNING  ON PORT NO : ", PORT);
    connect()
})

