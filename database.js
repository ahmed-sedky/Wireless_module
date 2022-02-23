var sqlite3 = require("sqlite3").verbose();
var md5 = require("md5");

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");
    db.run(
      `CREATE TABLE temperature (id INTEGER PRIMARY KEY AUTOINCREMENT,reading INTEGER,time text )`,
    (err)=>{
      if (err){
        
      }
      else{
        
      }
    }
    );
    db.run(
      `CREATE TABLE pressure (id INTEGER PRIMARY KEY AUTOINCREMENT,reading INTEGER,time text )`,
    (err)=>{
      if (err){
      }
      else{
        
      }
    }
    );

  }
});

module.exports = db;
