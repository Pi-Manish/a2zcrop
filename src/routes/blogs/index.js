const {createBlogOpts, updateBlogOpts,deleteBlogOpts ,getBlogsOpts , getSingleBlogOpts} = require('../../controllers/blog.controller');

function blogRoutes(app, opts , next){
    app.post('/newBlog', {onRequest :[app.auth] , ...createBlogOpts});
    app.post('/updateBlog', {onRequest:[app.auth], ...updateBlogOpts});
    app.get('/getBlogs', getBlogsOpts);
    app.get('/getBlog/:id', getSingleBlogOpts)
    app.post('/deleteBlog', {onRequest:[app.auth], ...deleteBlogOpts})
    next();
}

module.exports = blogRoutes;