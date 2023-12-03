"use client";
//usesseion hook to check user currently logged in

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
//userouter hook to navigate back to home
import { useRouter } from "next/navigation";
// importing special profile component which will be reused
import Profile from "@components/Profile";

const MyProfile = () => {
   //declaring router
  const router = useRouter();
  const { data: session } = useSession();

  //creating our posts
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
     //fetching dynamic template endpoint
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
//updating data
      setMyPosts(data);
    };
 
     //fetching in this dynamic session condition
    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  //function to edit post
   //we should pass post to call them
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this page?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = myPosts.filter((item) => item._id !== post._id);

        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name='My'
      desc='Welcome to your  profile page. Here ,you can share all the projects u did and project idea coming in your mind'
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
