import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

//those params get populated if you pass dynamic variable into the URL

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        //get posts from specific creator
        const prompts = await Prompt.find({ creator: params.id }).populate("creator")

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
} 