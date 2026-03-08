import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { cn } from "../lib/utils";
import { 
  Code2, 
  Layers, 
  Cloud, 
  Cpu, 
  Terminal, 
  Workflow 
} from "lucide-react";

const Skills = () => {
  const skillGroups = [
    {
      category: "Specialized Certifications",
      icon: <Cpu className="w-5 h-5 text-blue-400" />,
      skills: [
        "Oracle Cloud Generative AI Professional", 
        "AWS Cloud Practitioner Essentials",
        "Generative AI Professional (Certified)"
      ],
      highlight: true,
      description: "Validated expertise in Large Language Models and Cloud Architecture."
    },
    {
      category: "Languages",
      icon: <Terminal className="w-5 h-5 text-slate-400" />,
      skills: ["JavaScript", "Python", "C++", "SQL", "HTML", "CSS"],
      className: "md:col-span-1"
    },
    {
      category: "Frameworks",
      icon: <Layers className="w-5 h-5 text-slate-400" />,
      skills: ["React.js", "Node.js", "Express.js", "Tailwind CSS", "React Native"],
      className: "md:col-span-1"
    },
    {
      category: "Cloud & DevOps",
      icon: <Cloud className="w-5 h-5 text-slate-400" />,
      skills: ["AWS (EC2/S3)", "Docker", "Firebase", "MongoDB", "Git"],
      className: "md:col-span-2 lg:col-span-1"
    }
  ];

  return (
    <section id="skills" className="py-32 px-6 bg-[#020617] relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-blue-500/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center mb-20 text-center space-y-4">
          <Badge variant="outline" className="border-blue-500/30 text-blue-400 bg-blue-500/5 px-4 py-1">
            Technical Stack
          </Badge>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            Technical Toolbox
          </h2>
          <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">
            Bridging <span className="text-blue-400 italic">Electronics Engineering</span> hardware intuition with 
            <span className="text-white font-medium"> Full-Stack AI excellence</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillGroups.map((group, index) => (
            <Card 
              key={index} 
              className={cn(
                "bg-slate-900/40 border-white/5 backdrop-blur-xl transition-all duration-500 hover:border-blue-500/30 group overflow-hidden relative",
                group.highlight ? "md:col-span-2 lg:col-span-2 bg-blue-500/5 border-blue-500/20" : group.className
              )}
            >
              {/* Internal glow on hover */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-slate-800/50 rounded-lg border border-white/5 group-hover:border-blue-500/50 transition-colors">
                    {group.icon}
                  </div>
                  {group.highlight && (
                    <Badge className="bg-blue-500 text-white hover:bg-blue-600 border-none px-3">
                      Expertise
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {group.category}
                </CardTitle>
                {group.description && (
                  <p className="text-sm text-slate-500 mt-1">{group.description}</p>
                )}
              </CardHeader>

              <CardContent className="flex flex-wrap gap-2 pt-2">
                {group.skills.map((skill) => (
                  <Badge 
                    key={skill} 
                    variant="secondary"
                    className={cn(
                      "px-3 py-1.5 text-xs font-mono transition-all duration-300",
                      group.highlight 
                        ? "bg-blue-500/10 text-blue-300 border-blue-500/20 hover:bg-blue-500 hover:text-white" 
                        : "bg-slate-800/50 text-slate-400 border-white/5 hover:border-slate-500 hover:text-white"
                    )}
                  >
                    {skill}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;