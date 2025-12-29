"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { RefreshCcw, CheckCircle2, Check, HelpCircle } from "lucide-react";
import { AnimatePresence } from "framer-motion";

export interface ElasticityScenario {
  scenario: string;
  correctAnswer: "elastic" | "inelastic"; // Greater than 1 = elastic, less than 1 = inelastic
}

interface ElasticityRevenueDrillProps {
  problem: ElasticityScenario;
  onComplete?: () => void;
}

export function ElasticityRevenueDrill({ problem, onComplete }: ElasticityRevenueDrillProps) {
  const [stage, setStage] = useState<1 | 2>(1);
  
  // Stage 1: Graph drawing
  const [points, setPoints] = useState<Array<{ x: number; y: number }>>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Stage 2: Calculations
  const [pricePercent, setPricePercent] = useState("");
  const [quantityPercent, setQuantityPercent] = useState("");
  const [elasticityType, setElasticityType] = useState<"elastic" | "inelastic" | null>(null);
  const [revenueAnswer, setRevenueAnswer] = useState<"INCREASE" | "DECREASE" | null>(null);
  
  const [pricePercentCorrect, setPricePercentCorrect] = useState(false);
  const [quantityPercentCorrect, setQuantityPercentCorrect] = useState(false);
  const [pricePercentIncorrect, setPricePercentIncorrect] = useState(false);
  const [quantityPercentIncorrect, setQuantityPercentIncorrect] = useState(false);
  const [elasticityCorrect, setElasticityCorrect] = useState<boolean | null>(null);
  const [revenueCorrect, setRevenueCorrect] = useState<boolean | null>(null);
  
  const [pricePercentFocused, setPricePercentFocused] = useState(false);
  const [quantityPercentFocused, setQuantityPercentFocused] = useState(false);
  
  // Stage 2 data - adjusted for whole number percentages
  const initialPrice = 10;
  const newPrice = 12;
  const initialQuantity = 500;
  const newQuantity = 350;
  
  // Stage 2 scenario text
  const stage2Scenario = 'A streaming service increases the price of its monthly subscription. Many customers cancel their subscriptions and switch to alternative platforms, showing a strong response to the price change.';
  
  // Calculate correct answers
  const correctPricePercent = Math.round(((newPrice - initialPrice) / initialPrice) * 100); // 20%
  const correctQuantityPercent = Math.round(((newQuantity - initialQuantity) / initialQuantity) * 100); // -30%
  const elasticityCoefficient = Math.abs(correctQuantityPercent) / Math.abs(correctPricePercent); // 30/20 = 1.5 (elastic)
  const correctElasticityType: "elastic" | "inelastic" = elasticityCoefficient > 1 ? "elastic" : "inelastic";
  
  // Total revenue test
  const originalRevenue = initialPrice * initialQuantity; // $5000
  const newRevenue = newPrice * newQuantity; // $4200
  const revenueDecreases = newRevenue < originalRevenue;
  const correctRevenueAnswer: "INCREASE" | "DECREASE" = revenueDecreases ? "DECREASE" : "INCREASE";

  // Graph dimensions
  const graphWidth = 600;
  const graphHeight = 400;
  const padding = 60;
  const graphInnerWidth = graphWidth - padding * 2;
  const graphInnerHeight = graphHeight - padding * 2;

  const handleGraphClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (isComplete || points.length >= 2) return;

    const svg = svgRef.current;
    if (!svg) return;

    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Only add point if it's within the graph area (excluding padding)
    if (
      x >= padding &&
      x <= padding + graphInnerWidth &&
      y >= padding &&
      y <= padding + graphInnerHeight
    ) {
      const newPoints = [...points, { x, y }];
      setPoints(newPoints);
      
      // Don't auto-submit - let user click submit button
    }
  };

  const calculateSlope = () => {
    if (points.length !== 2) return null;

    const [p1, p2] = points;
    // In SVG coordinates, y increases downward
    // For a demand curve: Price (Y-axis) decreases as Quantity (X-axis) increases
    // Slope = ΔPrice / ΔQuantity = (y2 - y1) / (x2 - x1)
    // Steep slope (close to vertical) = inelastic
    // Shallow slope (close to horizontal) = elastic
    const deltaY = Math.abs(p2.y - p1.y); // Change in Price (vertical)
    const deltaX = Math.abs(p2.x - p1.x); // Change in Quantity (horizontal)

    if (deltaX === 0) return null; // Vertical line

    // Calculate absolute slope (magnitude)
    // Large slope (> 1) = steep = inelastic
    // Small slope (< 1) = shallow = elastic
    const slope = deltaY / deltaX;
    return slope;
  };

  const handleStage1Submit = () => {
    if (points.length !== 2) return;

    const slope = calculateSlope();
    if (slope === null) return;

    // Greater than 1 = steep = inelastic, less than 1 = shallow = elastic
    const userAnswer = slope > 1 ? "inelastic" : "elastic";
    const correct = userAnswer === problem.correctAnswer;

    setIsCorrect(correct);
    setIsComplete(true);

    if (correct) {
      setTimeout(() => {
        setStage(2);
        setIsComplete(false);
        setIsCorrect(null);
      }, 1500);
    }
  };
  
  // Stage 2 handlers
  const checkPricePercent = () => {
    if (!pricePercent.trim()) return;
    const normalized = pricePercent.trim().replace(/[^0-9.-]/g, '');
    const numValue = parseFloat(normalized);
    if (Math.abs(numValue) === Math.abs(correctPricePercent)) {
      setPricePercentCorrect(true);
      setPricePercentIncorrect(false);
    } else {
      setPricePercentCorrect(false);
      setPricePercentIncorrect(true);
    }
  };

  const handlePricePercentBlur = () => {
    checkPricePercent();
  };

  const handlePricePercentKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      checkPricePercent();
    }
  };

  const checkQuantityPercent = () => {
    if (!quantityPercent.trim()) return;
    const normalized = quantityPercent.trim().replace(/[^0-9.-]/g, '');
    const numValue = parseFloat(normalized);
    // Accept both -30 and 30 as correct (absolute value comparison)
    if (Math.abs(numValue) === Math.abs(correctQuantityPercent)) {
      setQuantityPercentCorrect(true);
      setQuantityPercentIncorrect(false);
    } else {
      setQuantityPercentCorrect(false);
      setQuantityPercentIncorrect(true);
    }
  };

  const handleQuantityPercentBlur = () => {
    checkQuantityPercent();
  };

  const handleQuantityPercentKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      checkQuantityPercent();
    }
  };

  const handlePricePercentRedo = () => {
    setPricePercent('');
    setPricePercentCorrect(false);
    setPricePercentIncorrect(false);
  };

  const handleQuantityPercentRedo = () => {
    setQuantityPercent('');
    setQuantityPercentCorrect(false);
    setQuantityPercentIncorrect(false);
  };
  
  const handleElasticitySelect = (type: "elastic" | "inelastic") => {
    setElasticityType(type);
    const correct = type === correctElasticityType;
    setElasticityCorrect(correct);
  };
  
  const handleRevenueSelect = (answer: "INCREASE" | "DECREASE") => {
    setRevenueAnswer(answer);
    const correct = answer === correctRevenueAnswer;
    setRevenueCorrect(correct);
    
    // Check if stage 2 is complete
    if (correct && pricePercentCorrect && quantityPercentCorrect && elasticityCorrect) {
      setTimeout(() => {
        if (onComplete) {
          onComplete();
        }
      }, 1500);
    }
  };
  
  // Check if stage 2 can proceed
  const canProceedToElasticity = pricePercentCorrect && quantityPercentCorrect;
  const isStage2Complete = pricePercentCorrect && quantityPercentCorrect && elasticityCorrect && revenueCorrect;

  const handleReset = () => {
    setPoints([]);
    setIsComplete(false);
    setIsCorrect(null);
  };

  const slope = calculateSlope();
  const canSubmit = points.length === 2 && slope !== null;

  return (
    <div className="w-full h-full flex flex-row items-start justify-center gap-6 px-6 py-6">
      {/* Left Side: Submit Button (Stage 1) or Price/Quantity Info (Stage 2) */}
      {stage === 1 && (
        <div className="flex flex-col items-center justify-center gap-6">
          {/* Scenario Text */}
          <div className="w-full max-w-md">
            <p className="text-xl font-black text-black mb-3">Scenario:</p>
            <p className="text-lg font-bold text-black leading-relaxed">
              When the price of Good X increases, consumers barely change their purchasing habits due to a lack of close substitutes. Draw the demand for Good X.
            </p>
          </div>
          
          {!isComplete && (
            <button
              onClick={handleStage1Submit}
              disabled={!canSubmit}
              className={`px-8 py-4 rounded-xl font-black text-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all ${
                canSubmit
                  ? "bg-blue-600 text-white hover:bg-blue-700 active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              Submit
            </button>
          )}
          
          {/* Stage 1: Feedback */}
          {isComplete && (
            <div className="w-full">
              {isCorrect ? (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-100 border-2 border-green-600 rounded-lg"
                >
                  <p className="text-base font-bold text-green-900">
                    Correct! Your line represents an {problem.correctAnswer} demand curve.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-100 border-2 border-red-600 rounded-lg"
                >
                  <p className="text-base font-bold text-red-900">
                    Incorrect. Your line represents a{" "}
                    {slope && slope > 1 ? "inelastic" : "elastic"} demand curve, but the scenario
                    indicates {problem.correctAnswer} demand.
                  </p>
                </motion.div>
              )}
            </div>
          )}
        </div>
      )}
      
      {/* Stage 2: Price and Quantity Info */}
      {stage === 2 && (
        <div className="flex-1 flex flex-col gap-4 max-w-md">
          {/* Scenario Text */}
          <div className="w-full">
            <p className="text-xl font-black text-black mb-3">Scenario:</p>
            <p className="text-lg font-bold text-black leading-relaxed mb-4">
              Changes to price and quantity demanded for Good Z can be found below.
            </p>
          </div>
          
          <div className="w-full space-y-4">
            <div>
              <p className="text-lg font-black text-black mb-3">Price and Quantity Changes:</p>
              <div className="space-y-2 text-base font-bold">
                <p>Price: ${initialPrice} → ${newPrice}</p>
                <p>Quantity: {initialQuantity} → {newQuantity}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Right Side: Interactive Questions */}
      <div className="flex-1 flex flex-col gap-4 max-w-md">
        
        {/* Stage 2: Questions */}
        {stage === 2 && (
          <div className="w-full space-y-6">
            <div className="space-y-4">
              <div className="space-y-3">
                <p className="text-lg font-black text-black">Calculate Percentage Changes:</p>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    % Change in Price:
                    <div className="relative group">
                      <HelpCircle className="w-4 h-4 text-gray-500 cursor-help hover:text-gray-700 transition-colors" />
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-normal">
                        <p className="font-bold mb-1">Formula:</p>
                        <p>% Change = (New - Old) / Old × 100</p>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                          <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                        </div>
                      </div>
                    </div>
                  </label>
                  <div className="relative">
                    <motion.input
                      type="text"
                      value={pricePercent}
                      onChange={(e) => {
                        setPricePercent(e.target.value);
                        if (pricePercentIncorrect) {
                          setPricePercentIncorrect(false);
                        }
                      }}
                      onBlur={handlePricePercentBlur}
                      onKeyDown={handlePricePercentKeyDown}
                      onFocus={() => {
                        setPricePercentFocused(true);
                        if (pricePercentIncorrect) {
                          setPricePercentIncorrect(false);
                        }
                      }}
                      disabled={pricePercentCorrect}
                      placeholder={pricePercentFocused || pricePercent ? "" : "?"}
                      animate={pricePercentFocused && !pricePercentCorrect && !pricePercentIncorrect ? { scale: [1, 1.02, 1] } : {}}
                      className={`w-full px-4 py-3 text-center text-xl font-bold rounded-xl border-2 outline-none transition-all ${
                        pricePercentCorrect
                          ? "bg-green-100 border-green-500 text-green-800"
                          : pricePercentIncorrect
                          ? "bg-red-100 border-red-500 text-red-800"
                          : "bg-gray-50 border-gray-300 focus:border-black focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                      }`}
                    />
                    {pricePercentCorrect && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1"
                      >
                        <Check size={14} strokeWidth={4} />
                      </motion.div>
                    )}
                    {pricePercentIncorrect && (
                      <div className="absolute -top-2 -right-2">
                        <button
                          onClick={handlePricePercentRedo}
                          className="p-1.5 bg-white border-2 border-black rounded-full hover:bg-gray-100 active:translate-y-0.5 transition-transform"
                          title="Try again"
                        >
                          <RefreshCcw size={14} className="text-gray-900" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    % Change in Quantity:
                    <div className="relative group">
                      <HelpCircle className="w-4 h-4 text-gray-500 cursor-help hover:text-gray-700 transition-colors" />
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-normal">
                        <p className="font-bold mb-1">Formula:</p>
                        <p>% Change = (New - Old) / Old × 100</p>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                          <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                        </div>
                      </div>
                    </div>
                  </label>
                  <div className="relative">
                    <motion.input
                      type="text"
                      value={quantityPercent}
                      onChange={(e) => {
                        setQuantityPercent(e.target.value);
                        if (quantityPercentIncorrect) {
                          setQuantityPercentIncorrect(false);
                        }
                      }}
                      onBlur={handleQuantityPercentBlur}
                      onKeyDown={handleQuantityPercentKeyDown}
                      onFocus={() => {
                        setQuantityPercentFocused(true);
                        if (quantityPercentIncorrect) {
                          setQuantityPercentIncorrect(false);
                        }
                      }}
                      disabled={quantityPercentCorrect}
                      placeholder={quantityPercentFocused || quantityPercent ? "" : "?"}
                      animate={quantityPercentFocused && !quantityPercentCorrect && !quantityPercentIncorrect ? { scale: [1, 1.02, 1] } : {}}
                      className={`w-full px-4 py-3 text-center text-xl font-bold rounded-xl border-2 outline-none transition-all ${
                        quantityPercentCorrect
                          ? "bg-green-100 border-green-500 text-green-800"
                          : quantityPercentIncorrect
                          ? "bg-red-100 border-red-500 text-red-800"
                          : "bg-gray-50 border-gray-300 focus:border-black focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                      }`}
                    />
                    {quantityPercentCorrect && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1"
                      >
                        <Check size={14} strokeWidth={4} />
                      </motion.div>
                    )}
                    {quantityPercentIncorrect && (
                      <div className="absolute -top-2 -right-2">
                        <button
                          onClick={handleQuantityPercentRedo}
                          className="p-1.5 bg-white border-2 border-black rounded-full hover:bg-gray-100 active:translate-y-0.5 transition-transform"
                          title="Try again"
                        >
                          <RefreshCcw size={14} className="text-gray-900" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {canProceedToElasticity && (
                <div className="space-y-2 pt-2">
                  <p className="text-base font-black text-black">Determine Elasticity:</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleElasticitySelect("elastic")}
                      disabled={elasticityCorrect === true}
                      className={`flex-1 px-6 py-4 rounded-xl font-bold text-lg border-2 transition-all ${
                        elasticityType === "elastic"
                          ? elasticityCorrect === true
                            ? "bg-green-100 border-green-500 text-green-800"
                            : elasticityCorrect === false
                            ? "bg-red-100 border-red-500 text-red-800"
                            : "bg-gray-200 border-black"
                          : "bg-white border-gray-300 hover:border-black"
                      }`}
                    >
                      Elastic
                    </button>
                    <button
                      onClick={() => handleElasticitySelect("inelastic")}
                      disabled={elasticityCorrect === true}
                      className={`flex-1 px-6 py-4 rounded-xl font-bold text-lg border-2 transition-all ${
                        elasticityType === "inelastic"
                          ? elasticityCorrect === true
                            ? "bg-green-100 border-green-500 text-green-800"
                            : elasticityCorrect === false
                            ? "bg-red-100 border-red-500 text-red-800"
                            : "bg-gray-200 border-black"
                          : "bg-white border-gray-300 hover:border-black"
                      }`}
                    >
                      Inelastic
                    </button>
                  </div>
                </div>
              )}
              
              {elasticityCorrect && (
                <div className="space-y-2 pt-2">
                  <p className="text-base font-black text-black">
                    Will the price change increase or decrease the firm's total revenue?
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleRevenueSelect("INCREASE")}
                      disabled={revenueCorrect === true}
                      className={`flex-1 px-6 py-4 rounded-xl font-black text-xl border-4 transition-all ${
                        revenueAnswer === "INCREASE"
                          ? revenueCorrect === true
                            ? "bg-green-100 border-green-600 text-green-900"
                            : revenueCorrect === false
                            ? "bg-red-100 border-red-600 text-red-900"
                            : "bg-gray-200 border-black"
                          : "bg-white border-gray-300 hover:border-black"
                      }`}
                    >
                      INCREASE
                    </button>
                    <button
                      onClick={() => handleRevenueSelect("DECREASE")}
                      disabled={revenueCorrect === true}
                      className={`flex-1 px-6 py-4 rounded-xl font-black text-xl border-4 transition-all ${
                        revenueAnswer === "DECREASE"
                          ? revenueCorrect === true
                            ? "bg-green-100 border-green-600 text-green-900"
                            : revenueCorrect === false
                            ? "bg-red-100 border-red-600 text-red-900"
                            : "bg-gray-200 border-black"
                          : "bg-white border-gray-300 hover:border-black"
                      }`}
                    >
                      DECREASE
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Right Side: Graph Container (Stage 1 only) */}
      {stage === 1 && (
        <div className="flex-1 flex items-center justify-center w-full min-h-0">
          <div
            className={`relative border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 transition-colors duration-300 ${
              isCorrect === true
                ? "bg-green-100"
                : isCorrect === false
                ? "bg-red-100"
                : "bg-white"
            }`}
          >
            {/* Reset Button */}
            {isComplete && isCorrect === false && (
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={handleReset}
                  className="p-2 bg-white border-2 border-black rounded-full hover:bg-gray-100 active:translate-y-1 transition-transform"
                >
                  <RefreshCcw size={16} />
                </button>
              </div>
            )}

            {/* Success Checkmark */}
            {isComplete && isCorrect === true && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute top-4 right-4 z-10"
              >
                <CheckCircle2 size={24} className="text-green-600" />
              </motion.div>
            )}

            <svg
              ref={svgRef}
              width={graphWidth}
              height={graphHeight}
              className="overflow-visible cursor-crosshair"
              onClick={handleGraphClick}
            >
            {/* Axes */}
            <line
              x1={padding}
              y1={padding}
              x2={padding}
              y2={padding + graphInnerHeight}
              stroke="black"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <line
              x1={padding}
              y1={padding + graphInnerHeight}
              x2={padding + graphInnerWidth}
              y2={padding + graphInnerHeight}
              stroke="black"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* Axis Labels */}
            <text
              x={padding - 30}
              y={padding + graphInnerHeight / 2}
              fill="black"
              fontSize="18"
              fontWeight="900"
              transform={`rotate(-90 ${padding - 30} ${padding + graphInnerHeight / 2})`}
              textAnchor="middle"
            >
              Price (P)
            </text>
            <text
              x={padding + graphInnerWidth / 2}
              y={padding + graphInnerHeight + 40}
              fill="black"
              fontSize="18"
              fontWeight="900"
              textAnchor="middle"
            >
              Quantity (Q)
            </text>

            {/* Line connecting the two points */}
            {points.length === 2 && (
              <motion.line
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5 }}
                x1={points[0].x}
                y1={points[0].y}
                x2={points[1].x}
                y2={points[1].y}
                stroke="black"
                strokeWidth="6"
                strokeLinecap="round"
              />
            )}

            {/* Points */}
            {points.map((point, index) => (
              <motion.circle
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                cx={point.x}
                cy={point.y}
                r="10"
                fill={isComplete && isCorrect ? "#10b981" : "#ef4444"}
                stroke="black"
                strokeWidth="3"
              />
            ))}

          </svg>
        </div>
      </div>
      )}
    </div>
  );
}

