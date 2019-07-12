import { orderdb } from "../services/orders"

module.exports = {
    orderquery : function(req,res){
        let preparedquery;
        let queryparam;
        let expectedstatus;
        let buyerquery;
        let sellerquery;
        let statusquery;
        let statusequery;
        if(typeof req.token !== "undefined"){
        let { user } = req.token;
        }
        if(typeof req.query.buyer !== "undefined"){
            buyerquery = parseInt(req.query.buyer);
        }else{
            buyerquery = null;
        }
        if(typeof req.query.seller !== "undefined"){
            sellerquery = parseInt(req.query.seller);
        }else{
            sellerquery = null;
        }
        if(typeof req.query.status !== "undefined"){
            statusquery = req.query.status;
        }else{
            statusquery = null;
        }
        if(typeof req.query.statuses !== "undefined"){
            statusequery = req.query.statuses;
        }else{
            statusequery = null;
        }
        
        async function doquery(){
            
        try{
            
            
            if(req.action == "post"){
                let pdate = new Date();
                expectedstatus = 201;
                preparedquery = "insert into orders (buyer, car_id, amount, price_offered, status, created_on) values ($1,$2,$3,$4,$5,$6) RETURNING *";
                queryparam = [user.id,parseInt(req.body.car_id),parseInt(req.body.amount),parseInt(req.body.order_price),req.body.status,pdate];
             }else if(req.action == "getall"){
                expectedstatus = 200;
                preparedquery = "select a.*,b.manufacturer,b.model,b.id as carid,b.owner from orders a join postads b on a.car_id=b.id"
                +" where CASE"
                +" WHEN $1::varchar IS NOT NULL THEN a.buyer = $1 ELSE 1=1 END and CASE"
                +" WHEN $2::int IS NOT NULL THEN b.owner = $2 ELSE 1=1 END and CASE"
                +" WHEN $3::varchar IS NOT NULL THEN a.status = $3 ELSE 1=1 END and CASE"
                +" WHEN $4::varchar IS NOT NULL THEN a.status != $4 ELSE 1=1 END";
                queryparam = [buyerquery,sellerquery,statusquery,statusequery];
             }else if(req.action == "patchprice"){
                expectedstatus = 200;
                preparedquery = "update orders set price_offered=$1 where id=$2 and status=$3 and buyer=$4 RETURNING *";
                queryparam = [req.body.order_price,req.params.orderrid,"pending",user.id];
             }else if(req.action == "patchstatus"){
                expectedstatus = 200;
                preparedquery = "update orders set status=$1 where id=$2 and status=$3 RETURNING * ";
                queryparam = ["accepted",req.params.orderid,"pending"];
             }
            let outcome = await orderdb(preparedquery,queryparam,expectedstatus);
            if(outcome.status == 201)
            outcome.message= "Your offer have been sent to the seller and still pending, Please check your order dashboard to see when it is accepted";
            if(outcome.status == 200 && req.action == "patchprice")
            outcome.message= "Your order price have been updated successfully";
            if(outcome.status == 200 && req.action == "patchstatus")
            outcome.message= "Your order price have been updated successfully";
            res.status(outcome.status).json(outcome);
        }catch(e){
            res.status(404).json({error:""+e});
        }

        }
        doquery()

    }
}