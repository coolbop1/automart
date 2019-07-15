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
                let { user } = req.token;
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
                let { user } = req.token;
                preparedquery = "update orders set price_offered=$1 where id=$2 and buyer=$3 RETURNING *";
                queryparam = [req.body.order_price,req.params.orderrid,user.id];
             }else{
                expectedstatus = 200;
                preparedquery = "update orders set status=$1 where id=$2 and status=$3 RETURNING * ";
                queryparam = ["accepted",req.params.orderid,"pending"];
             }
            let outcome = await orderdb(preparedquery,queryparam,expectedstatus);
            if(expectedstatus == 201){
            	res.status(201).send({
            		status:201,
            		data:outcome[0],
            		message:"Your offer have been sent to the seller and still pending, Please check your order dashboard to see when it is accepted"
            	})
            }else if(expectedstatus == 200 && req.action == "patchprice"){
            	outcome[0].new_price_offered = req.body.order_price;
            	outcome[0].old_price_offered = req.body.order_price
            outcome[0].message="Your order price have been updated successfully";
            	res.status(200).send(outcome[0])
            }else if(expectedstatus == 200 && req.action == "patchstatus"){
            	res.status(200).send({
            		status:200,
            		data:outcome[0],
            		message:"Your order price have been updated successfully"
            	})
            }else{
            	res.status(expectedstatus).send({
            		status:expectedstatus,
            		data:outcome
            	})
            }
            
            
        }catch(e){
            res.status(404).json({error:""+e});
        }

        }
        doquery()

    }
}