import React from 'react';

interface SocialLinkProps {
  href: string;
  name: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, name }) => {
  return (
    <div className="flex overflow-hidden relative gap-2.5 justify-center items-start py-2.5 pr-2.5 pl-2.5 w-full ">
      <a href={href} className="z-0 my-auto hover-underline-effect hover:text-white transition duration-300  text-zinc-400">{name}</a>
      <div className="flex absolute bottom-2 z-0 shrink-0 self-start h-0.5 bg-zinc-300 left-[-142px] w-[141px]" />
    </div>
  );
};

export default SocialLink;