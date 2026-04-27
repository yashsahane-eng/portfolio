import React from 'react';
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";
import CodingAvatar from "./CodingAvatar";

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen w-full flex items-center justify-center pt-20 overflow-hidden">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content: Text & CTA */}
        <div className="space-y-8 text-left">
          <div className="space-y-4">
            <Badge variant="outline" className="px-4 py-1 border-primary/30 bg-primary/5 text-primary gap-2 rounded-full animate-in fade-in slide-in-from-left-4 duration-1000">
              <Sparkles className="w-3 h-3" /> Oracle Certified Gen-AI Professional
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">
              full-stack <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                AI development .
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed">
              I'm <span className="text-white font-medium">Yash Sahane</span>, an E&TC Engineer 
              bridging the gap between hardware intuition and full-stack AI development. 
              Currently  <span className="text-blue-400">Open to Work</span>.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full px-8 gap-2 group shadow-lg shadow-blue-500/20" asChild>
              <a href="#projects">
                Explore Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8 border-border/50 hover:bg-slate-900" asChild>
              <a href="#contact">Let's Talk</a>
            </Button>
          </div>
        </div>

        {/* Right Content: Stats/Info Cards & Avatar */}
        <div className="relative hidden lg:block">
          {/* Coding Avatar floats in negative space above the cards */}
          <div className="absolute -top-44 -right-4 z-0 hover:scale-105 transition-transform duration-500 origin-bottom">
            <CodingAvatar />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-28 relative z-10">
            <div className="space-y-4 pt-12">
              <div className="p-6 rounded-2xl bg-card/30 border border-border/50 backdrop-blur-md hover:border-primary/50 transition-colors shadow-2xl">
                <h3 className="text-3xl font-bold text-blue-400">100+</h3>
                <p className="text-sm text-slate-500 uppercase tracking-widest font-semibold">DSA Problems</p>
              </div>
              <div className="p-6 rounded-2xl bg-card/30 border border-border/50 backdrop-blur-md hover:border-primary/50 transition-colors shadow-2xl">
                <h3 className="text-3xl font-bold text-emerald-400">Bachelor of Engineering</h3>
                <p className="text-sm text-slate-500 uppercase tracking-widest font-semibold">At Smt.Kashibai Navale College Of Engineering (2026)</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-card/30 border border-border/50 backdrop-blur-md hover:border-primary/50 transition-colors shadow-2xl">
                <h3 className="text-3xl font-bold text-white">MERN</h3>
                <p className="text-sm text-slate-500 uppercase tracking-widest font-semibold">Specialization</p>
              </div>
              <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20 backdrop-blur-md shadow-2xl">
                <div className="flex gap-1 mb-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:0.4s]" />
                </div>
                <p className="text-xs text-slate-400 font-mono">Exploring: GEN AI And NEXT.JS</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;