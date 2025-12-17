"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";

interface MonopolyRevenueVisualizerProps {
  onComplete?: () => void;
}

export const MonopolyRevenueVisualizer = ({ onComplete }: MonopolyRevenueVisualizerProps) => {
  const [priceLowered, setPriceLowered] = useState(false);
  const [newRevenue, setNewRevenue] = useState("");
  const [marginalRevenue, setMarginalRevenue] = useState("");
  const [newRevenueStatus, setNewRevenueStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [marginalRevenueStatus, setMarginalRevenueStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [showHint, setShowHint] = useState(false);

  const initialPrice = 50;
  const newPrice = 49;
  const initialCustomers = 3;
  const newCustomerCount = 4;
  const initialRevenue = initialCustomers * initialPrice; // 150
  const correctNewRevenue = newCustomerCount * newPrice; // 196
  const correctMarginalRevenue = correctNewRevenue - initialRevenue; // 46

  const handleLowerPrice = () => {
    setPriceLowered(true);
  };

  const checkNewRevenue = () => {
    const cleanVal = newRevenue.replace(/[$,]/g, "").trim();
    const cleanAnswer = correctNewRevenue.toString();

    if (cleanVal === cleanAnswer) {
      setNewRevenueStatus("correct");
    } else {
      setNewRevenueStatus("wrong");
      setTimeout(() => setNewRevenueStatus("idle"), 1000);
    }
  };

  const checkMarginalRevenue = () => {
    const cleanVal = marginalRevenue.replace(/[$,]/g, "").trim();
    const cleanAnswer = correctMarginalRevenue.toString();

    if (cleanVal === cleanAnswer) {
      setMarginalRevenueStatus("correct");
    } else {
      setMarginalRevenueStatus("wrong");
      setShowHint(true);
      setTimeout(() => {
        setMarginalRevenueStatus("idle");
        setShowHint(false);
      }, 2000);
    }
  };

  const allCorrect = newRevenueStatus === "correct" && marginalRevenueStatus === "correct";

  // Call onComplete when both inputs are correct
  useEffect(() => {
    if (allCorrect && onComplete) {
      const timer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [allCorrect, onComplete]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Instruction */}
      <div className="mb-6 text-center">
        <p className="text-lg font-semibold text-gray-800 mb-2">
          You want to sell to Customer #4, but she will only pay ${newPrice}.
        </p>
        <p className="text-sm text-gray-600">
          Current Revenue: <span className="font-bold">${initialRevenue}</span> ({initialCustomers} × ${initialPrice})
        </p>
      </div>

      {/* Customer Queue */}
      <div className="mb-8">
        <div className="flex items-end justify-center gap-4 flex-wrap">
          {/* Initial 3 Customers */}
          {Array.from({ length: initialCustomers }).map((_, index) => (
            <motion.div
              key={`customer-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              {/* Customer Stick Figure */}
              <div className="relative">
                <div className="w-16 h-20 flex flex-col items-center justify-end">
                  {/* Head */}
                  <div className="w-8 h-8 bg-gray-800 rounded-full mb-1"></div>
                  {/* Body */}
                  <div className="w-6 h-8 bg-blue-500 rounded-t-lg"></div>
                </div>

                {/* Money Bag */}
                <motion.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-yellow-200 border-2 border-yellow-400 rounded-lg px-2 py-1 text-xs font-bold"
                  animate={
                    priceLowered
                      ? {
                          scale: [1, 1.1, 1],
                          backgroundColor: ["#fef3c7", "#fde68a", "#fef3c7"],
                        }
                      : {}
                  }
                  transition={{ duration: 0.5 }}
                >
                  ${priceLowered ? newPrice : initialPrice}
                </motion.div>

                {/* Loss Indicator */}
                <AnimatePresence>
                  {priceLowered && (
                    <motion.div
                      initial={{ opacity: 0, y: 0, scale: 0 }}
                      animate={{ opacity: [1, 1, 0], y: -30, scale: [0, 1.2, 0.8] }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                      className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-red-600 font-bold text-lg"
                    >
                      -$1
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <span className="text-xs text-gray-600 mt-2">Customer {index + 1}</span>
            </motion.div>
          ))}

          {/* New Customer #4 */}
          <AnimatePresence>
            {priceLowered && (
              <motion.div
                initial={{ opacity: 0, x: 50, scale: 0 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex flex-col items-center"
              >
                {/* Green Flash Effect */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [1, 0], scale: [1.5, 2] }}
                  transition={{ duration: 0.6 }}
                  className="absolute w-24 h-24 bg-green-400 rounded-full blur-xl -z-10"
                />
                
                {/* Customer Stick Figure */}
                <div className="relative">
                  <div className="w-16 h-20 flex flex-col items-center justify-end">
                    {/* Head */}
                    <div className="w-8 h-8 bg-gray-800 rounded-full mb-1"></div>
                    {/* Body */}
                    <div className="w-6 h-8 bg-green-500 rounded-t-lg"></div>
                  </div>

                  {/* Money Bag */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-200 border-2 border-green-400 rounded-lg px-2 py-1 text-xs font-bold"
                  >
                    +${newPrice}
                  </motion.div>
                </div>
                <span className="text-xs text-gray-600 mt-2">Customer 4</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Lower Price Button */}
      {!priceLowered && (
        <div className="text-center mb-8">
          <motion.button
            onClick={handleLowerPrice}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-black text-white font-bold text-lg rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 transition-all"
          >
            Lower Price to ${newPrice}
          </motion.button>
        </div>
      )}

      {/* Input Dashboard */}
      {priceLowered && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 border-4 border-black rounded-2xl p-6 space-y-4"
        >
          <h3 className="text-xl font-bold text-center mb-4">Calculate the Results</h3>
          
          {/* New Revenue Input */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              New Revenue:
            </label>
            <div className="relative">
              <motion.input
                type="text"
                value={newRevenue}
                onChange={(e) => setNewRevenue(e.target.value)}
                onBlur={checkNewRevenue}
                onKeyDown={(e) => e.key === "Enter" && checkNewRevenue()}
                disabled={newRevenueStatus === "correct"}
                animate={
                  newRevenueStatus === "wrong"
                    ? { x: [0, -10, 10, -5, 5, 0] }
                    : {}
                }
                placeholder="?"
                className={`w-full max-w-[200px] mx-auto h-12 text-center text-xl font-bold rounded-xl border-2 outline-none transition-all block
                  ${
                    newRevenueStatus === "idle"
                      ? "bg-white border-gray-300 focus:border-black focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                      : newRevenueStatus === "correct"
                      ? "bg-green-100 border-green-500 text-green-800"
                      : "bg-red-50 border-red-500 text-red-600"
                  }
                `}
              />
              <AnimatePresence>
                {newRevenueStatus === "correct" && (
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
          </div>

          {/* Marginal Revenue Input */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Marginal Revenue:
            </label>
            <div className="relative">
              <motion.input
                type="text"
                value={marginalRevenue}
                onChange={(e) => setMarginalRevenue(e.target.value)}
                onBlur={checkMarginalRevenue}
                onKeyDown={(e) => e.key === "Enter" && checkMarginalRevenue()}
                disabled={marginalRevenueStatus === "correct"}
                animate={
                  marginalRevenueStatus === "wrong"
                    ? { x: [0, -10, 10, -5, 5, 0] }
                    : {}
                }
                placeholder="?"
                className={`w-full max-w-[200px] mx-auto h-12 text-center text-xl font-bold rounded-xl border-2 outline-none transition-all block
                  ${
                    marginalRevenueStatus === "idle"
                      ? "bg-white border-gray-300 focus:border-black focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                      : marginalRevenueStatus === "correct"
                      ? "bg-green-100 border-green-500 text-green-800"
                      : "bg-red-50 border-red-500 text-red-600"
                  }
                `}
              />
              <AnimatePresence>
                {marginalRevenueStatus === "correct" && (
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
          </div>

          {/* Hint */}
          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-3 text-center"
              >
                <p className="text-sm font-semibold text-yellow-800">
                  💡 Did you forget the discount for the first 3 people?
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success Message */}
          <AnimatePresence>
            {allCorrect && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-100 border-2 border-green-500 rounded-lg p-4 text-center"
              >
                <p className="text-lg font-bold text-green-800">
                  ✓ Perfect! You saw the $3 loss from the first customers.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};
