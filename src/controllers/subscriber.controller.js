const Subscriber = require('../models/Subscriber');

const getAllSubscriber = async(req, res)=>{
    const allSubscribers = await Subscriber.find();
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 20;
    const totalPage = Math.ceil(allSubscribers.length/pageSize);
    const getSubscriber = await Subscriber.find().skip((page-1)*pageSize).limit(pageSize);
    return res.code(200).send({
        status:true,
        message:"All Subscriber fetched",
        data:{
            currentPage:page,
            Subscriber: getSubscriber,
            totalPage
        }
    })
}

const getAllSubscriberOpts = {
    handler:getAllSubscriber
}

const createSubscriber = async(req, res)=>{
    const {email} = req.body;
    const isExits = await Subscriber.findOne({email})
    if(isExits){
        return res.code(200).send({
            status:true,
            message:"Already subscribed",
            data:{
                email : email
            }
        })
    }
    const newSubscriber = new Subscriber({
        email :email
    })
    await newSubscriber.save();
    return res.code(201).send({
        status:true,
        message:"New Subscriber added",
        data:{
            email : email
        }
    })
}

const createSubscriberOpts = {
    handler: createSubscriber
}

module.exports = {
    getAllSubscriberOpts,
    createSubscriberOpts
}