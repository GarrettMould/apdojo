'use client';

import { useState, useEffect } from 'react';
import { X, Brain, Check } from 'lucide-react';
import dojoIcon from "../../../public/images/dojoIcon.png"
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import { allContent } from '@/data/allContent';
import React from 'react';

type Question = {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

type ContentImage = {
  src: StaticImageData;
  caption: string;
  width?: string; // e.g., '100%', '500px', etc.
  height?: string;
  placement?: 'after-paragraph' | 'inline';
  paragraphId?: string; // To identify which paragraph to place it after
}

type CheatSheetSectionProps = {
  id: string;
  lessonIDS: string[];
  title: string;
  children: React.ReactNode;
  setShowQuiz: (show: boolean) => void;
  setIsLoading: (loading: boolean) => void;
  setQuestions: (questions: Question[]) => void;
  setSelectedAnswers: (answers: Record<string, number>) => void;
  setIsSubmitted: (submitted: boolean) => void;
  setActiveSection: (section: { id: string; lessonID: string; title: string } | null) => void;
  subject: string;
  images?: ContentImage[];
}

const CheatSheetSection = ({ 
  id, 
  lessonIDS, 
  title, 
  children,
  setShowQuiz,
  setIsLoading,
  setQuestions,
  setSelectedAnswers,
  setIsSubmitted,
  setActiveSection,
  subject,
  images
}: CheatSheetSectionProps) => {
  const handleSectionQuiz = async () => {
    const sectionElement = document.getElementById(id);
    if (sectionElement) {
      const sectionContent = sectionElement.textContent || '';
      setIsLoading(true);
      setShowQuiz(true);
      setActiveSection({ id, lessonID: lessonIDS[0], title });

      try {
        const response = await fetch('/api/generate-quiz', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            subject,
            content: sectionContent,
          }),
        });

        if (!response.ok) throw new Error('Failed to generate quiz');

        const data = await response.json();
        setQuestions(data.questions);
        setSelectedAnswers({});
        setIsSubmitted(false);
      } catch (error) {
        console.error('Error generating quiz:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const renderContent = (content: React.ReactNode, images: ContentImage[]) => {
    const contentArray = React.Children.toArray(content);
    const result: React.ReactNode[] = [];

    React.Children.forEach(content, (child, index) => {
      // Add the content
      result.push(child);

      // Check if any images should be placed after this paragraph
      const matchingImages = images?.filter(
        img => img.placement === 'after-paragraph' && 
        (img.paragraphId === (child as any).props?.id)
      );

      if (matchingImages?.length) {
        matchingImages.forEach(image => {
          result.push(
            <figure key={`figure-${image.src.src}`} className="my-6">
              <div 
                className="relative mx-auto" 
                style={{ 
                  width: image.width || '100%',
                  height: image.height || 'auto',
                  aspectRatio: '16/9'
                }}
              >
                <Image
                  src={image.src}
                  alt={image.caption}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
              <figcaption className="text-center text-sm text-gray-600 mt-2">
                {image.caption}
              </figcaption>
            </figure>
          );
        });
      }
    });

    // Add any remaining inline images at the end
    const inlineImages = images?.filter(img => !img.placement || img.placement === 'inline');
    if (inlineImages?.length) {
      result.push(
        <div className="mt-6 space-y-6">
          {inlineImages.map((image, index) => (
            <figure key={`figure-${index}`} className="my-6">
              <div 
                className="relative mx-auto" 
                style={{ 
                  width: image.width || '100%',
                  height: image.height || 'auto',
                  aspectRatio: '16/9'
                }}
              >
                <Image
                  src={image.src}
                  alt={image.caption}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
              <figcaption className="text-center text-sm text-gray-600 mt-2">
                {image.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      );
    }

    return result;
  };

  return (
    <div className="mb-16 border-b border-gray-100 pb-12" id={id}>
      <div className="flex items-baseline mb-6">
        <div className="flex items-center text-xl md:text-2xl font-black">
          {lessonIDS.map((lessonID) => (
            <span 
              key={lessonID} 
              className="text-gray-900"
            >
              {lessonID}
            </span>
          ))}
          <span className="text-gray-900 mx-2">—</span>
          <h2 className="text-blue-500">{title}</h2>
          <button
            onClick={handleSectionQuiz}
            className="ml-3 bg-blue-500 text-white p-2.5 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-200 flex items-center gap-2 hover:scale-110"
            title="Generate quiz for this section"
          >
            <Brain className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="text-gray-700">
        {renderContent(children, images || [])}
      </div>
    </div>
  );
};

export default function QuizMeTester() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectionCoords, setSelectionCoords] = useState<{ x: number; y: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [activeSection, setActiveSection] = useState<{ id: string; lessonID: string; title: string } | null>(null);
  const subject = 'macro'; // We can make this dynamic later

  // Sample questions (will be replaced with AI-generated ones)
  const sampleQuestions: Question[] = [
    {
      id: '1',
      text: 'What happens to quantity demanded when price increases?',
      options: [
        'It increases',
        'It decreases',
        'It stays the same',
        'It becomes elastic'
      ],
      correctAnswer: 1
    }
  ];

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  // Handle text selection
  const handleTextSelection = () => {
    const selection = window.getSelection();
    
    if (selection && selection.toString().trim().length > 0) {
      // Get the coordinates of the selection
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      
      // Position the icon just to the right of the selection
      setSelectionCoords({
        x: rect.right + window.scrollX,
        y: rect.top + window.scrollY - 10 // Offset slightly above the selection
      });
    } else {
      setSelectionCoords(null);
    }
  };

  // Add and remove event listeners
  useEffect(() => {
    document.addEventListener('mouseup', handleTextSelection);
    document.addEventListener('keyup', handleTextSelection);
    
    return () => {
      document.removeEventListener('mouseup', handleTextSelection);
      document.removeEventListener('keyup', handleTextSelection);
    };
  }, []);

  const handleGenerateQuiz = async () => {
    const selection = window.getSelection();
    if (selection) {
      const selectedText = selection.toString().trim();
      setIsLoading(true);
      setShowQuiz(true);
      setSelectionCoords(null);
      selection.removeAllRanges();

      try {
        const response = await fetch('/api/generate-quiz', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            subject,
            content: selectedText,
          }),
        });

        if (!response.ok) throw new Error('Failed to generate quiz');

        const data = await response.json();
        setQuestions(data.questions);
        setSelectedAnswers({});
        setIsSubmitted(false);
      } catch (error) {
        console.error('Error generating quiz:', error);
        // Optionally show an error message to the user
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Add this effect to handle body scroll locking
  useEffect(() => {
    if (showQuiz) {
      // Lock scrolling when modal opens
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling when modal closes
      document.body.style.overflow = 'unset';
    }

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showQuiz]);

  return (
    <div className="min-h-screen bg-white" style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-black mb-2">
            AP <span className="text-blue-500">Macro</span>
          </h1>
          <h2 className="text-lg md:text-xl font-medium text-gray-600">
            Unit 1 Cheat Sheet
          </h2>
        </div>
        
        <div className="space-y-16">
          <CheatSheetSection 
            id="scarcity" 
            lessonIDS={["1.1"]} 
            title="Scarcity"
            setShowQuiz={setShowQuiz}
            setIsLoading={setIsLoading}
            setQuestions={setQuestions}
            setSelectedAnswers={setSelectedAnswers}
            setIsSubmitted={setIsSubmitted}
            setActiveSection={setActiveSection}
            subject={subject}
            images={[allContent.macroeconomics[1].images[0]]}
          >
            <div>
              <p className="font-semibold mb-2">Definition:</p>
              <p className="mb-4">Scarcity is the fundamental economic problem of having unlimited wants and needs in a world with limited resources.</p>
              
              <div className="mb-4">
                <p className="font-semibold mb-2">Key Concepts:</p>
                <p className="font-medium">Economic Resources (Factors of Production):</p>
                <ul className="list-disc pl-8 mb-4">
                  <li><span className="font-medium">Land</span> - Natural resources (oil, timber, water, minerals)</li>
                  <li><span className="font-medium">Labor</span> - Human effort and work</li>
                  <li><span className="font-medium">Capital</span> - Man-made goods used to produce other goods and services (machinery, tools, buildings)</li>
                  <li><span className="font-medium">Entrepreneurship</span> - The ability to organize the other factors of production</li>
                </ul>
              </div>
              
              <div className="mb-4">
                <p className="font-semibold mb-2">Why Scarcity Matters:</p>
                <ul className="list-disc pl-8">
                  <li>Necessitates choices and trade-offs</li>
                  <li>Creates opportunity costs when allocating resources</li>
                  <li>Drives the need for economic systems to determine what, how, and for whom to produce</li>
                </ul>
              </div>
              
              <div>
                <p className="font-semibold mb-2">Examples:</p>
                <ul className="list-disc pl-8">
                  <li>A student with limited study time must choose which subjects to prioritize</li>
                  <li>A nation with limited funding must decide between defense spending or healthcare</li>
                  <li>A business with finite capital deciding whether to invest in new technology or hire more workers</li>
                </ul>
              </div>
            </div>
          </CheatSheetSection>
          
          <CheatSheetSection 
            id="opportunity-cost-ppc" 
            lessonIDS={["1.2"]} 
            title="Opportunity Cost and the Production Possibilities Curve (PPC)"
            setShowQuiz={setShowQuiz}
            setIsLoading={setIsLoading}
            setQuestions={setQuestions}
            setSelectedAnswers={setSelectedAnswers}
            setIsSubmitted={setIsSubmitted}
            setActiveSection={setActiveSection}
            subject={subject}
            images={[
              {
                src: allContent.macroeconomics[1].images[1],
                caption: "Figure 1: PPC with Constant Opportunity Cost",
                width: "600px",
                placement: "after-paragraph",
                paragraphId: "ppc-intro"
              },
              {
                src: allContent.macroeconomics[1].images[2],
                caption: "Figure 2: PPC with Increasing Opportunity Cost",
                width: "600px",
                placement: "inline" // Will appear at the end of the section
              }
            ]}
          >
            <div>
              <p id="ppc-intro" className="mb-4">
                <span className="font-semibold">Production Possibilities Curve (PPC):</span> 
                A model that shows the maximum combinations of two goods that can be produced 
                given available resources and technology.
              </p>
              
              <div className="mb-4">
                <p className="font-semibold mb-2">Key Characteristics of the PPC:</p>
                <ul className="list-disc pl-8">
                  <li>Points on the curve = efficient production (full employment of resources)</li>
                  <li>Points inside the curve = inefficient production (underutilization of resources)</li>
                  <li>Points outside the curve = unattainable with current resources and technology</li>
                  <li>Bowed outward shape (concave to origin) = increasing opportunity costs</li>
                </ul>
              </div>
              
              <div className="mb-4">
                <p className="font-semibold mb-2">PPC Shifts:</p>
                <p className="font-medium">Outward shift (economic growth): More of both goods can be produced due to:</p>
                <ul className="list-disc pl-8 mb-4">
                  <li>Increase in resources (more labor, capital, land)</li>
                  <li>Technological advancements</li>
                  <li>Improved education/training</li>
                </ul>
                
                <p className="font-medium">Inward shift: Less of both goods can be produced due to:</p>
                <ul className="list-disc pl-8">
                  <li>Decrease in resources</li>
                  <li>Natural disasters</li>
                  <li>War or conflict</li>
                </ul>
              </div>
              
              <div>
                <p className="font-semibold mb-2">Example:</p>
                <p>Country producing computers and wheat</p>
                <ul className="list-disc pl-8">
                  <li>As more resources shift to computer production, increasingly productive wheat-producing land must be given up</li>
                  <li>Results in increasing opportunity costs (giving up more wheat for each additional computer)</li>
                </ul>
              </div>
            </div>
          </CheatSheetSection>
          
          <CheatSheetSection 
            id="comparative-advantage" 
            lessonIDS={["1.3"]} 
            title="Comparative Advantage and Gains from Trade"
            setShowQuiz={setShowQuiz}
            setIsLoading={setIsLoading}
            setQuestions={setQuestions}
            setSelectedAnswers={setSelectedAnswers}
            setIsSubmitted={setIsSubmitted}
            setActiveSection={setActiveSection}
            subject={subject}
            images={allContent.macroeconomics[1].images.slice(2)}
          >
            <div>
              <p className="mb-4"><span className="font-semibold">Absolute Advantage:</span> The ability to produce more of a good or service with the same amount of resources.</p>
              
              <p className="mb-4"><span className="font-semibold">Comparative Advantage:</span> The ability to produce a good or service at a lower opportunity cost than another producer.</p>
              
              <div className="mb-4">
                <p className="font-semibold mb-2">Key Principles:</p>
                <ul className="list-disc pl-8">
                  <li>Countries benefit by specializing in goods for which they have a comparative advantage</li>
                  <li>Trade allows countries to consume beyond their individual production possibilities</li>
                  <li>Total production increases when producers specialize according to comparative advantage</li>
                </ul>
              </div>
              
              <div className="mb-4">
                <p className="font-semibold mb-2">Calculating Comparative Advantage:</p>
                <ol className="list-decimal pl-8">
                  <li>Determine opportunity cost for each producer</li>
                  <li>The producer with the lower opportunity cost has the comparative advantage</li>
                </ol>
              </div>
              
              <div>
                <p className="font-semibold mb-2">Example:</p>
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse border border-gray-300 mb-4">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2"></th>
                        <th className="border border-gray-300 px-4 py-2">Computers (per hour)</th>
                        <th className="border border-gray-300 px-4 py-2">Wheat (tons per hour)</th>
                        <th className="border border-gray-300 px-4 py-2">Opportunity Cost of 1 Computer</th>
                        <th className="border border-gray-300 px-4 py-2">Opportunity Cost of 1 ton of Wheat</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-medium">Country A</td>
                        <td className="border border-gray-300 px-4 py-2">10</td>
                        <td className="border border-gray-300 px-4 py-2">5</td>
                        <td className="border border-gray-300 px-4 py-2">0.5 tons of wheat</td>
                        <td className="border border-gray-300 px-4 py-2">2 computers</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-medium">Country B</td>
                        <td className="border border-gray-300 px-4 py-2">5</td>
                        <td className="border border-gray-300 px-4 py-2">15</td>
                        <td className="border border-gray-300 px-4 py-2">3 tons of wheat</td>
                        <td className="border border-gray-300 px-4 py-2">0.33 computers</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <ul className="list-disc pl-8">
                  <li>Country A has comparative advantage in computers (lower opportunity cost of 0.5 vs 3)</li>
                  <li>Country B has comparative advantage in wheat (lower opportunity cost of 0.33 vs 2)</li>
                  <li>Both benefit from specialization and trade</li>
                </ul>
              </div>
            </div>
          </CheatSheetSection>
          
          <CheatSheetSection 
            id="demand" 
            lessonIDS={["1.4"]} 
            title="Demand"
            setShowQuiz={setShowQuiz}
            setIsLoading={setIsLoading}
            setQuestions={setQuestions}
            setSelectedAnswers={setSelectedAnswers}
            setIsSubmitted={setIsSubmitted}
            setActiveSection={setActiveSection}
            subject={subject}
            images={allContent.macroeconomics[1].images.slice(3)}
          >
            <div>
              <p className="mb-4"><span className="font-semibold">Definition:</span> The willingness and ability of consumers to purchase a good or service at various price levels.</p>
              
              <p className="mb-4"><span className="font-semibold">Law of Demand:</span> As price increases, quantity demanded decreases (inverse relationship), ceteris paribus (all else equal).</p>
              
              <div className="mb-4">
                <p className="font-semibold mb-2">Demand Schedule and Curve:</p>
                <ul className="list-disc pl-8">
                  <li>Demand schedule: Table showing quantities demanded at different prices</li>
                  <li>Demand curve: Graphical representation (downward sloping)</li>
                </ul>
              </div>
              
              <div className="mb-4">
                <p className="font-semibold mb-2">Determinants of Demand (Factors that Shift the Demand Curve):</p>
                
                <div className="mb-3">
                  <p className="font-medium">1. Consumer Income</p>
                  <ul className="list-disc pl-8">
                    <li>Normal goods: Income ↑, Demand ↑</li>
                    <li>Inferior goods: Income ↑, Demand ↓</li>
                  </ul>
                </div>
                
                <div className="mb-3">
                  <p className="font-medium">2. Prices of Related Goods</p>
                  <ul className="list-disc pl-8">
                    <li>Substitutes (replace each other): If price of substitute ↑, Demand ↑</li>
                    <li>Complements (used together): If price of complement ↑, Demand ↓</li>
                  </ul>
                </div>
                
                <div className="mb-3">
                  <p className="font-medium">3. Consumer Preferences/Tastes</p>
                  <ul className="list-disc pl-8">
                    <li>Positive change in preference: Demand ↑</li>
                    <li>Negative change in preference: Demand ↓</li>
                  </ul>
                </div>
                
                <div className="mb-3">
                  <p className="font-medium">4. Consumer Expectations</p>
                  <ul className="list-disc pl-8">
                    <li>Expected future price increase: Current demand ↑</li>
                    <li>Expected future price decrease: Current demand ↓</li>
                  </ul>
                </div>
                
                <div>
                  <p className="font-medium">5. Number of Buyers</p>
                  <ul className="list-disc pl-8">
                    <li>More buyers: Market demand ↑</li>
                    <li>Fewer buyers: Market demand ↓</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <p className="font-semibold mb-2">Change in Demand vs. Change in Quantity Demanded:</p>
                <ul className="list-disc pl-8">
                  <li><span className="font-medium">Change in demand:</span> Shift of entire demand curve (caused by non-price factors)</li>
                  <li><span className="font-medium">Change in quantity demanded:</span> Movement along the demand curve (caused by price change)</li>
                </ul>
              </div>
            </div>
          </CheatSheetSection>
          
          <CheatSheetSection 
            id="supply" 
            lessonIDS={["1.5"]} 
            title="Supply"
            setShowQuiz={setShowQuiz}
            setIsLoading={setIsLoading}
            setQuestions={setQuestions}
            setSelectedAnswers={setSelectedAnswers}
            setIsSubmitted={setIsSubmitted}
            setActiveSection={setActiveSection}
            subject={subject}
            images={allContent.macroeconomics[1].images.slice(4)}
          >
            <div>
              <p className="mb-4"><span className="font-semibold">Definition:</span> The willingness and ability of producers to offer goods or services for sale at various price levels.</p>
              
              <p className="mb-4"><span className="font-semibold">Law of Supply:</span> As price increases, quantity supplied increases (direct relationship), ceteris paribus.</p>
              
              <div className="mb-4">
                <p className="font-semibold mb-2">Supply Schedule and Curve:</p>
                <ul className="list-disc pl-8">
                  <li>Supply schedule: Table showing quantities supplied at different prices</li>
                  <li>Supply curve: Graphical representation (upward sloping)</li>
                </ul>
              </div>
              
              <div className="mb-4">
                <p className="font-semibold mb-2">Determinants of Supply (Factors that Shift the Supply Curve):</p>
                
                <div className="mb-3">
                  <p className="font-medium">1. Cost of Resources/Inputs</p>
                  <ul className="list-disc pl-8">
                    <li>Input costs ↑: Supply ↓</li>
                    <li>Input costs ↓: Supply ↑</li>
                  </ul>
                </div>
                
                <div className="mb-3">
                  <p className="font-medium">2. Technology</p>
                  <ul className="list-disc pl-8">
                    <li>Improved technology: Supply ↑</li>
                    <li>Deteriorating technology: Supply ↓</li>
                  </ul>
                </div>
                
                <div className="mb-3">
                  <p className="font-medium">3. Taxes and Subsidies</p>
                  <ul className="list-disc pl-8">
                    <li>Higher taxes: Supply ↓</li>
                    <li>Subsidies: Supply ↑</li>
                  </ul>
                </div>
                
                <div className="mb-3">
                  <p className="font-medium">4. Producer Expectations</p>
                  <ul className="list-disc pl-8">
                    <li>Expected future price increase: Current supply ↓</li>
                    <li>Expected future price decrease: Current supply ↑</li>
                  </ul>
                </div>
                
                <div className="mb-3">
                  <p className="font-medium">5. Number of Sellers</p>
                  <ul className="list-disc pl-8">
                    <li>More sellers: Market supply ↑</li>
                    <li>Fewer sellers: Market supply ↓</li>
                  </ul>
                </div>
                
                <div>
                  <p className="font-medium">6. Price of Related Goods in Production</p>
                  <ul className="list-disc pl-8">
                    <li>Higher prices for alternatives to produce: Supply ↑</li>
                    <li>Lower prices for alternatives to produce: Supply ↓</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <p className="font-semibold mb-2">Change in Supply vs. Change in Quantity Supplied:</p>
                <ul className="list-disc pl-8">
                  <li><span className="font-medium">Change in supply:</span> Shift of entire supply curve (caused by non-price factors)</li>
                  <li><span className="font-medium">Change in quantity supplied:</span> Movement along the supply curve (caused by price change)</li>
                </ul>
              </div>
            </div>
          </CheatSheetSection>
          
          <CheatSheetSection 
            id="market-equilibrium" 
            lessonIDS={["1.6"]} 
            title="Market Equilibrium, Disequilibrium, and Changes in Equilibrium"
            setShowQuiz={setShowQuiz}
            setIsLoading={setIsLoading}
            setQuestions={setQuestions}
            setSelectedAnswers={setSelectedAnswers}
            setIsSubmitted={setIsSubmitted}
            setActiveSection={setActiveSection}
            subject={subject}
            images={allContent.macroeconomics[1].images.slice(5)}
          >
            <div>
              <p className="mb-4"><span className="font-semibold">Market Equilibrium:</span> The condition where quantity demanded equals quantity supplied; there is no tendency for price to change.</p>
              
              <div className="mb-4">
                <p className="font-semibold mb-2">Key Features:</p>
                <ul className="list-disc pl-8">
                  <li>Equilibrium price: Price where Qd = Qs</li>
                  <li>Equilibrium quantity: Amount bought and sold at equilibrium price</li>
                  <li>No surplus or shortage exists</li>
                  <li>No pressure for price to change</li>
                </ul>
              </div>
              
              <div className="mb-4">
                <p className="font-semibold mb-2">Disequilibrium:</p>
                
                <div className="mb-3">
                  <p className="font-medium">1. Surplus (Excess Supply):</p>
                  <ul className="list-disc pl-8">
                    <li>Occurs when price &gt; equilibrium price</li>
                    <li>Quantity supplied &gt; quantity demanded</li>
                    <li>Sellers cannot sell all their goods</li>
                    <li>Downward pressure on price</li>
                  </ul>
                </div>
                
                <div>
                  <p className="font-medium">2. Shortage (Excess Demand):</p>
                  <ul className="list-disc pl-8">
                    <li>Occurs when price &lt; equilibrium price</li>
                    <li>Quantity demanded &gt; quantity supplied</li>
                    <li>Buyers cannot purchase all they want</li>
                    <li>Upward pressure on price</li>
                  </ul>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="font-semibold mb-2">Changes in Equilibrium:</p>
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse border border-gray-300 mb-4">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">Change</th>
                        <th className="border border-gray-300 px-4 py-2">Effect on Equilibrium Price</th>
                        <th className="border border-gray-300 px-4 py-2">Effect on Equilibrium Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Demand ↑</td>
                        <td className="border border-gray-300 px-4 py-2">Price ↑</td>
                        <td className="border border-gray-300 px-4 py-2">Quantity ↑</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Demand ↓</td>
                        <td className="border border-gray-300 px-4 py-2">Price ↓</td>
                        <td className="border border-gray-300 px-4 py-2">Quantity ↓</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Supply ↑</td>
                        <td className="border border-gray-300 px-4 py-2">Price ↓</td>
                        <td className="border border-gray-300 px-4 py-2">Quantity ↑</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Supply ↓</td>
                        <td className="border border-gray-300 px-4 py-2">Price ↑</td>
                        <td className="border border-gray-300 px-4 py-2">Quantity ↓</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Both Demand and Supply ↑</td>
                        <td className="border border-gray-300 px-4 py-2">Ambiguous (depends on magnitude)</td>
                        <td className="border border-gray-300 px-4 py-2">Quantity ↑</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Both Demand and Supply ↓</td>
                        <td className="border border-gray-300 px-4 py-2">Ambiguous (depends on magnitude)</td>
                        <td className="border border-gray-300 px-4 py-2">Quantity ↓</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Demand ↑, Supply ↓</td>
                        <td className="border border-gray-300 px-4 py-2">Price ↑</td>
                        <td className="border border-gray-300 px-4 py-2">Ambiguous</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Demand ↓, Supply ↑</td>
                        <td className="border border-gray-300 px-4 py-2">Price ↓</td>
                        <td className="border border-gray-300 px-4 py-2">Ambiguous</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="font-semibold mb-2">Example:</p>
                <p>If consumer income increases (shifting demand right) and a technological improvement occurs (shifting supply right), the equilibrium quantity will definitely increase, but the price effect depends on which shift is larger.</p>
              </div>
              
              <div>
                <p className="font-semibold mb-2">Market Intervention:</p>
                
                <div className="mb-3">
                  <p className="font-medium">1. Price Ceiling: Maximum legal price (e.g., rent control)</p>
                  <ul className="list-disc pl-8">
                    <li>If set below equilibrium: Creates shortage, black markets</li>
                    <li>If set above equilibrium: No effect</li>
                  </ul>
                </div>
                
                <div>
                  <p className="font-medium">2. Price Floor: Minimum legal price (e.g., minimum wage)</p>
                  <ul className="list-disc pl-8">
                    <li>If set above equilibrium: Creates surplus</li>
                    <li>If set below equilibrium: No effect</li>
                  </ul>
                </div>
              </div>
            </div>
          </CheatSheetSection>
        </div>
      </div>

      {/* Floating Quiz Icon */}
      {selectionCoords && (
        <button
          onClick={handleGenerateQuiz}
          style={{
            position: 'absolute',
            left: `${selectionCoords.x}px`,
            top: `${selectionCoords.y}px`,
            transform: 'translate(-50%, -100%)',
          }}
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-200 animate-fade-in flex items-center gap-2 hover:scale-110"
        >
          <Brain className="w-5 h-5" />
        </button>
      )}

      {/* Quiz Modal */}
      {showQuiz && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div 
            className="relative bg-white rounded-xl overflow-hidden w-full max-w-xl max-h-[80vh] flex flex-col shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white p-6 border-b z-20">
              <button
                onClick={() => {
                  setShowQuiz(false);
                  setActiveSection(null);
                }}
                className="absolute top-6 right-6 text-gray-900 hover:text-gray-600 transition-colors"
              >
                <X className="w-7 h-7" />
              </button>
              
              <div>
                <div className="flex items-center gap-4 mb-1">
                  <Image 
                    src={dojoIcon}
                    alt="Dojo Icon"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                  <h3 className="font-extrabold text-2xl">
                    AP <span className="text-blue-500">Dojo</span>
                  </h3>
                </div>
                <h4 className="font-bold text-xl">
                  {activeSection ? (
                    <>Generated Quiz - {activeSection.lessonID} - {activeSection.title}</>
                  ) : (
                    'Generated Quiz'
                  )}
                </h4>
              </div>
            </div>

            {/* Questions - Now in a scrollable container */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <p className="mt-4 text-gray-600 font-medium">Generating your quiz...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {questions.map((question) => (
                      <div 
                        key={question.id}
                        className="p-5 rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow"
                      >
                        <p className="text-base font-semibold mb-4 text-gray-900">{question.text}</p>

                        <div className="space-y-2.5">
                          {question.options.map((option, index) => (
                            <button
                              key={index}
                              onClick={() => handleAnswerSelect(question.id, index)}
                              disabled={isSubmitted}
                              className={`w-full text-left p-3.5 rounded-md text-sm font-medium transition-all duration-200 border ${
                                isSubmitted
                                  ? index === question.correctAnswer
                                    ? 'bg-blue-50 text-gray-900 shadow-sm border-blue-200'
                                    : index === selectedAnswers[question.id]
                                      ? 'bg-gray-100 text-gray-900 shadow-sm border-gray-200'
                                      : 'bg-gray-50 text-gray-900 border-transparent'
                                  : selectedAnswers[question.id] === index
                                    ? 'bg-blue-50 text-gray-900 border-blue-200 shadow-sm'
                                    : 'bg-gray-50 hover:bg-gray-100 hover:shadow-sm border-transparent'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <span className="flex-1 min-w-0 break-words pr-2">{option}</span>
                                <div className="flex-shrink-0">
                                  {isSubmitted && (
                                    index === question.correctAnswer 
                                      ? <Check className="w-5 h-5 text-blue-500" /> 
                                      : index === selectedAnswers[question.id] 
                                        ? <X className="w-5 h-5 text-gray-400" />
                                        : null
                                  )}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button - Now sticky at the bottom */}
            <div className="sticky bottom-0 bg-white border-t p-6 z-20">
              <button
                onClick={handleSubmit}
                disabled={isSubmitted || Object.keys(selectedAnswers).length !== questions.length}
                className={`w-full py-2.5 rounded font-medium text-sm
                  ${isSubmitted
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : Object.keys(selectedAnswers).length === questions.length
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
              >
                {isSubmitted ? 'Submitted' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Add this to your global CSS or in a style tag
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translate(-50%, -80%); }
    to { opacity: 1; transform: translate(-50%, -100%); }
  }
  
  .animate-fade-in {
    animation: fadeIn 0.2s ease-out forwards;
  }
`;
