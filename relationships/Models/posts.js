const mongoose = require('mongoose');
const {Schema} = mongoose;

 main().then(()=>{console.log("connection successful")}).catch((err)=>console.log(err))
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

const userSchema = new Schema({
    username : String,
    email:String
});

const postSchema = new Schema({
    content: String,
    likes : Number,
    user : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }
})
const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

// const addData = async() => {
//     // let user1 = new User ({
//     //     username : 'Rahul kumar',
//     //     email : 'rahul@gmail.com'
//     // })
//     // already created user1 so this time we will extract it for post2

//     let user = await User.findOne({username:'Rahul kumar'});

//     let post2 = new Post({
//         content : "Bye Bye",
//         likes : 20

//     })
//     post2.user = user;

//     await user.save();
//     await post2.save();
// }
// addData();

const getData = async() => {
    let result = await Post.findOne({}).populate("user");
    console.log(result);
}
getData();