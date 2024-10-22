import * as React from "react";

function Navbar() {
  return (
    <div className="flex justify-between items-center py-4 px-6 bg-black text-zinc-600">
      {/* Left side: Devnest logo and text */}
      <div className="flex items-center gap-3">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/91c82e519c01b0ddc05ecf2cb7b336f109a85d119061581d57d0d13ff242ce22?placeholderIfAbsent=true&apiKey=9ec9eabe66804d1aaf868c725baa037c"
          className="object-contain w-12 h-12 rounded-full"
          alt="Devnest logo"
        />
        <div className="hover-text-white">DEVNEST</div> {/* Ensure the text matches the design */}
      </div>

      {/* Center: Navigation Links */}
      <div className="flex gap-8 text-zinc-600">
        {["HOME", "PROJECTS", "INSIGHTS", "SERVICES"].map((item) => (
          <div
            key={item}
            className="hover-underline-effect hover:text-white transition duration-300"
          >
            {item}
          </div>
        ))}
      </div>

      {/* Right side: Phone number and icon with more space */}
      <div className="flex items-center gap-6"> {/* Increased gap to 6 */}
        <div className="hover-underline-effect hover:text-white transition duration-300">
          01635396057
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/362af72d84b89f99170e10d5f79524d05213c0369865bd1843fc16f95bc8f0bd?placeholderIfAbsent=true&apiKey=9ec9eabe66804d1aaf868c725baa037c"
          className="object-contain w-6 h-6 hover-icon-glow"
          alt="Email icon"
        />
      </div>
    </div>
  );
}

export default Navbar;
