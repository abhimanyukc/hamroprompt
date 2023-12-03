import "@styles/globals.css";

import Nav from "@components/Nav";
//all the providers,the redux toolkit query, 
//usually used files and functionalities they all go in layout.jsx
import Provider from "@components/Provider";
//going to import css to entire appln

//we will be caling navbar in layout.jsx coz we want to 
//reuse it across all our pages

//changing metadata of our appln
export const metadata = {
  title: "YourPrompt",
  description: "Discover & Share AI Prompts",
};

//passing children through props
const RootLayout = ({ children }) => (
    //wrapping everything in html tag
  <html lang='en'>
    <body>
      <Provider>
        <div className='main'>
          <div className='gradient' />
        </div>

        <main className='app'>
          <Nav />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
