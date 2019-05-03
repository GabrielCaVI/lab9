const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let postSchema = mongoose.Schema({
	id : {type : Number, required : true, unique : true},
  title : {type : String, required : true},
  content : {type : String, required : true},
  author: {type : String, required : true},
  publishDate: {type : String, required : true}
});

let Posts = mongoose.model('Posts', postSchema);

const ListPosts = {
	get : function(){
		return Posts.find()
			.then(posts => {
				return posts;
			})
			.catch(err => {
				 throw new Error(err);
			});
	} ,
	post : function(newPost){
		return Posts.create(newPost)
			.then(post => {
				return post;
			})
			.catch(err => {
				 throw new Error(err);
			});
	},
	getByAuthor : function(author){
		return Posts.find({author : author})
			.then(post => {
				if (post){
					return post;
				}
				throw new Err("post not found");
			})
			.catch(err =>{
				throw new Error(err);
			});
	},
	put : function(postId, newData){
		return Posts.findOneAndUpdate({id : postId}, { $set: newData }, { new: true })
			.then(post => {
				if (post){
					return post
				}
				throw new Err("Post not found");
			})
			.catch(err =>{
				throw new Error(err);
			});
	},
	delete : function(postId){
		return Posts.findOneAndRemove({id : postId})
			.then(post => {
				if (post){
					return post;
				}
				throw new Err("Post not found");
			})
			.catch(err => {
				throw new Error(err);
			})
	}
}

module.exports = {ListPosts};
