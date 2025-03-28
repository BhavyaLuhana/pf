import React, { useState, useEffect } from "react";

const App = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([]);
  const [welcomeText, setWelcomeText] = useState("");
  const fullText = "Welcome to My Portfolio ";

  useEffect(() => {
    let index = 0;
    let isDeleting = false;
    
    const interval = setInterval(() => {
      setWelcomeText((prev) => {
        if (!isDeleting) {
          if (index < fullText.length) {
            index++;
            return fullText.slice(0, index);
          } else {
            isDeleting = true;
            return prev;
          }
        } else {
          if (index > 0) {
            index--;
            return fullText.slice(0, index);
          } else {
            isDeleting = false;
            return prev;
          }
        }
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const commands = {
    help: "Available commands: about, projects, skills, contact, clear",
    about: "Hi, I am Bhavya, a MERN Stack Developer specializing in AI integration. Passionate about building intelligent web applications. Currently working on integrating AI with full-stack development.",
    skills: "React, Node.js, Express, MongoDB, TailwindCSS, APIs, Java",
    contact: "Email: luhanab24@gmail.com | LinkedIn: linkedin.com/in/BhavyaLuhana",
    clear: ""
  };

  const projects = [
    {
      title: "Project Management System",
      description: "A full-stack MERN-based system that allows users to create, update, and manage projects efficiently. It includes a responsive UI built with Chakra UI and supports CRUD operations..",
      tech: "MERN, Chakra UI"
    },
    {
      title: "Log File Explainer Tool",
      description: "A desktop-based AI-powered tool that parses log files and provides human-readable explanations using the OpenAI API. The tool is built using React for the frontend and Express for handling API calls.",
      tech: "React, OpenAI API, Express"
    },
    {
      title: "Regex-based Web Scraper",
      description: "A lightweight web scraper built using Java and Regular Expressions (Regex) to extract relevant data from web pages. Instead of relying on full-fledged libraries like JSoup, this scraper processes raw HTML using regex patterns to extract links, headings, and text content.",
      tech: "Java, Regex"
    }
  ];

  const handleCommand = (e) => {
    if (e.key === "Enter") {
      let cmd = input.trim().toLowerCase();
      if (cmd === "clear") {
        setOutput([]);
      } else if (cmd === "projects") {
        setOutput([...output, { command: cmd, result: "projects" }]);
      } else {
        setOutput([...output, { command: cmd, result: commands[cmd] || "Command not found! Type 'help' for a list of commands." }]);
      }
      setInput("");
    }
  };

  return (
    // Main screen 
    <div className="h-screen bg-black text-green-400 p-5 font-mono">
      <h1 className="text-xl">{welcomeText}</h1>
      <p><span className="text-white">$ </span>Type 'help' to see available commands</p>
      <div className="mt-4 overflow-auto h-[60vh]">
        {output.map((item, index) => (
          <div key={index}>
            <p className="text-white">$ {item.command}</p>
            {item.result === "projects" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {projects.map((project, i) => (
                  <div key={i} className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-bold text-green-400">{project.title}</h2>
                    <p className="mt-2">{project.description}</p>
                    <p className="mt-1 text-sm text-green-300">Tech: {project.tech}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>{item.result}</p>
            )}
          </div>
        ))}
      </div>
      <hr />
      {/* Terminal */}
      <div className="flex items-center mt-2">
        <span className="text-white">$</span>
        <input
          type="text"
          className="bg-black border-none outline-none text-green-400 ml-2 w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          autoFocus
        />
      </div>
    </div>
  );
};

export default App;
