import db from "../config";
import con from "../server";


const { configuser,configdatabase,confighost,configpassword,configssl } = con;
const pool = db.getPool(configuser,configdatabase,confighost,configpassword,configssl);
 
module.exports = {
    fromdb : function(preparedquery,queryparam){
        return new Promise(function(resolve,reject){
            pool.query(preparedquery,queryparam,(err,result)=>{
                if(result.rows.length > 0){
                    let datas = result.rows;
                    resolve(datas)
                }else{
                    reject(new Error('Error! occured please try again'));
                }
            })
        })
    },
    emptydb: function(preparedquery){
        return new Promise(function(resolve,reject){
            pool.query(preparedquery,(err,result)=>{
                if(result){
                    resolve("delete")
                }else{
                    reject(new Error('Error! occured please try again'));
                }

            })
        })
    }
}