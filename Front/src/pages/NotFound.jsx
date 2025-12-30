import React from "react";
import { motion as Motion } from "framer-motion";
import { ArrowLeft, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  // Animation variants for the container entrance
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl"
        />
        <Motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-24 -left-24 w-80 h-80 bg-indigo-100/40 rounded-full blur-3xl"
        />
      </div>

      <Motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-2xl text-center"
      >
        {/* Animated 404 Text */}
        <div className="relative inline-block mb-8">
          <Motion.h1
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-[10rem] md:text-[14rem] font-bold tracking-tighter leading-none select-none bg-clip-text text-transparent bg-linear-to-b from-slate-900 to-slate-400"
          >
            404
          </Motion.h1>

          {/* Glassmorphic decorative ring */}
          <Motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-slate-200/60 rounded-full pointer-events-none"
            style={{
              maskImage: "radial-gradient(circle, black 50%, transparent 70%)",
            }}
          />
        </div>

        {/* Text Content */}
        <Motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight">
            Page not found
          </h2>
          <p className="text-lg text-slate-500 max-w-md mx-auto leading-relaxed">
            The page you're trying to reach doesn't exist or has been moved to a
            new secure location.
          </p>
        </Motion.div>

        {/* CTA Buttons */}
        <Motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Motion.button
            whileHover={{ scale: 1.02, translateY: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-8 py-3.5 cursor-pointer bg-[#1F6FEB] text-white rounded-xl font-medium shadow-lg shadow-blue-600/20 hover:bg-[#195CC7] transition-colors w-full sm:w-auto"
          >
            <LayoutDashboard size={18} />
            Go to Dashboard
          </Motion.button>

          <Motion.button
            whileHover={{ scale: 1.02, translateY: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-8 py-3.5 cursor-pointer bg-white text-slate-700 border border-slate-200 rounded-xl font-medium hover:bg-slate-50 transition-colors w-full sm:w-auto shadow-sm"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Motion.button>
        </Motion.div>

        {/* Floating Data Nodes (Particles) */}
        {[...Array(5)].map((_, i) => (
          <Motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              y: [0, -30, 0],
              x: [0, i % 2 === 0 ? 15 : -15, 0],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            className="absolute hidden md:block w-2 h-2 bg-blue-400 rounded-full blur-[1px]"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 20}%`,
            }}
          />
        ))}
      </Motion.div>
    </div>
  );
};

export default NotFound;
