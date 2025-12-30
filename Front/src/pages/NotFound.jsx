import React from 'react';

const NotFound = () => {
    return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center overflow-hidden font-sans">
      <div className="relative w-full max-w-lg aspect-square flex flex-col items-center justify-center">
        
        {/* Background "404" Text */}
        <h1 className="absolute text-[12rem] font-black text-slate-200 select-none z-0">
          404
        </h1>

        {/* UFO Wrapper - Handles the hovering motion */}
        <div className="relative z-20 animate-hover">
          
          {/* UFO Body */}
          <div className="relative">
            {/* Top Dome */}
            <div className="w-24 h-12 bg-slate-800 rounded-t-full mx-auto translate-y-2 border-b-4 border-slate-700"></div>
            {/* Main Saucer */}
            <div className="w-48 h-16 bg-slate-900 rounded-full flex items-center justify-around px-4 border-b-8 border-slate-950">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse delay-75"></div>
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse delay-150"></div>
            </div>
          </div>

          {/* Light Beam */}
          <div 
            className="w-40 h-64 bg-linear-to-b from-blue-400/30 to-transparent mx-auto -mt-2.5"
            style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' }}
          >
            {/* The Beaming Document */}
            <div className="w-12 h-16 bg-white shadow-lg rounded-sm mx-auto flex flex-col p-2 gap-1 animate-beam-up">
               <div className="h-1 w-full bg-slate-200"></div>
               <div className="h-1 w-3/4 bg-slate-200"></div>
               <div className="h-1 w-full bg-slate-200"></div>
            </div>
          </div>
          </div>

          {/* Bottom Text Content */}
        <div className="mt-8 text-center z-30">
          <h2 className="text-2xl font-bold text-slate-800">Look's like we have a problem</h2>
          <p className="text-slate-500 mt-2">The page you're looking for was abducted.</p>
          <button
            onClick={() => (window.location.href = '/')}
            className="mt-6 px-6 py-2 rounded-full font-semibold text-white bg-[#1F6FEB] hover:bg-[#195CC7] shadow-lg shadow-[#1F6FEB33] transition"
          >
            Go home
          </button>
        </div>

      </div>

      {/* Custom Styles for Keyframes */}
      <style jsx>{`
        @keyframes hover {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes beam-up {
          0% { transform: translateY(180px) scale(1); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(0px) scale(0.2); opacity: 0; }
        }
        .animate-hover {
          animation: hover 3s ease-in-out infinite;
        }
        .animate-beam-up {
          animation: beam-up 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFound;