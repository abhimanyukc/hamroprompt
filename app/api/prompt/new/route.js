import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
     //grab things we have passed through post request
    const { userId, prompt, tag } = await request.json();

    try {
        //lambda function: means  everytime its going to die once it does its job
        await connectToDB();
        const newPrompt = new Prompt({ creator: userId, prompt, tag });

        
        //to save it on database
        await newPrompt.save();
        
        //return response and specify status 201 which means its created.
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
         //server error
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}
