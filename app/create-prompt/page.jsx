"use client";
//for creating our create prompt page , import usestate hook
import { useState } from "react";
//allow us which user is logged in
import { useSession } from "next-auth/react";
//importing useRouter hook
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreatePrompt = () => {
   //import router
  const router = useRouter();
  //importing session
  const { data: session } = useSession();

  //know about the state are we currently submitting the form
   //usestate hook
  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({
    //containing empty object
    prompt: "", tag: "" });
    
  const createPrompt = async (e) => {
    //to prevent default behavior of browser when submitting a form (i.e to avoid reloading as possible)
    e.preventDefault();
     //to use it as some sort of loader
    setIsSubmitting(true);

        //creating first prompt

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          //pass all of data that we have right here in our frontend to api endpoint above using post request
          prompt: post.prompt,
           //using session to connect currently logged in user to that prompt they are creAting
                //we need to import session
          userId: session?.user.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        //if sucessfully create prompt it gonna be push in homepage
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
     //we have access to all variables which we can pass in our form
    <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      //we are passing createprompt as handle submit
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
