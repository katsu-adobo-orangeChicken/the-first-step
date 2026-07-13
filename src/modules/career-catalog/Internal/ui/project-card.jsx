export default function ProjectCard( { projectObject} ) {
   
    function handleProjectClicks() {
        alert("A project has been clicked, should redirect to that specific 'WIP' page.");
    }

    const difficultyColors = {
        Beginner: "text-green-600",
        Intermediate: "text-orange-600",
        Advanced: "text-red-600"
    }

    return (

    <div className="flex flex-col h-full bg-gray-300 rounded-xl shadow-md overflow-hidden border border-slate-200 hover:shadow-lg transition-shadow duration-300" onClick={handleProjectClicks}>

        <div className="h-48">
            {/* Image Container */}
            <img 
                src={projectObject.imageURL} 
                alt={projectObject.title} 
                className="w-full h-40 object-cover" 
            />
        </div>
        
        {/* Content Container */}
        <div className="p-5">
            <h3 className="text-lg font-bold text-slate-900 mb-2">{projectObject.title}</h3>
            <h4 className={`text-sm font-bold ${difficultyColors[projectObject.difficulty]}`}>
                {projectObject.difficulty}
            
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">{projectObject.description}</p>

            <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="rounded-md bg-slate-100 px-2 py-1 font-medium text-slate-700">
                    Team: {projectObject.teamSize}
                </span>

                <span className="rounded-md bg-blue-50 px-2 py-1 font-medium text-black">
                    {projectObject.category.join(', ')}
                </span>

                <span className="w-full mt-1 text-slate-700 italic">
                    Outcome: {projectObject.finalOutcome}
                </span>
            </div>
        </div>
    </div>
  );
}
