import {fromdb,emptydb} from "../services/flags"
module.exports ={
    dbwork : function (req,res){
        let ddate = new Date();
        let { user } = req.token;
        async function waitresult(){
            let preparedquery = "insert into reports (car_id, created_on, reason, description, reporter) values ($1,$2,$3,$4,$5) RETURNING * ";
            let queryparam = [req.body.car_id,ddate,req.body.reason,req.body.description,user.email];
            try{
                let outcome = await fromdb(preparedquery,queryparam);
                res.status(201).json({
                    "status":201,
                    "data":outcome,
                    "message" : "Thanks, your report is sent. It will be investigated and acted upon accordingly"
                });
            }catch(e){
                res.status(400).json({
                    "status":400,
                    "error":""+e
                });
            }
        }
        waitresult();
    },
    setaction : function (req,res){
        async function waitresultf(){
            let preparedquery = "truncate table allusers,postads,orders,reports restart identity";
            try{
                let outcome = await emptydb(preparedquery);
                res.status(200).json({
                    "see":outcome
                });
            }catch(e){
                res.status(400).json({
                    "status":400,
                    "error":""+e
                });
            }
        }
        waitresultf();
    }
}