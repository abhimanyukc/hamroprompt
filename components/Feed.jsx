//we show all prompts
//here we display all created prompt in homepage
//get request to get all prompts from database to feed

"use client";

import { useState, useEffect } from "react";
//we use promptcard component in this file
import PromptCard from "./PromptCard";

//creating promptcard list function
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  //update our state with all the posts by creating a new usestate field

  const [allPosts, setAllPosts] = useState([]);

  // Search states
  // defining searchtext using usestate
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    //get response
    //we called api endpoint and we need to create file route.js in folder  api/prommpt
    const response = await fetch("/api/prompt");
     //get data
    const data = await response.json();

    setAllPosts(data);
  };

  //from our feed we have to make get request to our own nextjs API
  useEffect(() => {
    //calling
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

   //declaring handlesearchchange function
  //it gets event
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className='feed'>
       {/* form for search of our feed */}
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        //rendering  promptcardlist component
        <PromptCardList
         //accept data and handletagclick
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
