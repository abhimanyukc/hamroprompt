//since we dont have any user, we'll have to create a function to create one and add it to the database that we just connected to
    //for this we create model based on which document of user will be created

import { Schema, model, models } from 'mongoose';
   //help to interact with mongodb database
const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },
  image: {
    type: String,
  }
});

//the "models" object provided by mongoose library and stores all the registered models
  //if a model named "User already exists in the models object, it assigns the existing model to the "User" variable.and prevent redefining the model
  //if a model named "User" does not exist in "models" object ,the "model" function from mongoose is called to create a new model
  //the newly created model is assigned to the "User" variable.
  //due to this route called every time and connection established every single time from scratch.

const User = models.User || model("User", UserSchema);

export default User;