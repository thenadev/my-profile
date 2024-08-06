import React from "react";
import MyAvatar from "../assets/me.jpg";
import { GithubButton } from "./GithubButton";

export default function Landing() {
  return (
    <div className="items-center h-screen" id="landing">
      <section className="grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-gray-900 h-full items-center">
        <div className="pl-10 pr-10 pt-16">
          <img
            src={MyAvatar}
            className="rounded-full w-auto h-1/2 shadow-lg animate-fadeIn"
            alt="Avatar"
          />
        </div>
        <div className="animate-slideIn">
          <div className="grid py-8 px-4 mx-auto max-w-screen-xl lg:gap-8 xl:gap-0 lg:py-16">
            <div className="place-self-center mr-auto lg:col-span-7">
              <h1 className="mb-4 text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl dark:text-white">
                Hi, I'm Thomas Schwabauer!
              </h1>
              <h2 className="mb-4 text-4xl leading-none md:text-4xl dark:text-white">
                Software Developer
              </h2>
              <p className="mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                Angular, React, Flutter, TypeScript, Kotlin, PHP{" "}
              </p>
              <div className="space-x-5">
                <a
                  href="https://www.linkedin.com/in/thomas-schwabauer-a3a525163/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <button
                    type="button"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    className="inline-block px-6 py-2.5 mb-2 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
                    style={{ backgroundColor: "#0077b5" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="w-4 h-4"
                    >
                      <path
                        fill="currentColor"
                        d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
                      />
                    </svg>
                  </button>
                </a>
                <GithubButton githubLink="https://github.com/tjoooobooo" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
