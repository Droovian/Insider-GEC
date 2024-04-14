"use client";

import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

interface TeamMemberProps {
  name: string;
  githubLink: string;
  imageSrc: string;
  designation : string;
}

const TeamsData = () => {
  return (
    <>
      <h1 className="text-4xl md:text-5xl font-bold my-8 text-center">
        MEET THE TEAM
      </h1>
      <div className="h-1/2 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 place-items-center justify-center">
        <TeamMember
          name="Dhruv Naik"
          githubLink="https://github.com/droovian"
          imageSrc="/Images/dhruv.jpeg"
          designation = "Project lead and Full Stack Developer"
        />
        <TeamMember
          name="Shivam Gadekar"
          githubLink="https://github.com/gadekar123"
          imageSrc="/Images/shivam.jpg"
          designation = "Full Stack Developer"
        />
        <TeamMember
          name="Joel Alvares"
          githubLink="https://github.com/Introvert2000"
          imageSrc="/Images/joel.JPG"
          designation = "Frontend Developer"
        />
      </div>
    </>
  );
};

const TeamMember = ({ name, githubLink, imageSrc,designation }: TeamMemberProps) => {
  return (
    <motion.div
      className="flex flex-col items-center border border-white hover:border-[#FFBA25] w-1/2 rounded-lg"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="relative w-full h-52 md:h-72 mb-2">
        <Image
          src={imageSrc}
          layout="fill"
          objectFit="cover"
          alt="profile picture"
          className="w-full h-full rounded-lg object-fit object-cover"
        />
      </div>
      <div className="flex gap-2 items-stars justify-between p-3">
                <div className="">
                  <h2 className="font-bold md:text-lg text-sm sm:text-xl">
                    {name}
                  </h2>
                  <h3 className=" font-light text-xs sm:text-sm">
                    {designation}
                  </h3>
                </div>

                <Link
                  href={githubLink}
                  className="hover:text-tangerine"
                  title="GitHub Profile link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub size={20} />
                </Link>
              </div>
    </motion.div>
  );
};

export default TeamsData;
