import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { cn } from "../lib/utils";

const Experience = () => {
  const experiences = [
    {
      role: "Web Application Developer Intern",
      company: "Cordon Technologies Pvt. Ltd",
      duration: "Feb 2025 - June 2025",
      details: [
        "Built a full-stack digital garage management system for a car service station client, eliminating paper-based processes.",
        "Developed responsive web and mobile interfaces using React.js and React Native with strong UI/UX design.",
        "Implemented backend using Node.js and Firebase for real-time synchronization and push notifications."
      ],
      current: true
    },
    {
      role: "UI/UX Intern",
      company: "CampusWing",
      duration: "Sep 2024 - Dec 2024",
      details: [
        "Designed intuitive user experiences for mobile applications using wireframes and high-fidelity Figma prototypes.",
        "Maintained and updated design systems and style guides for consistency across platforms.",
        "Conducted user research and usability testing to inform design decisions and improve workflows."
      ],
      current: false
    }
  ];

  return (
    <section id="experience" className="py-24 px-6 bg-slate-950/50">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center mb-16 space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Experience
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full" />
        </div>

        <div className="grid gap-8">
          {experiences.map((exp, index) => (
            <Card 
              key={index} 
              className={cn(
                "bg-card/30 border-border/50 backdrop-blur-md transition-all duration-300 hover:border-primary/50 group",
                exp.current && "border-primary/40 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
              )}
            >
              <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4">
                <div className="space-y-1">
                  <CardTitle className="text-2xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">
                    {exp.role}
                  </CardTitle>
                  <p className="text-lg font-medium text-blue-400">
                    {exp.company}
                  </p>
                </div>
                <Badge 
                  variant={exp.current ? "default" : "outline"} 
                  className="w-fit h-7 px-4 py-0 text-xs font-semibold uppercase tracking-widest"
                >
                  {exp.duration}
                </Badge>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-slate-400">
                  {exp.details.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm md:text-base leading-relaxed">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;