import  Joi from "joi";

module.exports = {
    flaginput: function(req,res,next){
        const schema ={
            car_id : Joi.number().min(0).required(),
            reason : Joi.string().regex(/^[,. !a-z0-9A-Z]+$/).trim().min(1),
            description : Joi.string().regex(/^[,. !a-z0-9A-Z]+$/).trim().min(1),		
        }
        const valid = Joi.validate(req.body,schema);
        if(valid.error){
        let reply = {
            "status":409,
            "error" : valid.error.details[0].message
        }	
        res.status(409).send(reply);
            return ;
        }else{
            next();
        }
    },
    validatedelete : function(req,res,next){
        let { user } = req.token;
        if(user.is_admin == false){
            let reply = {
                "status":409,
                "error" : "you have no right for this action"
            }	
            res.status(409).send(reply);
                return ;
        }else{
            next();
        }

    }
}
