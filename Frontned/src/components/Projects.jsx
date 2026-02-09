import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

const Projects = () => {
  const projects = [
    {
      title: "GitaFy",
      subtitle: "AI-Powered Wisdom Giver",
      description: "An AI-powered MERN application using Google Gemini API for emotion analysis and personalized Bhagavad Gita responses.",
      tech: ["React.js", "Node.js", "MongoDB", "Gemini API"],
      link: "https://github.com/yashsahane-eng/Gita-Fy" // Link from resume: 
    },
    {
      title: "WellNest",
      subtitle: "Healthcare Management",
      description: "A Hospital Management System enabling doctors to manage patients, appointments, and prescriptions through a secure digital platform.",
      tech: ["React", "TypeScript", "Tailwind", "Recharts"],
      link: "https://github.com/Purushottamnardewad/WellNest" // Link from resume: 
    },
    {
      title: "Digital Garage System",
      subtitle: "Full-Stack Management",
      description: "Developed a complete garage management platform that eliminated paper-based processes and improved efficiency by 35%.",
      tech: ["React.js", "Node.js", "MongoDB", "Firebase"],
      link: "https://sscarexpert.co.in/" // Link from resume: 
    }
  ];

  return (
    <section id="projects" className="py-24 px-6 bg-slate-950/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center mb-16 space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
            Featured Projects
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className="bg-card/30 border-border/50 backdrop-blur-md transition-all duration-500 hover:border-primary/50 group relative overflow-hidden flex flex-col"
            >
              {/* Subtle background glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl blur opacity-0 group-hover:opacity-10 transition duration-500 -z-10" />
              
              <CardHeader className="space-y-1">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-2xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                </div>
                <p className="text-sm font-medium text-blue-400 uppercase tracking-widest">
                  {project.subtitle}
                </p>
              </CardHeader>
              
              <CardContent className="flex flex-col flex-grow space-y-6">
                <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((t) => (
                    <Badge 
                      key={t} 
                      variant="secondary" 
                      className="bg-slate-800/50 text-[10px] font-mono border-slate-700/50 text-slate-300"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>

                <div className="pt-4">
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <Button 
                      variant="outline" 
                      className="w-full border-border/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded-lg text-sm"
                    >
                      Live | GitHub
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;