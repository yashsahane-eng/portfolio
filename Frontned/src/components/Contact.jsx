// src/components/Contact.jsx
import React from 'react';
import { Button } from "./ui/button";
import { Mail, Github, Linkedin } from "lucide-react";

const Contact = () => {
  return (
    <footer id="contact" className="py-24 px-6 bg-slate-950">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-primary/10 via-transparent to-transparent border border-border/50 p-8 md:p-12 rounded-3xl backdrop-blur-md">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
              Let's Build Something Together
            </h2>
            
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              I'm currently looking for new opportunities in Full-Stack Development and AI. 
              Whether you have a question or just want to say hi, my inbox is always open.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 pt-6">
              {/* Fix: Ensure the href is correctly formatted and target is handled */}
              <Button 
                size="lg" 
                className="rounded-full gap-2 px-8 shadow-lg shadow-primary/20 hover:scale-105 transition-transform" 
                asChild
              >
                <a 
                  href="mailto:yashsahane.skncoe.entc@gmail.com?subject=Portfolio%20Inquiry"
                  target="_top"
                >
                  <Mail className="w-4 h-4" /> Say Hello
                </a>
              </Button>
              
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full border-border/50 hover:bg-slate-900 transition-colors" asChild>
                  <a href="https://github.com/Yash-Sahane" target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full border-border/50 hover:bg-slate-900 transition-colors" asChild>
                  <a href="https://www.linkedin.com/in/yash-sahane-5a6340219" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Classy touch: Add your email as text for easy copy-paste if the button fails */}
            <p className="text-xs text-slate-500 font-mono mt-4">
              yashsahane.skncoe.entc@gmail.com
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;