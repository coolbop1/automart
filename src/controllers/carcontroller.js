import { authError } from "../helpers/errors";
import carservices from "../services/cars";

const { entercardb,findcar } = carservices;

module.exports = {
	postcar : function (req, res) {
        let dddate = new Date();
     let { user } = req.token;
     console.log('got here--'+req.body.email);
     if(user.email==req.body.email && user.id==req.body.id){
        console.log('got here--'+user);
        postAcar()
     }else{
        authError()
     }
     async function postAcar() {
        
         try{
            let postparam = [user.email,user.id,dddate,req.body.manufacturer,req.body.model,req.body.price,req.body.state,req.body.engine_size,req.body.body_type,req.body.pics,"available"];
            
            let outcome = await entercardb(postparam);
            res.status(201).json({"status":201,"data": outcome,"message" : "Car posted successfully"});
        
         }catch(e){
            console.log(e);
         }
     }
 	
    },
    getcarquery : function (req, res) {
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
        try{
            let preparedquery="SELECT * FROM postads where CASE  WHEN $1::varchar IS NOT NULL THEN status = $1 ELSE 1=1 END and CASE WHEN $2::int IS NOT NULL THEN price >=$2 ELSE 1=1 END and CASE WHEN $3::int IS NOT NULL THEN price <= $3 ELSE 1=1 END and CASE WHEN $4::varchar IS NOT NULL THEN state = $4"
            +" ELSE 1=1 END and CASE WHEN $5::varchar IS NOT NULL THEN body_type = $5 ELSE 1=1 END and CASE WHEN $6::varchar IS NOT NULL THEN manufacturer = $6 ELSE 1=1 END and CASE WHEN $7::varchar IS NOT NULL THEN email = $7 ELSE 1=1 END";
            let queryparam = [thesstatus,theminprice,themaxprice,thestate,thetype,themanu,theemail];
           let outcome = await findcar(preparedquery,queryparam);
            res.status(200).json({ "status" : 200, "data" : outcome});
        
         }catch(e){
            res.status(404).json({
                "status":404,
                "error":"no result for this request"
            });
         }
        }
        searchcar();
    }
}