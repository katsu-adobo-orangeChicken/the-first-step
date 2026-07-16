import { CareerCatalogPage } from "../modules/career-catalog/PublicAPI";
import { LandingPage } from "../modules/landing-page/PublicAPI";

import { Route, Routes, Link } from "react-router-dom";

export default function App() {
  return (
    
    //Layout Shell, the most outer container for the entire application.
    //These are the default global properties of the website we will use.
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      
      {/*This is the global header for the application, the navigation bar above.*/}
      <header className="border-b border-slate-800 p-6 items-center grid grid-cols-3">
        <h1 className="text-xl font-bold tracking-tight text-white">
          <Link to="/">The First Step</Link>
        </h1>

        <div className="inline-flex gap-6 justify-self-center">
          <Link to="/discover">Discover</Link>
          {/* Placeholder buttons */}
          <h2>About</h2>
          <h3>Projects</h3>
        </div>

        <div className="justify-self-end flex">
          <div className="">
            <h2>Log In</h2>
            <h2>Sign Up</h2>
          </div>

          <div>
            <h2>**Profile Picture Should Be Here**</h2>
          </div>
          
        </div>
      </header>

      {/*The main section where the global layout of the application resides. Doesn't know what is inside but it is in charge of modeling and figuring out how each content should live on the screen*/}
      <main className="flex-1 flex flex-col p-8">
        
        {/*The area to put each modules, these are the components that will be organized or formatted by the main section */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/discover" element={<CareerCatalogPage />} />
        </Routes>
        
        
      </main>
      
      {/* Footer can go here eventually */}
    </div>
  );
}
