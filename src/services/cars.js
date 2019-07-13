import db from "../config";
import con from "../server";


const { configuser,configdatabase,confighost,configpassword,configssl } = con;
const pool = db.getPool(configuser,configdatabase,confighost,configpassword,configssl);

module.exports = {
    carquery : function (preparedquery,queryparam,expectedstatus){
        return new Promise(function(resolve,reject){
            pool.query(preparedquery,queryparam,(error,result)=>{
                //console.log(error,result)
                if(result.rows.length >0){
                    let reply = {
                        status:expectedstatus,
                        data:result.rows
                    }
                     resolve(reply)
                }else
                reject(new Error('Ooops, something broke!'));                
                
            })
        })
    },
    deleteacar : function (preparedquery,queryparam){
        return new Promise(function(resolve,reject){
            pool.query(preparedquery,queryparam,(error,result)=>{
                if(result){
                    let reply = {
                        "status" : 200,
                        "data" : "Car Ad successfully deleted"
                    }
                     resolve(reply)
                }else
                reject(new Error('Ooops, something broke!'));                
                
            })
        })
    }
}