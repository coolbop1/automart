import db from "../config";
import con from "../server";


const { configuser,configdatabase,confighost,configpassword,configssl } = con;
const pool = db.getPool(configuser,configdatabase,confighost,configpassword,configssl);
 
module.exports = {
    orderdb : function(preparedquery,queryparam,expectedstatus){
        return new Promise(function (resolve,reject){
            pool.query(preparedquery,queryparam,(error,result)=>{
                console.log(error,result);
                if(result.rows.length > 0){
                    let reply ={
                            "status" : expectedstatus,
                            "data" : result.rows
                    }
                    resolve(reply);
                }else{
                    reject(new Error('Error! occured please try again'));
                }

            })
        })
    }
}
