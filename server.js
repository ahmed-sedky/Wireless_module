class setup_server{
    constructor(directory_path , db_path , port_num){
            const express = require("express"); //require express package
            const app = express();
            const path = require(directory_path);
            const file_system = require("fs");
            // constants
            const DB_PATH = path.resolve(db_path);
            const PORT = process.env.PORT || port_num;
            app.listen(PORT, () => console.log("Listening on port", PORT));
        }
}

class server_controller extends setup_server{
    constructor (){
        super();
    };
    
    Get(){
        app.get("/", async (req, res) => {
        fs.readFile(DB_PATH, "utf-8", (err, jsonString) => {
            if (err) return console.log("Error in reading from db");
            let values = JSON.parse(jsonString);
            res.status(200).json({
            totalValues: values.length,
            values,
            });
        });
        });
    }
    post(){
        app.post("/", async (req, res) => {
        fs.readFile(DB_PATH, "utf-8", (err, jsonString) => {
            if (err) return console.log("Error in reading from db");
            let body = req.body;
            let valuesArr = JSON.parse(jsonString);
            let obj = {
                temperature: body.temperature,
                humidity: body.humidity,
                timestamp: new Date(),
            };
            valuesArr.push(obj);
            fs.writeFile(DB_PATH, JSON.stringify(valuesArr), (err) => {
                if (err) return console.log("Error in updating db");
                res.status(200).json({
                message: "Values saved",
                value: valuesArr[valuesArr.length - 1],
                });
            });
            });
        });
    }
}