const userModel = require("../../database/models/user.model")
const { resGenerator, fileHandler } = require("../helper")
class User {
    static addUser = async (req, res) => {
        try {
            const userData = new userModel({...req.body, userType:"user"})
            await userData.save()
            resGenerator(res, 200, true, userData, "data is added")
        }
        catch (e) {
            resGenerator(res, 500, false, e, "error in insert")
        }
    }
    static addAdmin = async (req, res) => {
        try {
            const userData = new userModel({...req.body, userType:"admin"})
            await userData.save()
            resGenerator(res, 200, true, userData, "data added")
        }
        catch (e) {
            resGenerator(res, 500, false, e, "error in insert")
        }
    }

    static showmyProfile = async(req,res)=>{
        resGenerator(res, 200, true, {user: req.user, token: req.token}, "data showed")
    }
    
    static displayallusers = async (req, res) => {
        try {
            const userData = await userModel.find()
            resGenerator(res, 200, true, userData, "data showed")
        }
        catch (e) {
            resGenerator(res, 500, false, e, "error in show data")
        }
    }
   
    static deleteoneuser = async (req, res) => {
        try {
            const userData = await userModel.findByIdAndDelete(req.params.id)
            if (!userData)
                resGenerator(res, 404, false, userData, "User not found")
            resGenerator(res, 200, true, userData, "data showed")
        }
        catch (e) {
            resGenerator(res, 500, false, e.message, "error in show data")
        }
    }
    static editSingle = async (req, res) => {
        try {
            const wantededits = ["fullname","phonenumber","creditcard"]
            const icomingReqHeaders = Object.keys(req.body)
            //every
            const result = icomingReqHeaders.every((head) => {
                return wantededits.includes(head)
            })
            if (!result)
                resGenerator(res, 404, false, null, "invalid updates")
            const userData = await userModel.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
           
            if (!userData)
                resGenerator(res, 404, false, userData, "User not found")
            resGenerator(res, 200, true, userData, "data showed")
        }
        catch (e) {
            resGenerator(res, 500, false, e.message, "error in show data")
        }

    }
    static login = async (req, res) => {
        try {
            const userData = await userModel.login(req.body.email, req.body.password)
            const token = await userData.generateToken()
            resGenerator(res, 200, true, {userData, token}, "data showed")
        }
        catch (e) {
            resGenerator(res, 500, false, e.message, "error in show data")
        }
    }
    
    
    static logOut = async(req,res)=> {
        try{
            req.user.tokens = req.user.tokens.filter(t => t.token != req.token)
            await req.user.save()
            resGenerator(res, 200, true, null, "logged out")
        }
        catch (e) {
            resGenerator(res, 500, false, e.message, "error in show data")
        }
    }
    static delAllUsers = async(req,res)=>{
        try{
            await userModel.deleteMany()
            resGenerator(res, 200, true, null, "logged out")
    }
    catch (e) {
        resGenerator(res, 500, false, e.message, "error in show data")
    }
    }
    static changeStatus = async(req,res)=>{
        try{
            const userData = await userModel.findById(req.params.id)
            userData.status = !userData.status
            await userData.save()
            resGenerator(res, 200, true, null, "logged out")
        }
        catch (e) {
            resGenerator(res, 500, false, e.message, "error in show data")
        }
    }
    static editProfile = async(req,res)=>{
        try{
            if(req.body.password) delete req.body.password
            await findByIdAndUpdate(req.user._id, req.body, {runValidators:true})
            resGenerator(res, 200, true, null, "your profilr is edited successfully")
        }
        catch (e) {
            resGenerator(res, 500, false, e.message, "error in show data")
        }
    }
    static addAddress = async(req, res)=>{
        try{
            if(req.user.addresses.length>5) throw new Error("you exceeded the limit of typing addresess")
            req.user.addresses.push(req.body)
            await req.user.save()
            resGenerator(res, 200, true, req.user, "your address is edded sucessfully ")
        }
        catch (e) {
            resGenerator(res, 500, false, e.message, "error in adding address")
        }
    }
    static delAddress = async(req,res)=>{
        try{
            req.user.addresses = req.user.addresses.filter(addr=> addr._id != req.params.id)
            await req.user.save()
            resGenerator(res, 200, true, null, "deleted suceessfully")
    }
    catch (e) {
        resGenerator(res, 500, false, e.message, "error in deleting ")
    }
    }

    static uploadImage = async(req, res) => {
        try{
            const newName = fileHandler(req)
            req.user.image = newName.replace("public", "")
            await req.user.save()
            resGenerator(res, 200, true, req.user, "img uploaded")
        }
        catch (e) {
            resGenerator(res, 500, false, e.message, "error in upload")
        }
    }

}
module.exports = User