import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema=mongoose.Schema({
        username:{
            type:String,
            require:true,
            unique:true,
        },
        email:{
            type:String,
            require:true,
            unique:true,
        },
        password:{
            type:String,
            require:true,
        },
        pic:{
            type:String,
            require:true,
            default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
    },
    {
        timestamps:true,
    }
);
//bcrypt the password
// will encrypt password everytime its saved
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  
//   const User = mongoose.model("User", userSchema);

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};

const User=mongoose.model("user",userSchema);

export default User;
