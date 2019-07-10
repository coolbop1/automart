import db from "../config";
import con from "../server";


const { configuser,configdatabase,confighost,configpassword,configssl,thegmail } = con;
const pool = db.getPool(configuser,configdatabase,confighost,configpassword,configssl);

module.exports = {
    entercardb : function (postparam){
        return new Promise(function(resolve,reject){
            pool.query("INSERT INTO postads (email,owner,created_on,manufacturer,model,price,state,engine_size,body_type,pics,status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING * ",postparam,(error,result)=>{
                if(result.rows.length >0){
                    let newcar ={
                        "id":result.rows[0].id,"email" : result.rows[0].email,"created_on" : result.rows[0].date,"manufacturer" : result.rows[0].manufacturer,"model" : result.rows[0].model,"price" :result.rows[0].price,"state" : result.rows[0].state,"engine_size" : result.rows[0].engine_size,"body_type" : result.rows[0].body_type,"pics" : result.rows[0].pics,"status" : "available"
                        }
                     resolve(newcar)
                }else
                reject(new Error('Ooops, something broke!'));                
                
            })

        })
    },
    findcar : function (preparedquery,queryparam){
        return new Promise(function(resolve,reject){
            pool.query(preparedquery,queryparam,(error,result)=>{
                if(result.rows.length >0){
                     resolve(result.rows)
                }else
                reject(new Error('Ooops, something broke!'));                
                
            })
        })
    }
}