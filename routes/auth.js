const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const {registerValidation, loginValidation} = require('../validation')


router.post('/register', async (req,res) =>{

    // Validation
    const {error} = registerValidation(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return
    } 

    // Duplication check
    const emailExist = await User.findOne({email: req.body.email})
    if(emailExist){
        res.status(400).send("Account already exists whit this email")
        return;
    }

    // Hash
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try{
        const savedUser = await user.save();
        res.send({user_id: savedUser._id} )
    }catch(err){
        res.status(400).send(err)
    }
})


router.post('/login', async (req, res) =>{

    // Validation
    const {error} = loginValidation(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return
    } 

    // Check if user exists
    const user = await User.findOne({email: req.body.email})
    if(!user){
        res.status(400).send("Account does not exist")
        return;
    }

    // Password check
    const passwordValid = await bcrypt.compare(req.body.password, user.password);
    if(!passwordValid){
        res.status(400).send("Wrong password")
        return;
    }

    // Create JWT
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token)


    //res.send("Logged in as "+user.name+'!')
})

module.exports = router