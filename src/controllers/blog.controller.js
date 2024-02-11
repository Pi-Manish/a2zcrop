const Blog = require("../models/Blog");

const createBlog = async (req, res) => {
  const newBlog = await Blog.create(req.body);
  if (newBlog.isPublish) {
    await sendEmailToAllSubscriber();
  }
  if (newBlog) {
    return res.code(201).send({
      status: true,
      message: "Blog created successfully!",
      data: {
        blog: newBlog,
      },
    });
  } else {
    return res.code(500).send({
      status: false,
      message: "Please try again after some time",
      data: {},
    });
  }
};

const sendEmailToAllSubscriber = () => {
  console.log("working...");
};
const createBlogOpts = {
  schema: {
    body: {
      type: "object",
      required: ["title", "description"],
      properties: {
        title: {
          type: "string",
        },
        description: {
          type: "string",
        },
      },
    },
  },
  handler: createBlog,
};

const updateBlog = async (req, res) => {
  const result = await Blog.findByIdAndUpdate(
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
    if (req.body?.isPublish) {
      await sendEmailToAllSubscriber();
    }
    return res.code(200).send({
      status:true,
      message:"Blog Updated successfully",
      data:{
        updatedBlog: result
      }
    })
  }
  else{
    return res.code(500).send({
      status:false,
      message:"Please try again after some time.",
      data:{
        updatedBlog: result
      }
    })
  }
};

const updateBlogOpts = {
  schema:{
    body:{
      type:'object',
      required:['id'],
      properties:{
        id:{
          type:'string'
        }
      }
    }
  },
  handler: updateBlog,
};

const getBlogs=async(req, res)=>{
    const allBlogs = await Blog.find();
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 20;
    const totalPage = Math.ceil(allBlogs.length/pageSize);
    const getBlogs = await Blog.find().skip((page-1)*pageSize).limit(pageSize);
    return res.code(200).send({
        status:true,
        message:"Blogs fetched",
        data:{
            currentPage:page,
            Subscriber: getBlogs,
            totalPage
        }
    })
}

const getBlogsOpts={
  handler: getBlogs
}

const getSingleBlog = async(req, res)=>{
  const blogId = req.params.id;
  // console.log(blogId)
  const blog = await Blog.findOne({_id:blogId});
  if(blog){
    return res.code(200).send({
      status:true,
      message:"Blog fetched successfully!",
      data:{
        blog:blog
      }
    })
  }
  else{
    return res.code(404).send({
      status:false,
      message:"Blog not found",
      data:{
        blog:{}
      }
    })
  }
}
const getSingleBlogOpts={
  handler:getSingleBlog
}

const deleteBlog = async(req, res)=>{
  const {id}=  req.body;
  const result = await Blog.findByIdAndDelete(id);
  if(result)
  {
    return res.code(200).send({
      status:true,
      message:"Blog deleted successfully!",
    })
  }
  else{
    return res.code(404).send({
      status:false,
      message:"Blog not found!"
    })
  }
}

const deleteBlogOpts={
  handler:deleteBlog
}
module.exports = {
  createBlogOpts,
  updateBlogOpts,
  getBlogsOpts,
  getSingleBlogOpts,
  deleteBlogOpts
};

