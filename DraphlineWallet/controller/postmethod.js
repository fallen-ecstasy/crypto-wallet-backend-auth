const registerSchema = require("../config/model/registerationSchema");
const path = require('path');
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

const postRegister = async (req,res) => {
    const nameField = req.body.userName;
    const emailField = req.body.email;
    const securityQuestionField = req.body.securityQuestion;
    const passwordField = req.body.password ;
    const confirmPasswordField = req.body.confirmPassword;
    if(passwordField === confirmPasswordField){ 
        let existence = await registerSchema.findOne({email:emailField});
        if(existence == null){
            try {
                var hashpassword = bcrypt.hashSync(passwordField, salt);
                var hashSecurityQuestion = bcrypt.hashSync(securityQuestionField, salt);
                const newdata = new registerSchema({
                    userName : nameField,
                    email : emailField,
                    securityQuestion : hashSecurityQuestion,
                    password : hashpassword             
                });
                newdata.save()
                res.sendFile(path.join(__dirname,"../views/afterRegister.html"));            
                }catch (error) {
                res.status(400).send(error);
            }
        }else{
            res.status(400).send("email already exist");
        }   
    }
    else{
        res.status(400).send("password doesn't match");
    }    
}

const postLogin = async (req,res) => {
    try {
        const emailField = req.body.email;
        const passwordField = req.body.password;
        const result = await registerSchema.findOne({email:emailField});
        if(result==null){
            res.status(400).send("invalid email");
        }else{
            if(bcrypt.compareSync(passwordField, result.password)){
                res.status(200).sendFile(path.join(__dirname,"../views/afterRegister.html"));
            }else{
                res.status(400).send("invalid password");
            }
        }
    } catch (error) {
        res.status(400).send("error");
    }
}

const postForget = async (req,res) => {
    try{
        const emailField = req.body.email;
        const securityQuestionField = req.body.securityQuestion;
        const result = await registerSchema.findOne({email:emailField});
        if(result==null){
            res.status(400).send("invalid email");
        }else{
            if(bcrypt.compareSync(securityQuestionField, result.securityQuestion)){
                res.status(200).sendFile(path.join(__dirname,"../views/newPassword.html"));
            }else{
                res.status(400).send("incorrect answer");
            }
        }
    }catch (error) {
        res.status(400).send("some error occured");
    }
}

const postNewRegister = async(req,res)=>{
    const emailField = req.body.email;
    const newPasswordField = req.body.newPassword ;
    const confirmNewPasswordField = req.body.confirmNewPassword;
    if(newPasswordField === confirmNewPasswordField){ 
        let existence = await registerSchema.findOne({email:emailField});
        if(existence != null){
            const result = await registerSchema.updateOne({email:emailField},{password:bcrypt.hashSync(newPasswordField, salt)})
            console.log(result);     
            res.status(400).sendFile(path.join(__dirname,"../views/login.html"));
        }else{
            res.status(400).send("invalid email");
        }   
    }
    else{
        res.status(400).send("password doesn't match");
    }    
}

module.exports = { postRegister , postLogin , postForget , postNewRegister };