import { CareerCatalogPage } from "../modules/career-catalog/PublicAPI";

export default function App() {
  return (
    
    //Layout Shell, the most outer container for the entire application.
    //These are the default global properties of the website we will use.
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      
      {/*This is the global header for the application, the navigation bar above.*/}
      <header className="border-b border-slate-800 p-6">
        <h1 className="text-xl font-bold tracking-tight text-white">
          The First Step
        </h1>
      </header>

      {/*The main section where the global layout of the application resides. Doesn't know what is inside but it is in charge of modeling and figuring out how each content should live on the screen*/}
      <main className="flex-1 flex flex-col p-8">
        
        {/*The area to put each modules, these are the components that will be organized or formatted by the main section */}
        <CareerCatalogPage />
        
        
      </main>
      
      {/* Footer can go here eventually */}
    </div>
  );
}