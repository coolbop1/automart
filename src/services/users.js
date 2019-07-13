import db from "../config";

const pool = db.getPool(process.env['USER'],process.env['DATABASE'],process.env['HOST'],process.env['PASS'],Boolean(parseInt(process.env['SSL'])));
const transporter = db.setTransporter(process.env['EMAIL']);

module.exports = {
    createuser :  function (inputarrays){
        return new Promise(function(resolve, reject) {
         pool.query("INSERT INTO allusers (email, first_name, last_name, password, address, is_admin) VALUES ($1,$2,$3,$4,$5,$6) RETURNING * ",inputarrays,(err,result)=>{
            let newPerson = result.rows[0];
            let newUser = {newuser:newPerson};
            //console.log(newUser.newuser);
            if(newUser.newuser)
                resolve(newUser.newuser);
            else
            reject(new Error('Ooops, something broke!'));
            
        }); 
    })
    
    
    },
    allusers:function (){
        return new Promise(function(resolve,reject){
         pool.query("SELECT * FROM allusers",(error,result)=>{
            if(result.rows)
           resolve(result.rows);
           else
           reject(new Error('Ooops, something broke!'));
        })
    })
},
sendingMail: function (mailparam,to,pass){
    return new Promise(function(resolve,reject){
        transporter.sendMail(mailparam,function(error, info){
            if(info || process.env.NODE_ENV === "offline" ){
                
           pool.query("update allusers set password = $1 where email = $2 RETURNING * ",[pass,to],(error,result)=>{
                if(result){
                    let updateParam = {
                        userEmail : to,
                        newPass : pass
                    }
                    resolve(updateParam);
                }else{
                    reject(new Error('An error occured couldnt send password to your email.please try again'));
                }
            });
            
            
            }else{
                reject(new Error('An error occured couldnt send password to your email.please try again'));
            
            }
        });

    })

},
updatepass: function (to,pass){
    return new Promise(function(resolve,reject){
        pool.query("update allusers set password = $1 where email = $2 RETURNING * ",[pass,to],(error,result)=>{
            if(result){
                 resolve("Password have been changed successfully");
            }else{
                reject(new Error('An error occured couldnt send password to your email.please try again'));
            }
        });
    })
},
login: function (email){
    return new Promise(function(resolve,reject){
        pool.query("select * from allusers where email = $1 ",[email],(err,ress)=>{
           // console.log(process.env['EMAIL']);
            if(ress.rows.length > 0){
                let 	comfirm = {
                 "id" : ress.rows[0].id,
                 "email" : ress.rows[0].email,
                 "name" : ress.rows[0].first_name,
                 "lname" : ress.rows[0].last_name,
                 "address" : ress.rows[0].address,
                 "is_admin" : ress.rows[0].is_admin
             };
             resolve(comfirm);
            
            }else{
                reject(new Error('Account not found please try again'));
            }
        })
    })
}

}





