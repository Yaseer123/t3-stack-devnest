import { useEffect, useRef, useState } from "react";
import Card from "./card";

const Aboutus: React.FC = () => {
  const [visibleWords, setVisibleWords] = useState(0);
  const textRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const wordsPerBatch = 1; // Reveal one word at a time
  const delayBetweenWords = 200; // Delay between revealing words

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const revealWords = () => {
              setVisibleWords((prev) => Math.min(prev + wordsPerBatch, textRefs.current.length));
              if (visibleWords < textRefs.current.length) {
                timeoutId = setTimeout(revealWords, delayBetweenWords); // Reveal words with delay
              }
            };
            revealWords();
          }
        });
      },
      { threshold: 0.1 }
    );

    const targetElement = document.getElementById("about-us-text");
    if (targetElement) observer.observe(targetElement);

    return () => {
      if (targetElement) observer.unobserve(targetElement);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [visibleWords]);

  const textLines = [
    "Founded on the principles of creativity,",
    "collaboration, and excellence, AIXOR is a diverse",
    "team of industry experts dedicated to delivering",
    "outstanding results..."
  ];

  return (
    <>
      <div className="flex flex-col items-center py-16 pr-20 pl-4 max-md:pr-5">
        {/* Section Title */}
        <div className="flex gap-2 self-start text-xl text-white">
          <div className="flex shrink-0 my-auto w-4 bg-neutral-600 h-[15px]" />
          <div>About us</div>
        </div>

        {/* Glowing Words with Left Alignment */}
        <div id="about-us-text" className="flex flex-col items-start mt-16 max-w-full text-6xl font-bold w-[915px] max-md:mt-10">
          {textLines.map((line, lineIndex) => (
            <div key={lineIndex} className="my-4">
              {line.split(" ").map((word, wordIndex) => {
                const index = lineIndex * line.split(" ").length + wordIndex;
                return (
                  <span
                    key={index}
                    className={`scroll-text ${index < visibleWords ? "glow-up" : ""}`}
                    ref={(el) => {
                      textRefs.current[index] = el;
                    }}
                  >
                    {word}&nbsp;
                  </span>
                );
              })}
            </div>
          ))}
        </div>

        {/* Cards Section */}
        <div className="flex flex-wrap gap-10 justify-between items-center mt-20 w-full text-white max-w-[1097px] max-md:mt-10 max-md:max-w-full">
          <Card
            title="Completed Projects"
            value="25K+"
            imageSrc="https://cdn.builder.io/api/v1/image/assets%2F9ec9eabe66804d1aaf868c725baa037c%2F15f8e62b2c8248b79e04d8780157f317"
          />
          <Card
            title="Satisfied Clients"
            value="4M+"
            imageSrc="https://cdn.builder.io/api/v1/image/assets%2F9ec9eabe66804d1aaf868c725baa037c%2Fd91682a919d84ea29724dcd313aac08c"
          />
          <Card
            title="Years Experience"
            value="12+"
            imageSrc="https://cdn.builder.io/api/v1/image/assets%2F9ec9eabe66804d1aaf868c725baa037c%2F357a264d56e1460cb54e1ec4878e5cb3"
          />
        </div>
      </div>

      <style jsx>{`
        .glow-up {
          transition: all 1s ease-in-out;
          color: #ffffff;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
        }
        .scroll-text {
          opacity: 0;
          transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
        }
        .glow-up.scroll-text {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </>
  );
};

export default Aboutus;
