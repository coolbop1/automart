import db from "../config";

const pool = db.getPool(process.env['USER'],process.env['DATABASE'],process.env['HOST'],process.env['PASS'],Boolean(parseInt(process.env['SSL'])));

module.exports = {
    carquery : function (preparedquery,queryparam,expectedstatus){
        return new Promise(function(resolve,reject){
            pool.query(preparedquery,queryparam,(error,result)=>{
               //console.log(queryparam)
                if(result.rows.length > 0){
                	let reply = result.rows
              
                     resolve(reply)
                }else{
                reject(new Error('Ooops, something broke!')); }               
                
            })
        })
    },
    deleteacar : function (preparedquery,queryparam){
        return new Promise(function(resolve,reject){
            pool.query(preparedquery,queryparam,(error,result)=>{
                if(result && process.env['EMAIL'] != 'testgmail@gmail.com'){
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