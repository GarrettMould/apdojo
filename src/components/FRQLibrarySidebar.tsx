'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, CheckCircle2, FileText } from 'lucide-react';

export interface FRQItem {
  id: string;
  title: string;
  unit: number;
  totalPoints: number;
  status: 'locked' | 'completed' | 'available';
}

interface FRQLibrarySidebarProps {
  items: FRQItem[];
  selectedId: string;
  onSelect: (id: string) => void;
}

// Container animation variants with stagger
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

// Item animation variants
const itemVariants = {
  hidden: { 
    opacity: 0, 
    x: -20 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};


const FRQLibrarySidebar: React.FC<FRQLibrarySidebarProps> = ({
  items,
  selectedId,
  onSelect,
}) => {
  const getIcon = (status: FRQItem['status']) => {
    switch (status) {
      case 'locked':
        return <Lock className="w-4 h-4 text-gray-500" />;
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'available':
        return <FileText className="w-4 h-4 text-blue-600" />;
    }
  };

  const getXPBadgeClass = (status: FRQItem['status']) => {
    switch (status) {
      case 'locked':
        return 'bg-gray-200 text-gray-500';
      case 'completed':
        return 'bg-yellow-400 text-black border border-black';
      case 'available':
        return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full h-full overflow-y-auto border-r-2 border-black bg-gray-50 p-2"
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: '#9CA3AF #F3F4F6',
      }}
    >
      <style jsx>{`
        ul::-webkit-scrollbar {
          width: 6px;
        }
        ul::-webkit-scrollbar-track {
          background: #F3F4F6;
        }
        ul::-webkit-scrollbar-thumb {
          background: #9CA3AF;
          border-radius: 3px;
        }
        ul::-webkit-scrollbar-thumb:hover {
          background: #6B7280;
        }
      `}</style>
      <AnimatePresence mode="wait">
        {items.map((item) => {
          const isSelected = selectedId === item.id;
          const xpAmount = item.totalPoints * 100;

          return (
            <motion.li
              key={item.id}
              variants={itemVariants}
            >
              <motion.div
                onClick={() => onSelect(item.id)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className={`
                  py-3 px-4 
                  bg-white 
                  border-2 
                  ${isSelected ? 'border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-blue-50' : 'border-transparent hover:border-black'} 
                  rounded-lg 
                  mb-2 
                  cursor-pointer 
                  transition-all
                  flex 
                  items-center 
                  justify-between
                `}
              >
                {/* Left Side - Info */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    {getIcon(item.status)}
                  </div>
                  
                  {/* Text */}
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-[10px] text-gray-500 font-bold uppercase">
                      Unit {item.unit}
                    </span>
                    <span className="text-sm font-bold text-gray-800 truncate max-w-[150px]">
                      {item.title}
                    </span>
                  </div>
                </div>

                {/* Right Side - XP Badge */}
                <div className="flex-shrink-0 ml-2">
                  <span className={`text-xs font-black px-2 py-0.5 rounded-full ${getXPBadgeClass(item.status)}`}>
                    {xpAmount} XP
                  </span>
                </div>
              </motion.div>
            </motion.li>
          );
        })}
      </AnimatePresence>
    </motion.ul>
  );
};

export default FRQLibrarySidebar;

