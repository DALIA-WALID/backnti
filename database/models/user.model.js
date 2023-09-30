const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        trim: true,
        required: true,
        minLength:20,
        maxLength:50,
    },
    cridetcard: {
        type: String,
        trim: true,
        required: true,
        match: /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/
        
    },
    password: {
        type:[String ,number,uppercase,lowercase] ,
        trim: true,
        required: true,
       match:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    },
   email: {
    type: String,
    trim: true,
       required: true,
       validator(value) {
        if(!validator.isEmail(value)) throw new error("this is invalid email")
    }
    },
    Countrycode: {
        type: String,
        trim:true,
   },
    phonenumber: {
        type: String,
        trim: true,
        required: true,
        validator(value) {
            if(!validator.isMobilePhone(value.this.Countrycode )) throw new error ("da mesh phone number easta")
        }
    },
    
    gender: {
        type:String,
        trim:true,
        enum:["male", "female"]
    },
   
    dOfBirth:{
        type:Date,
       
    },
    addresses: [
        {
            addrType:{
                type:String,
                required:true,
                trim:true
            },
            addrDetails:{
                type:String,
                required:true,
                trim:true
            }
        }
    ]  ,
    userType:{
        type:String,
        enum : ["admin", "user"],
        default: "user"
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ], 
    status:{
        type:Boolean,
        default:false
    },
    userType:{
        type:String,
        enum : ["admin", "user"],
        default: "user"
    },
   
},

{
    timestamps : true  
}
)



userSchema.methods.toJSON = function(){
    const data = this.toObject()
        delete data.tokens
       return data
}
userSchema.pre("save", async function(){
    if(this.isModified("password"))
        this.password = await bcrypt.hash(this.password, 10)
})
userSchema.statics.login = async(email, password)=>{
    const userData = await userModel.findOne( { email } )
    if(!userData) throw new Error(" email is not valid")
    const ifPasswordthesame = await bcrypt.compare(password, userData.password)
    if(ifPasswordthesame) throw new Error("incorrect password .")
    return userData
}
userSchema.methods.generateToken = async function(){
    const token = jwt.sign({_id: this._id}, process.env.jwtKey)
    this.tokens.push( { token })
    await this.save()
    return token
}
const userModel = new mongoose.model("user", userSchema)
module.exports = userModel