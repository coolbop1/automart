module.exports = {
    authError : function (){
        
        let error  = {
                status:403,
                "error":"Opps!! you are not authorized to perform this operation,please login to get authorized token"
            }
        return error;
    
    },
    operationError : function (){
        let error ={
            "status":404,
            "error":"The account was not found.Cant change password"
        }
        return error;
    }
}