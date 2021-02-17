const router = require('express').Router();
const Page = require('../model/Page');
const User = require('../model/User');
const verify = require('./verifyToken')


router.get('/',verify, async (req,res)=>{
    const page = await Page.findById(req.body._id);
    res.send(page.title);
})

router.post('/create', verify, async (req,res) =>{

    // Check if user exists
    const validUser = req.user._id == req.body.owner;
    if(!validUser){
        res.status(400).send("Invalid user id")
        return;
    }

    const page = new Page({
        owner : req.body.owner,
        title: req.body.title,
        content: req.body.content
    });

    try{
        const savedPage = await page.save();
        res.send({page_id: savedPage._id} )
    }catch(err){
        res.status(400).send(err)
    }
})

router.get('/get', async (req, res) =>{
    const page = await Page.findById(req.body.id);
    res.send(page.content);
})



module.exports = router;