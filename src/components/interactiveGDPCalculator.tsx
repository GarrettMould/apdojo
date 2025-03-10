'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import CoffeeLandFlag from '../../public/images/CoffeeLandFlag.png';
import NGDP2023 from '../../public/images/2023NGDP.png';
import Image from 'next/image';
import { Button } from "@/components/ui/button"

const CoffeeGDPCalculator = () => {
  const basePrice = 1;
  const baseQuantity = 100;
  const [currentPrice, setCurrentPrice] = useState(1);
  const [currentQuantity, setCurrentQuantity] = useState(100);
  
  const nominalGDP = currentPrice * currentQuantity;
  const realGDP = basePrice * currentQuantity;
  const nominalGDPChange = ((nominalGDP - (basePrice * baseQuantity)) / (basePrice * baseQuantity) * 100).toFixed(1);
  const realGDPChange = ((realGDP - (basePrice * baseQuantity)) / (basePrice * baseQuantity) * 100).toFixed(1);

  return (
    <div className="relative">
      <Card className="shadow-[0_0_20px_rgba(0,0,0,0.1)] max-w-3xl mx-auto">
        <CardHeader className="border-b-2 border-dashed border-gray-200">
          <div className="flex items-center justify-center gap-4">
            <div className="w-24 h-20 relative">
              <Image
                src={CoffeeLandFlag}
                alt="Coffee Land Flag"
                fill
                className="object-contain"
              />
            </div>
            <CardTitle>Coffee Land GDP Calculator</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 ">
            <div className="p-4 rounded-md mb-6 text-center">
              
              <div className=" relative w-full h-60">  {/* Increased height from h-40 to h-60 */}
                <Image
                  src={NGDP2023}
                  alt="2023 GDP Information"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <h4 className="font-semibold pt-6 mb-4 text-xl border-t-2 border-dashed border-gray-200">Current Year (2024)</h4>

            <div className="space-y-8">  {/* Controls spacing between all children */}
              <div>  {/* Sliders container */}
                <div>
                  <label className="block mb-4">
                    <span className="font-bold">Price:</span> ${currentPrice.toFixed(2)}
                  </label>
                  <Slider
                    value={[currentPrice]}
                    min={0.5}
                    max={5}
                    step={0.1}
                    onValueChange={(value) => setCurrentPrice(value[0])}
                  />
                </div>
                
                <div className="mt-8">  {/* Consistent spacing between sliders */}
                  <label className="block mb-4">
                    <span className="font-bold">Quantity:</span> {currentQuantity}
                  </label>
                  <Slider
                    value={[currentQuantity]}
                    min={0}
                    max={200}
                    step={5}
                    onValueChange={(value) => setCurrentQuantity(value[0])}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">  {/* GDP display */}
                <div>
                  <h4 className="font-bold">Nominal GDP</h4>
                  <p>${nominalGDP.toFixed(2)}</p>
                  <p className={`${parseFloat(nominalGDPChange) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {parseFloat(nominalGDPChange) > 0 ? '↑' : '↓'} {Math.abs(parseFloat(nominalGDPChange))}%
                  </p>
                </div>
                <div>
                  <h4 className="font-bold">Real GDP</h4>
                  <p>${realGDP.toFixed(2)}</p>
                  <p className={`${parseFloat(realGDPChange) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {parseFloat(realGDPChange) > 0 ? '↑' : '↓'} {Math.abs(parseFloat(realGDPChange))}%
                  </p>
                </div>
              </div>

              {(currentPrice !== basePrice || currentQuantity !== baseQuantity) && (
                <div className="p-4 bg-gray-100 rounded-md border-2 border-gray-200">
                  <p className="text-gray-700">
                    {currentPrice === basePrice ? (
                      // Message when only quantity changes
                      `${parseFloat(realGDPChange) > 0 ? '📈' : '📉'} Coffee Land's ${parseFloat(nominalGDPChange) > 0 ? 'increased' : 'decreased'} production of coffee led to a 
                      ${Math.abs(parseFloat(nominalGDPChange))}% change in both Nominal and Real GDP. Remember that only changes in 
                      production affect Real GDP!`
                    ) : (
                      // Message when price changes
                      `${parseFloat(realGDPChange) > 0 ? '📈' : '📉'} While nominal GDP ${parseFloat(nominalGDPChange) > 0 ? 'increased' : 'decreased'} by ${Math.abs(parseFloat(nominalGDPChange))}%, 
                      real GDP ${parseFloat(realGDPChange) > 0 ? 'increased' : 'decreased'} by ${parseFloat(realGDPChange) > 0 && parseFloat(realGDPChange) < parseFloat(nominalGDPChange) ? `only ${Math.abs(parseFloat(realGDPChange))}` : Math.abs(parseFloat(realGDPChange))}%. 
                      This shows how price changes can ${parseFloat(realGDPChange) < parseFloat(nominalGDPChange) ? 'inflate' : 'deflate'} the 
                      appearance of economic growth!`
                    )}
                  </p>
                </div>
              )}

              <div className="text-center">
                <Button
                  size="lg"
                  onClick={() => {
                    setCurrentPrice(1);
                    setCurrentQuantity(100);
                  }}
                >
                  Reset Values
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoffeeGDPCalculator;