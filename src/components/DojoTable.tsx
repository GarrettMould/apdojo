"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

// Cell Definition: String = Static Text, Object = Interactive Input
type TableCell = 
  | string 
  | { type: "input"; answer: string; placeholder?: string }; 

interface DojoTableProps {
  headers: string[];
  rows: TableCell[][];
}

export const DojoTable = ({ headers, rows }: DojoTableProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
      
      {/* HEADER ROW */}
      <div 
        className="grid border-b-4 border-black bg-gray-100"
        style={{ gridTemplateColumns: `repeat(${headers.length}, 1fr)` }}
      >
        {headers.map((header, i) => (
          <div key={i} className={`p-4 font-black text-center text-sm md:text-lg uppercase tracking-wider flex items-center justify-center ${i !== headers.length - 1 ? 'border-r-4 border-black' : ''}`}>
            {header}
          </div>
        ))}
      </div>

      {/* BODY ROWS */}
      {rows.map((row, rowIndex) => (
        <div 
          key={rowIndex} 
          className={`grid ${rowIndex !== rows.length - 1 ? 'border-b-4 border-black' : ''}`}
          style={{ gridTemplateColumns: `repeat(${headers.length}, 1fr)` }}
        >
          {row.map((cell, colIndex) => (
            <div key={colIndex} className={`relative flex items-center justify-center p-3 ${colIndex !== headers.length - 1 ? 'border-r-4 border-black' : ''}`}>
              
              {/* RENDER LOGIC: Is it Text or Input? */}
              {typeof cell === "string" ? (
                <span className="font-bold text-lg md:text-xl text-center">{cell}</span>
              ) : (
                <DojoInput answer={cell.answer} placeholder={cell.placeholder} />
              )}
              
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

// SUB-COMPONENT: The "Juicy" Input
const DojoInput = ({ answer, placeholder }: { answer: string; placeholder?: string }) => {
  const [val, setVal] = useState("");
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");

  const checkAnswer = () => {
    // Normalize string: remove $ and spaces to be safe
    const cleanVal = val.replace(/[$,]/g, "").trim();
    const cleanAnswer = answer.replace(/[$,]/g, "").trim();

    if (cleanVal === cleanAnswer) {
      setStatus("correct");
    } else {
      setStatus("wrong");
      setTimeout(() => setStatus("idle"), 1000); // Reset shake after 1s
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[60px]">
      <motion.input
        type="text"
        placeholder={placeholder || "?"}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onBlur={checkAnswer}
        onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
        disabled={status === "correct"}
        
        // ANIMATIONS
        animate={status === "wrong" ? { x: [0, -10, 10, -5, 5, 0] } : {}}
        whileFocus={{ scale: 1.05 }}
        
        className={`w-full max-w-[120px] h-12 text-center text-xl font-bold rounded-xl border-2 outline-none transition-all
          ${status === "idle" ? "bg-gray-50 border-gray-300 focus:border-black focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] placeholder:text-gray-300" : ""}
          ${status === "correct" ? "bg-green-100 border-green-500 text-green-800 shadow-none" : ""}
          ${status === "wrong" ? "bg-red-50 border-red-500 text-red-600" : ""}
        `}
      />
      
      {/* Success Icon Overlay */}
      <AnimatePresence>
        {status === "correct" && (
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1 shadow-sm z-10"
          >
            <Check size={14} strokeWidth={4} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
