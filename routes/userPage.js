const router = require('express').Router();
const verify = require('./verifyToken')
const User = require('../model/User');
const Page = require('../model/Page');

router.get('/', verify , async (req,res)=>{
    const user = await User.findById(req.user._id);

    const pages = await Page.find({owner: user._id});

    res.send(pages);
})

module.exports = router;