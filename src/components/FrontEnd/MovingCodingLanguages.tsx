import React from 'react';

const AutoScrollLogos: React.FC = () => {
  return (
    <>
      <div className="logo-container overflow-hidden relative w-full">
        <div className="scroll-parent">
          <div className="scroll-element primary border border-gray-400">
            <img src="https://cdn.builder.io/api/v1/image/assets%2F9ec9eabe66804d1aaf868c725baa037c%2Faa65a0ff0ef944c3b19812c359b03614" alt="Logo 1" />
            <img src="https://cdn.builder.io/api/v1/image/assets%2F9ec9eabe66804d1aaf868c725baa037c%2F1f43b339dff1427693873be91c8b68d7" alt="Logo 2" />
            <img src="https://cdn.builder.io/api/v1/image/assets%2F9ec9eabe66804d1aaf868c725baa037c%2F6db3c5b57fee474693293c2f23155090" alt="Logo 3" />
            <img src="https://cdn.builder.io/api/v1/image/assets%2F9ec9eabe66804d1aaf868c725baa037c%2F8d4ee383724d4d269a2a16a8a7e179b6" alt="Logo 4" />
            <img src="https://cdn.builder.io/api/v1/image/assets%2F9ec9eabe66804d1aaf868c725baa037c%2F0b041bb98a6f4db584344c493b14689a" alt="Logo 5" />
            <img src="https://cdn.builder.io/api/v1/image/assets%2F9ec9eabe66804d1aaf868c725baa037c%2F5eeb4d8e097d4a598c4a31be0ac844db" alt="logo 6" />
          </div>
          <div className="scroll-element secondary">
          <img src="https://cdn.builder.io/api/v1/image/assets%2F9ec9eabe66804d1aaf868c725baa037c%2Faa65a0ff0ef944c3b19812c359b03614" alt="Logo 1" />
            <img src="https://cdn.builder.io/api/v1/image/assets%2F9ec9eabe66804d1aaf868c725baa037c%2F1f43b339dff1427693873be91c8b68d7" alt="Logo 2" />
            <img src="https://cdn.builder.io/api/v1/image/assets%2F9ec9eabe66804d1aaf868c725baa037c%2F6db3c5b57fee474693293c2f23155090" alt="Logo 3" />
            <img src="https://cdn.builder.io/api/v1/image/assets%2F9ec9eabe66804d1aaf868c725baa037c%2F8d4ee383724d4d269a2a16a8a7e179b6" alt="Logo 4" />
            <img src="https://cdn.builder.io/api/v1/image/assets%2F9ec9eabe66804d1aaf868c725baa037c%2Fc11791be67d44adb8f3f51253566268c" alt="Logo 5" />
            <img src="https://cdn.builder.io/api/v1/image/assets%2F9ec9eabe66804d1aaf868c725baa037c%2F5eeb4d8e097d4a598c4a31be0ac844db" alt="logo 6" />

          </div>
        </div>
      </div>

      <style jsx>{`
        *,
        *::after,
        *::before {
          margin: 0;
          padding: 0;
          border: none;
          outline: none;
          box-sizing: border-box;
        }

        html {
          font-size: 10px;
        }

        .container {
          display: flex;
          align-items: center;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
        }

        .scroll-parent {
          position: relative;
          width: 100vw;
          height: 30rem;
          padding: 2rem 0;
          overflow-x: hidden;
        }

.scroll-element {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0%;
  top: 0%;
  display: flex;
  align-items: center;
  justify-content: space-around; /* Changed to space-around for better distribution */
  gap: 1rem; /* Reduced gap to a smaller value */
}


        .scroll-element img {
          width: 12rem;
          height: auto;
        }

        .primary {
          animation: primary 30s linear infinite; /* Slower animation */
        }

        .secondary {
          animation: secondary 30s linear infinite; /* Slower animation */
        }

        @keyframes primary {
          from {
            left: 0%;
          }
          to {
            left: -100%;
          }
        }

        @keyframes secondary {
          from {
            left: 100%;
          }
          to {
            left: 0%;
          }
        }
      `}</style>
    </>
  );
};

export default AutoScrollLogos;
