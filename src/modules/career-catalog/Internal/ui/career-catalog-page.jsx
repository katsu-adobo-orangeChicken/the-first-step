import ProjectCard from "./project-card";

import { useState } from 'react'

export default function CareerCatalogPage() {

    const [choseDiscoveryPage, setChoseDiscoveryPage] = useState(false);

    /* Used for search bar */
    const [userSearchInput, setUserSearchInput] = useState('');
    const [appliedSearchTerm, setAppliedSearchTerm] = useState('');

    /* Used for filter button */
    const [keyWordFilter, setKeyWordFilter] = useState('');


    const handleSearchSubmit = () => {
        setAppliedSearchTerm(userSearchInput.trim());
    };

    if (!choseDiscoveryPage) {
        return (
            <div className="flex flex-col items-center gap-4">

                <button className="rounded-2xl bg-gray-500 px-3 py-4 transition hover:bg-gray-300" onClick={() => setChoseDiscoveryPage(true)}>See The Discovery Page Tracks</button>

            </div>
        )
    }
    
    const projects = [
        {
            id: 1,
            title: "Community Food Drive",
            description: "Coordinate volunteers, collect donations, and support local families through a weekend food distribution event.",
            imageURL: "images/community-food-drive.jpg",
            category: ["Community", "Education"],
            difficulty: "Beginner",
            teamSize: "4/8",
            finalOutcome: "Community event plan"

        },
        {
            id: 2,
            title: "Green Park Cleanup",
            description: "Join a neighborhood effort to improve public spaces and raise awareness about sustainability.",
            imageURL: "images/green-park-cleanup.jpg",
            category: ["Community", "Environment"],
            difficulty: "Beginner",
            teamSize: "6/12",
            finalOutcome: "Park cleanup action plan"
            
        },
        {
            id: 3,
            title: "Youth Coding Workshop",
            description: "Mentor students in beginner-friendly coding activities and help them build confidence with technology.",
            imageURL: "images/youth-coding-workshop.jpg",
            category: ["Education", "Technology"],
            difficulty: "Intermediate",
            teamSize: "5/10",
            finalOutcome: "Intro coding workshop curriculum"
        },
        {
            id: 4,
            title: "Local Library Revamp",
            description: "Support a library initiative by organizing books, creating study spaces, and welcoming new visitors.",
            imageURL: "images/library-revamp.jpg",
            category: ["Community", "Education"],
            difficulty: "Beginner",
            teamSize: "3/6",
            finalOutcome: "Library improvement proposal"
        },
        {
            id: 5,
            title: "Community Garden Project",
            description: "Work alongside neighbors to plant, maintain, and harvest produce for shared use.",
            imageURL: "images/community-garden.jpg",
            category: ["Community", "Environment"],
            difficulty: "Beginner",
            teamSize: "7/12",
            finalOutcome: "Seasonal garden maintenance plan"
        },
        {
            id: 6,
            title: "Senior Tech Help Desk",
            description: "Assist older adults with basic device setup, online safety, and digital communication skills.",
            imageURL: "images/senior-tech-helpdesk.jpg",
            category: ["Technology", "Community"],
            difficulty: "Intermediate",
            teamSize: "4/8",
            finalOutcome: "Digital support session guide"
        },
        {
            id: 7,
            title: "Art in the Streets",
            description: "Collaborate with artists and residents to create a mural that celebrates the local community.",
            imageURL: "images/art-in-the-streets.jpg",
            category: ["Arts", "Community"],
            difficulty: "Intermediate",
            teamSize: "5/9",
            finalOutcome: "Public mural concept board"
        },
        {
            id: 8,
            title: "Disaster Relief Support",
            description: "Help prepare supplies, coordinate outreach, and support families affected by sudden emergencies.",
            imageURL: "images/disaster-relief-support.jpg",
            category: ["Community", "Health"],
            difficulty: "Advanced",
            teamSize: "8/14",
            finalOutcome: "Emergency response support plan"
        },
        {
            id: 9,
            title: "After-School Tutoring",
            description: "Provide one-on-one academic support and encourage students to stay engaged in learning.",
            imageURL: "images/after-school-tutoring.jpg",
            category: ["Education", "Community"],
            difficulty: "Beginner",
            teamSize: "4/10",
            finalOutcome: "Tutoring schedule and lesson plan"
        },
        {
            id: 10,
            title: "Neighborhood Storytelling Festival",
            description: "Help plan events, manage logistics, and create a welcoming space for local storytellers and performers.",
            imageURL: "images/storytelling-festival.jpg",
            category: ["Arts", "Community"],
            difficulty: "Intermediate",
            teamSize: "6/10",
            finalOutcome: "Festival run-of-show plan"
        }
    ];


    const projectSections ={
        "Popular": [4,5,6],

        "For You": [2,10,1],

        "New": [3,7,8,9]
    };

    {/* Helper function for the array of IDs to return the actual project objects from the list */}
    
    const getProjectByIDs = (ids) => {
        const normalizedSearch = appliedSearchTerm.toLowerCase();

        return projects.filter(p => 
            ids.includes(p.id) && (normalizedSearch === '' || p.title.toLowerCase().includes(normalizedSearch)) && p.difficulty.toLowerCase().includes(keyWordFilter.toLowerCase())
        );
    };


    /* Global array of each projects */
    const searchResults = projects.filter(p =>
        p.title.toLowerCase().includes(appliedSearchTerm.toLowerCase()) && p.difficulty.toLowerCase().includes(keyWordFilter.toLowerCase())
    );
    
    return (
        <section className="bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
            
            { /* Container for both the 2 main container for the page, the search and the project tracks container */}
            <div className="mx-auto flex max-w-10xl flex-col gap-6">


                {/* The top container which has the search bar as well as filter button */}
                <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="space-y-2">
                            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
                                Discover
                            </p>
                            <h1 className="text-3xl font-semibold text-slate-900">
                                Explore meaningful projects
                            </h1>
                            <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
                                Browse community-driven opportunities and find the perfect place to contribute your skills.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                                <input
                                    type="text"
                                    className="text-sm text-slate-700 bg-transparent outline-none w-full placeholder-slate-400"
                                    placeholder="Search projects"
                                    onChange={(e) => setUserSearchInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                                    value={userSearchInput}
                                />
                            </div>
                            <button
                                type="button"
                                className="rounded-2xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
                                onClick={() => setKeyWordFilter('Beginner')}
                            >
                                Filter
                            </button>
                        </div>
                    </div>
                </div>

                {/* True or False Block, if there is contents in the search bar, the filtered should show a single grid, otherwise show respective sections */}
                {appliedSearchTerm !== '' ? (
                    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-slate-900">Search Results: "{appliedSearchTerm}" </h2>
                            <span className="text-sm text-slate-500">{searchResults.length} projects found</span>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {searchResults.map((project) => (
                                <ProjectCard key={project.id} projectObject={project} />
                            ))}
                        </div>
                    </div>
                ) : (
                    Object.entries(projectSections).map(([sectionName, projectIds]) => {
                        const sectionProjects = getProjectByIDs(projectIds);

                        return (
                            <div key={sectionName} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="text-xl font-semibold text-slate-900">{sectionName}</h2>
                                    <span className="text-sm text-slate-500">{sectionProjects.length} projects</span>
                                </div>
                                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                    {sectionProjects.map((project) => (
                                        <ProjectCard key={project.id} projectObject={project} />
                                    ))}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </section>
    );
}
