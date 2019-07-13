import db from "../config";
const pool = db.getPool(process.env['USER'],process.env['DATABASE'],process.env['HOST'],process.env['PASS'],Boolean(parseInt(process.env['SSL'])));
 
module.exports = {
    orderdb : function(preparedquery,queryparam,expectedstatus){
        return new Promise(function (resolve,reject){
            pool.query(preparedquery,queryparam,(error,result)=>{
                //console.log(error,result);
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
