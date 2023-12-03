import { Schema, model, models } from 'mongoose';

const PromptSchema = new Schema({
   //defining object in Schema function

  creator: {
    //we dont need to import mongoose as we already have schema right here
    type: Schema.Types.ObjectId,
    //one user can create many prompts
    ref: 'User',
  },
  prompt: {
    type: String,
      //required with message
    required: [true, 'Prompt is required.'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required.'],
  }
});
//get the prompt that already exists or create a new model prompt based on promptschema
const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;