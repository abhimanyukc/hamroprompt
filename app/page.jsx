//unique file that render our homepage
import Feed from "@components/Feed";
//import React from 'react'    not needed in nextjs
const Home = () => (
  //wrap everything in html5 semantic section tag
    //using tailwind class to directly integrate styling element to html tag
    //classname that consist _ coming from own styling within globals.css
  <section className='w-full flex-center flex-col'>
    <h1 className='head_text text-center'>
      Discover & Share
      <br className='max-md:hidden' />
      <span className='orange_gradient text-center'> AI-Powered Prompts</span>
    </h1>
    <p className='desc text-center'>
      Promptopia is an open-source AI prompting tool for modern world to
      discover, create and share creative prompts
    </p>

    <Feed />
  </section>
   //max-md:hidden = we are going to hide in large devices and break the content on smaller devices.
);

export default Home;
