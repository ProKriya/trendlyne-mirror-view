
import React from 'react';
import { Card } from '@/components/ui/card';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface StockSignal {
  name: string;
  value: string | number;
  signal: string;
}

interface StockSignalsProps {
  stockSignals: {
    technical: StockSignal[];
    fundamentalRating: string;
    valueRating: string;
    momentumSignal: string;
    analystRecommendations: {
      buy: number;
      hold: number;
      sell: number;
      targetPrice: number;
    };
    upside: number;
    riskRating: string;
  };
  currentPrice: number;
}

const StockSignals: React.FC<StockSignalsProps> = ({ stockSignals, currentPrice }) => {
  const { analystRecommendations } = stockSignals;
  const total = analystRecommendations.buy + analystRecommendations.hold + analystRecommendations.sell;
  
  const buyPercentage = (analystRecommendations.buy / total) * 100;
  const holdPercentage = (analystRecommendations.hold / total) * 100;
  const sellPercentage = (analystRecommendations.sell / total) * 100;
  
  const getSignalIcon = (signal: string) => {
    switch(signal) {
      case 'Buy':
        return <CheckCircle className="h-4 w-4 text-positive" />;
      case 'Neutral':
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case 'Sell':
        return <XCircle className="h-4 w-4 text-negative" />;
      default:
        return null;
    }
  };

  return (
    <Card className="p-4 mb-6 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Stock Signals & Recommendations</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium mb-3">Technical Indicators</h3>
          <div className="space-y-3">
            {stockSignals.technical.map((signal, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-neutral-600">{signal.name}</span>
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-2">{signal.value}</span>
                  {getSignalIcon(signal.signal)}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-3">Key Ratings</h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 bg-gray-50 rounded text-center">
                <div className="text-xs text-neutral-600">Fundamental</div>
                <div className="font-medium text-positive">{stockSignals.fundamentalRating}</div>
              </div>
              <div className="p-2 bg-gray-50 rounded text-center">
                <div className="text-xs text-neutral-600">Value</div>
                <div className="font-medium text-amber-500">{stockSignals.valueRating}</div>
              </div>
              <div className="p-2 bg-gray-50 rounded text-center">
                <div className="text-xs text-neutral-600">Momentum</div>
                <div className="font-medium text-positive">{stockSignals.momentumSignal}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-3">Analyst Recommendations</h3>
          <div className="flex items-center mb-1">
            <div className="w-16 text-xs text-neutral-600">Buy</div>
            <div className="flex-1">
              <Progress value={buyPercentage} className="h-2 bg-gray-100" indicatorClassName="bg-positive" />
            </div>
            <div className="w-6 text-xs font-medium ml-2">{analystRecommendations.buy}</div>
          </div>
          <div className="flex items-center mb-1">
            <div className="w-16 text-xs text-neutral-600">Hold</div>
            <div className="flex-1">
              <Progress value={holdPercentage} className="h-2 bg-gray-100" indicatorClassName="bg-amber-500" />
            </div>
            <div className="w-6 text-xs font-medium ml-2">{analystRecommendations.hold}</div>
          </div>
          <div className="flex items-center mb-4">
            <div className="w-16 text-xs text-neutral-600">Sell</div>
            <div className="flex-1">
              <Progress value={sellPercentage} className="h-2 bg-gray-100" indicatorClassName="bg-negative" />
            </div>
            <div className="w-6 text-xs font-medium ml-2">{analystRecommendations.sell}</div>
          </div>
          
          <div className="p-3 bg-gray-50 rounded mb-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-neutral-600">Target Price</span>
              <span className="text-sm font-medium">₹{analystRecommendations.targetPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-sm text-neutral-600">Potential Upside</span>
              <span className="text-sm font-medium text-positive">+{stockSignals.upside.toFixed(2)}%</span>
            </div>
          </div>
          
          <div className="p-3 bg-gray-50 rounded">
            <div className="flex justify-between items-center">
              <span className="text-sm text-neutral-600">Risk Rating</span>
              <span className="text-sm font-medium text-amber-500">{stockSignals.riskRating}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StockSignals;
