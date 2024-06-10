class CustomError extends Error{
    name="CustomError"
    constructor(message,errorCode){
        super(message)
        this.errorCode=errorCode
    }
    
    
}

module.exports=CustomError