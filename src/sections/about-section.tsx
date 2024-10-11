"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import moment from "moment";
import React from "react";

const getAge = () => {
  return moment().diff("1997-06-04", "years");
};

const AboutSection: React.FC = () => {
  return (
    <div
      className="pt-28 z-20 min-h-screen p-5 flex items-center justify-center relative"
      id="about"
    >
      <Card className="max-w-2xl w-full shadow-lg rounded-lg z-30">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-primary">
            About Me
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-left">
            <p className="text-lg text-muted-foreground">
              I'm an analytical and solution-oriented consultant and
              self-motivated software developer with sound knowledge in customer
              support, project management, Angular, TypeScript, Android
              development, and Kotlin, eager to create innovative solutions and
              to continuously improve my skills.
            </p>
            <Separator className="my-4" />
            <p className="text-lg text-muted-foreground">
              During my&nbsp;
              <a href="#work" className="text-blue-500 hover:underline">
                career
              </a>
              , I have worked on various projects, including web applications,
              mobile apps, and backend systems. My skills include React,
              Node.js, TypeScript, and much more.
            </p>
            <Separator className="my-4" />
            <p className="text-lg text-muted-foreground">
              I'm dedicated to continuously learning and improving my skills to
              stay up-to-date with the latest technologies in the field of
              software development!
            </p>
            <Separator className="my-4" />
            <p className="text-lg text-muted-foreground">Age: {getAge()}</p>

            <Button
              className="mt-6 w-full bg-blue-500 rounded shadow-md 
              transition-transform duration-300 transform hover:bg-blue-600 
              hover:scale-105"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Contact Me
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutSection;
