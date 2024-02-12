const Vlog = require('../models/Vlog');

const addVlog = async(req, res)=>{
    const newVlog = new Vlog({
        ...req.body
    })
    await newVlog.save();
    return res.code(201).send({
        status:true,
        message:"Vlog added successfully!",
        data:{
            vlog:newVlog
        }
    })
}

const addVlogOpts={
    schema:{
        body:{
            type:'object',
            required:['title', 'videoUrl'],
            properties:{
                title:{
                    type:'string'
                },
                videoUrl:{
                    type:'string'
                }
            }
        }
    },
    handler:addVlog
}


const updateVlog = async (req, res) => {
    const result = await Vlog.findByIdAndUpdate(
      { _id: req.body._id },
      {
        $set: {
          ...req.body,
        },
      },
      {
        new: true,
      }
    );
  
    if (result) {
      return res.code(200).send({
        status:true,
        message:"Vlog Updated successfully",
        data:{
          updatedVlog: result
        }
      })
    }
    else{
      return res.code(500).send({
        status:false,
        message:"Please try again after some time.",
        data:{
          updatedVlog: result
        }
      })
    }
  };
  

  const updateVlogOpts = {
    handler: updateVlog,
  };
  

const getVlogs= async(req, res)=>{
    const allVlog = await Vlog.find();
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 20;
    const totalPage = Math.ceil(allVlog.length/pageSize);
    const getVlog = await Vlog.find().sort({createdAt:-1}).skip((page-1)*pageSize).limit(pageSize);
    return res.code(200).send({
        status:true,
        message:"Vlog fetched successfully!",
        data:{
            currentPage:page,
            vlog: getVlog,
            totalPage
        }
    })
}
const getVlogOpts={
    handler:getVlogs
}

const getSingleVlog = async(req, res)=>{
    const vlogId = req.params.id;
    const vlog = await Vlog.findOne({_id:vlogId});
    if(vlog){
      return res.code(200).send({
        status:true,
        message:"Vlog fetched successfully!",
        data:{
          vlog:vlog
        }
      })
    }
    else{
      return res.code(404).send({
        status:false,
        message:"Vlog not found",
        data:{
          vlog:{}
        }
      })
    }
  }

  const getSingleVlogOpts={
    handler:getSingleVlog
  }

  const deleteVlog = async(req, res)=>{
    const {id}=  req.body;
    const result = await Vlog.findByIdAndDelete(id);
    if(result)
    {
      return res.code(200).send({
        status:true,
        message:"Vlog deleted successfully!",
      })
    }
    else{
      return res.code(404).send({
        status:false,
        message:"Vlog not found!"
      })
    }
  }
  
  const deleteVlogOpts={
    handler:deleteVlog
  }

module.exports={
    addVlogOpts,
    getVlogOpts,
    getSingleVlogOpts,
    deleteVlogOpts,
    updateVlogOpts
}