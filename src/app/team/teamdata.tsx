"use client";

import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

interface TeamMemberProps {
  name: string;
  githubLink: string;
  imageSrc: string;
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
        />
        <TeamMember
          name="Shivam Gadekar"
          githubLink="https://github.com/gadekar123"
          imageSrc="/Images/shivam.jpg"
        />
        <TeamMember
          name="Joel Alvares"
          githubLink="https://github.com/Introvert2000"
          imageSrc="/Images/joel.JPG"
        />
      </div>
    </>
  );
};

const TeamMember = ({ name, githubLink, imageSrc }: TeamMemberProps) => {
  return (
    <motion.div
      className="flex flex-col items-center border border-white hover:border-[#FFBA25] w-1/2 rounded-lg"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="relative w-full h-52 md:h-72 mb-4">
        <Image
          src={imageSrc}
          layout="fill"
          objectFit="cover"
          alt="profile picture"
          className="w-full h-full rounded-lg object-fit object-cover"
        />
      </div>
      <div className="flex space-x-4">

      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {name}
    </h2>
      <Link
        href={githubLink}
        className="hover:text-tangerine"
        title="GitHub Profile link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithub size={20} className="mt-2" />
      </Link>
      </div>
    </motion.div>
  );
};

export default TeamsData;
