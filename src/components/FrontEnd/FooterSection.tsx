import React, { useEffect, useState } from 'react';
import FooterLink from './FooterLink';
import SocialLink from './SocialLink';
import Button from './button';

const FooterSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger the footer reveal based on scroll position
  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollPosition >= documentHeight - 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <footer className="flex overflow-hidden flex-col py-5 bg-black w-full">
      {/* Footer container */}
      <div className="flex flex-wrap gap-5 justify-between items-start w-full max-md:mr-2 max-md:max-w-full">
        
        {/* Social links section */}
        <div className="flex flex-col mt-1.5 whitespace-nowrap">
          <h3 className="self-start text-base text-stone-700">Social</h3>
          <div className="flex flex-col mt-9 w-full text-xs">
            <SocialLink href="#" name="Instagram" />
            <SocialLink href="#" name="Facebook" />
            <SocialLink href="#" name="Twitter" />
          </div>
        </div>
        
        {/* Contact information section */}
        <div className="flex flex-col text-xl text-white">
          <h3 className="self-center text-base text-stone-700  ${isVisible ? 'translate-y-0' : 'translate-y-full'}">Reach Out To us</h3>
          <div className="flex overflow-hidden relative gap-2.5 justify-center items-start self-center p-2.5 mt-4 whitespace-nowrap">
            <div className="z-0 my-auto hover-underline-effect hover:text-white transition duration-300  text-zinc-400">09808500505</div>
            <div className="flex absolute z-0 shrink-0 self-start h-0.5 bg-zinc-300 bottom-[13px] left-[-141px] w-[141px]" />
          </div>
          <div className="flex overflow-hidden relative gap-2.5 justify-center items-start p-2.5 whitespace-nowrap">
            <div className="z-0 my-auto hover-underline-effect hover:text-white transition duration-300  text-zinc-400 ">devnest@gmail.com</div>
            <div className="flex absolute bottom-2 z-0 shrink-0 self-start h-0.5 bg-zinc-300 left-[-141px] w-[141px]" />
          </div>
          {/* Button */}
          <div className="mx-4 mt-2 max-md:mx-2.5">
            <Button label="Let's Connect" className="w-full" />
          </div>
        </div>
        
        {/* Footer links section */}
        <div className="flex flex-col self-stretch ml-[-10px]"> {/* Adjusted margin to move the links left */}
          <h3 className="text-base text-neutral-700">Company</h3>
          <nav className="flex flex-col mt-3.5 ml-2 w-full text-xs text-white max-md:ml-2.5"> {/* Reduced the margin for better visibility */}
            <FooterLink href="#" name="About Us" />
            <FooterLink href="#" name="Services" />
            <FooterLink href="#" name="Contact" />
            <FooterLink href="#" name="Project" />
          </nav>
        </div>
      </div>
      
      {/* Image container with a gap between the button and the image */}
      <div className="footer-image-container mt-10"> {/* Add margin-top to control the gap */}
        <div className={`w-full relative z-10 transition-transform duration-1000 ease-in-out ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
          <img 
            loading="lazy" 
            src="https://cdn.builder.io/api/v1/image/assets%2F9ec9eabe66804d1aaf868c725baa037c%2F0b719ab27bcc4d5cb3c52196ecfc4bf9" 
            alt="" 
            className="object-contain w-full max-md:max-w-full"
          />
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
