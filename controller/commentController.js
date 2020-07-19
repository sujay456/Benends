const Comment=require('../models/comment');
const Post=require('../models/post');
module.exports.Create=(req,res)=>{

    // console.log(req.body);
    // console.log(req.query);
  
    Post.findById(req.query.id,(err,post)=>{
        if(err)
        {
            console.log('Error in finding the post on which u are commenting',err);
            return;
        }

        if(post)
        {
            Comment.create( { 
                content:req.body.content,
                user:req.user.id,
                post:req.query.id },(err,newComment)=>{
                if(err)
                {
                    console.log("Error in creating the comment",err);
                    return;
                }
                post.comment.push(newComment);
                post.save();
                 return res.redirect('back');
                
            });
        }
        
    })

}

module.exports.delete= async (req,res)=>{

    let comment=await Comment.findById(req.query.id);

    if(comment.user==req.user.id)
        {
            let postId=comment.post;
            comment.remove();

            await Post.findByIdAndUpdate(postId,{ $pull:{comment:req.query.id} });
            req.flash('success','comment deleted');

            return res.redirect('back');


        }
        
        else
        {
            req.flash('error','comment can not be deleted');

            return res.redirect('back');

        }
}

module.exports.deleteUnAppro=(req,res)=>{

    Post.findById(req.query.pid,(err,post)=>{
        if(err)
        {
            console.log("Error in finding the post in deleting the comment",err);
            return;
        }
        if(post.user==req.user.id)
        {
            Comment.findById(req.query.cid,(err,comment)=>{
                if(err)
                {
                    console.log("Error in finding the comment to be deleted",err);
                    return;
                }
                let postId=comment.post;
                comment.remove();

                Post.findByIdAndUpdate(postId,{ $pull:{comment:req.query.cid} },(err,post)=>{
                    // As we dont need to do anything with the post so we are just returning from here
                    req.flash('success','comment deleted');
                    return res.redirect('back');
                });
                
            })   
        }
        else
        {
            return res.redirect('back');
            
        }
    });
}
