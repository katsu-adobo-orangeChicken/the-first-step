import { useState } from 'react';


function MyButton() {
    return (
        <button className="px-1.25 py-1 text-white bg-gray-500 rounded-lg hover:bg-white hover:text-gray-500 transition-colors">Neither</button>
    );
}

function YesButton() {
    return (
        <button className="bg-red-500 text-white hover:bg-blue-500 hover:text-black rounded-lg px-1.25 py-1 transition-colors">Yes</button>
    );
}


function NoButton() {
    return (
        <button className="bg-blue-500 text-white hover:bg-red-500 hover:text-black rounded-lg px-1.25 py-1 transition-colors">No</button>
    );
}

export default function CareerCatalogPage() {
    const [userInput, setUserInput] = useState(null);
    
    
    let buttonType;
    if (userInput == "Yes") {
        buttonType = <YesButton />;
    }
    else if (userInput == "No"){
        buttonType = <NoButton />;
    }
    else {
        buttonType = <MyButton />;
    }
    
    
    
    
    // This is where JSX should go!
    return (
    <section className="w-screen p-8 border border-slate-800 rounded-2xl bg-slate-900/70">
        <h1 className="text-white text-2xl">This should be the project catalog page</h1>
        
        <p>Are you older than 18 years old?</p>
        {buttonType}

    </section>
  );
}



