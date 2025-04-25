import React from "react";

const projects = [
  { title: "Easy Harvesting", image: "/src/Images/ProjectP1.jpg" },
  { title: "Agriculture Farming", image: "/src/Images/ProjectP2.jpg" },
  { title: "Ecological Farming", image: "/src/Images/ProjectP3.jpg" },
  { title: "Organic Solutions", image: "/src/Images/ProjectP4.jpg" },
  { title: "Fresh Products", image: "/src/Images/ProjectP5.jpg" },
  { title: "Healthy Food", image: "/src/Images/ProjectP6.jpg" },
];

const Projects = () => {
  return (
    <>
      {/* Banner Section */}
      <div className="relative h-64">
        <img src="/src/Images/Project.jpg" alt="Services" className="w-full h-full object-cover" />
      </div>

      
      {/* Projects Grid Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {projects.map((project, index) => (
              <div key={index} className="relative group overflow-hidden rounded-2xl shadow-lg w-[85%] mx-auto h-[380px]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-[320px] object-cover transform transition duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-2 left-0 right-0 bg-green-700 bg-opacity-50 p-4 transition duration-300 hover:bg-green-800 hover:scale-105 cursor-pointer">
                  <a href="#" className="text-white text-lg font-semibold block">{project.title}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
