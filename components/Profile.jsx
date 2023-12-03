//it is reusable profile component
import PromptCard from "./PromptCard";

//get all props we passed
const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    //wrapping everything in a section
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='desc text-left'>{desc}</p>

      <div className='mt-10 prompt_layout'>
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
             //if handledit exist call handle edit function and pass in that post
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
