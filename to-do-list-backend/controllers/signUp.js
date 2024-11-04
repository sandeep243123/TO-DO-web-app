const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.signup = async(req, res) =>{
    try{
        const {name, email, password, createdAt} = req.body;

        const info = {
            name, 
            email,
            password: undefined,
            createdAt
        }
        const existedUser = await User.findOne({email});
        if(existedUser){
            return res.status(400).json(
                {
                    success: false,
                    message: "User already exist",
                }
            )
        }

        let hashPassword;
        try{
            hashPassword = await bcrypt.hash(password, 10);
        }catch(err){
            res.status(500).json(
                {
                    success: false,
                    message:'error',
                    error:err
                }
            )
        }

        const savedUser = await User.create({name, email, password:hashPassword,})
        return res.status(200).json(
            {
                success: true,
                data: info,
                message:"Account created successfully"
            }
        )

    }catch(err){
        console.error(err)
        res.status(500).json(
            {
                success:false,
                message: "User can not be registerd, please try again"
            }
        )
    }
}