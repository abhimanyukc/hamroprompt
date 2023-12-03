"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdatePrompt = () => {
  const router = useRouter();
    //defining searchparams
  const searchParams = useSearchParams();
   //promptid
  const promptId = searchParams.get("id");

  const [post, setPost] = useState({ prompt: "", tag: "", });
  const [submitting, setIsSubmitting] = useState(false);

  //to get previous data for to edit it we use useeffect hook

  useEffect(() => {
    const getPromptDetails = async () => {
      //defining our endpoint api
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

     //call this function if promptid exists
    if (promptId) getPromptDetails();
     //whenever promptid changes we can get thorugh request query
    //when you go to update prompt you will have special /id
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) return alert("Missing PromptId!");

    try {
      //fetch in specific promptid endpoint
      const response = await fetch(`/api/prompt/${promptId}`, {
       //patch req
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          //we dont need user id here coz we already know who created it.
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
     //pwoer of reusability in react is crazy
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
