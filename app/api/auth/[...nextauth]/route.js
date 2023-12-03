//within here we can setup our providers such as google authentication
//use of nextjs api routes or backend endpoints alongside using frontendside
//api  route going to handle our entire auth process
//we add all functions needed
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user';
//importing function created in database.js
import { connectToDB } from '@utils/database';
// console.log({
//     clientId: process.env.GOOGLE_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// })

//creating handler, next-auth,importing these things and exporting them in the way that we did.
//check next-auth documentation
//when working with handler u have providers and callbacks
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
     //within callbacks object we keep session and signin function
         //creating session
    async session({ session }) {
      //finally to get data about user every single time to keep and existing and running session
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      //update its id with toString() function
      session.user.id = sessionUser._id.toString();

      return session;
    },
    //signin function, which automatically creates a new user in the database

    async signIn({ account, profile, user, credentials }) {
      try {
        // every nextjs route is serverless 
          //,means it is lambda function that open only when get called
          //so everytime it get called means to spin up server and make your connection to database
        await connectToDB();

        // check if user already exists
        const userExists = await User.findOne({ email: profile.email });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile.email,
            // no space in profile name and uselowercase
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false
      }
    },
  }
})

export { handler as GET, handler as POST }
