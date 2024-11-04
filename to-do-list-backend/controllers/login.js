const User = require('../models/User');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config()


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Account does not exist",
                }
            )
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(500).json({
                success: false,
                message: "Password doesn't Match"
            })
        }

        const payload = {
            name: user.name,
            email: user.email,
            id: user._id,
        }


        // create token

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
        const userObj = user.toObject();
        userObj.token = token;

        return res.cookie('token', token, { maxAge: 2 * 60 * 60 * 1000 }).status(200).json(
            {
                success: true,
                data: user,
                token: token,
                message: "Login Successfully"
            }
        )

    } catch (err) {
        console.error(err);
        return res.status(500).json(
            {
                success: false,
                message: "Something went Wrong, server side error"
            }
        )
    }
}
