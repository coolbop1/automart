import db from "../config";
const pool = db.getPool(process.env['USER'],process.env['DATABASE'],process.env['HOST'],process.env['PASS'],Boolean(parseInt(process.env['SSL'])));
 
module.exports = {
    fromdb : function(preparedquery,queryparam){
        return new Promise(function(resolve,reject){
            pool.query(preparedquery,queryparam,(err,result)=>{
                if(result.rows.length > 0 && process.env['EMAIL'] != "testgmail@gmail.com"){
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
                if(result && process.env['EMAIL'] != "testgmail@gmail.com"){
                    resolve("delete")
                }else{
                    reject(new Error('Error! occured please try again'));
                }

            })
        })
    }
}