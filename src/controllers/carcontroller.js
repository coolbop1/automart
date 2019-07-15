import { authError } from "../helpers/errors";
import carservices from "../services/cars";

const { carquery,deleteacar } = carservices;

module.exports = {
    allcarquery : function (req, res) {
        
        async function searchcar() {
        let theminprice;
        let themaxprice;
        let thesstatus;
        let themanu;
        let thetype;
        let thestate ;
        let theemail;
        if(typeof req.query.min_price !== "undefined" ){
            if(isNaN(req.query.min_price)){
                res.status(400).send({
                	"status":400,
                "error":"wrong value formart for min_price"});
                return;
            }else
                theminprice = parseInt(req.query.min_price);
        }
        else
        theminprice = null;
        if(typeof req.query.max_price !== "undefined"){
            if(isNaN(req.query.max_price)){
                res.status(400).send({
                	"status":400,
                	"error":"wrong value formart for max_price"});
                return;
            }else
                themaxprice = parseInt(req.query.max_price);
        }
        else
        themaxprice = null;
        if(typeof req.query.status !== "undefined")
        thesstatus = req.query.status;
        else
        thesstatus = null;
        if(typeof req.query.body_type !== "undefined")
        thetype = req.query.body_type;
        else
        thetype = null;
        if(typeof req.query.state !== "undefined")
        thestate = req.query.state;
        else
        thestate = null;
        if(typeof req.query.manufacturer !== "undefined")
        themanu = req.query.manufacturer;
        else
        themanu = null;
        if(typeof req.query.email !== "undefined")
        theemail = req.query.email;
        else
        theemail = null;
        let preparedquery;
        let queryparam;
        let expectedstatus;
        
        if(typeof req.params.carid !== "undefined" && req.action == "get"){
                preparedquery="select * from postads where id = $1";
                queryparam = [req.params.carid];
                expectedstatus=200;

        }else if(req.action == "post"){
            let dddate = new Date();
            let { user } = req.token;
            preparedquery="INSERT INTO postads (email,owner,created_on,manufacturer,model,price,state,engine_size,body_type,pics,status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING * ";
            queryparam = [user.email,user.id,dddate,req.body.manufacturer,req.body.model,req.body.price,req.body.state,req.body.engine_size,req.body.body_type,req.body.pics,"available"];
            expectedstatus=201;
        }else if(req.action == "patchstatus"){
            let { user } = req.token;
            preparedquery="update postads set status=$1 where id=$2 and status=$3 and owner=$4 RETURNING *";
            queryparam = ["sold",req.params.carid,"available",user.id];
            expectedstatus=200;
        }else if(req.action == "patchprice"){
            let { user } = req.token;
            preparedquery="update postads set price=$1 where id=$2 and status<>$3 and email=$4 RETURNING * ";
            queryparam = [req.body.price,req.params.carid,"sold",user.email];
            expectedstatus=200;
        }else{
            preparedquery="SELECT * FROM postads where CASE  WHEN $1::varchar IS NOT NULL THEN status = $1 ELSE 1=1 END and CASE WHEN $2::int IS NOT NULL THEN price >=$2 ELSE 1=1 END and CASE WHEN $3::int IS NOT NULL THEN price <= $3 ELSE 1=1 END and CASE WHEN $4::varchar IS NOT NULL THEN state = $4"
        +" ELSE 1=1 END and CASE WHEN $5::varchar IS NOT NULL THEN body_type = $5 ELSE 1=1 END and CASE WHEN $6::varchar IS NOT NULL THEN manufacturer = $6 ELSE 1=1 END and CASE WHEN $7::varchar IS NOT NULL THEN email = $7 ELSE 1=1 END";
            queryparam = [thesstatus,theminprice,themaxprice,thestate,thetype,themanu,theemail];
            expectedstatus=200;
        }
            try{
           let outcome = await carquery(preparedquery,queryparam,expectedstatus);
           if(expectedstatus==201){
           	res.status(201).json({
           		status:202,
           		data:outcome[0],
           		message:"Car posted successfully"
           	});
           }else if(expectedstatus==200 && req.action == "patchstatus"){
           	res.status(200).json({
           		status:200,
           		data:outcome[0],
           		message:"The ad have been marked as sold."
           	});
       }else if(expectedstatus==200 && req.action == "patchprice"){
       	res.status(200).json({
           		status:200,
           		data:outcome[0],
           		message:"The price have been changed successfully."
           	});
       }else if(typeof req.params.carid !== "undefined"){
       	
       	res.status(200).json({
           		status:200,
           		data:outcome[0]})
           		
       }else{
       	res.status(200).json({
           		status:200,
           		data:outcome
           	});
       }
           
           
            
        
         }catch(e){
            res.status(404).json({
                "status":404,
                "error":"Error occoured please try again"
            });
         }
        }
        searchcar();
    },
    deletecar : function (req, res){
        async function deletes(){
        try{
           let  preparedquery= "DELETE FROM  postads WHERE id=$1";
           let queryparam = [req.params.carid];
            let fufil = await deleteacar(preparedquery, queryparam);
            res.status(200).json(fufil);
        }catch(e){
            res.status(404).json({
                "status":404,
                "error":"Error occoured please try again"+e
            });
         }
        }
        deletes();
    }

}