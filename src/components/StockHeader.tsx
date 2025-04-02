
import React from 'react';
import { Card } from '@/components/ui/card';
import { ArrowDown, ArrowUp, Clock } from 'lucide-react';

interface StockHeaderProps {
  companyInfo: {
    name: string;
    ticker: string;
    sector: string;
  };
  stockPrice: {
    current: number;
    change: number;
    percentChange: number;
    date: string;
    time: string;
  };
}

const StockHeader: React.FC<StockHeaderProps> = ({ companyInfo, stockPrice }) => {
  const isPositive = stockPrice.change >= 0;

  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
        <div>
          <h1 className="text-2xl font-bold">{companyInfo.name}</h1>
          <p className="text-neutral-600 text-sm">NSE: {companyInfo.ticker} | {companyInfo.sector}</p>
        </div>
        <div className="flex items-center mt-2 md:mt-0">
          <Clock className="h-4 w-4 text-neutral-400 mr-1" />
          <span className="text-sm text-neutral-600">{stockPrice.date} | {stockPrice.time}</span>
        </div>
      </div>
      
      <Card className="p-4 bg-white shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="flex items-center">
            <div className="text-3xl font-bold">₹{stockPrice.current.toFixed(2)}</div>
            <div className={`ml-3 flex items-center ${isPositive ? 'text-positive' : 'text-negative'}`}>
              {isPositive ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
              <span className="font-medium">₹{Math.abs(stockPrice.change).toFixed(2)}</span>
              <span className="ml-1 font-medium">({stockPrice.percentChange.toFixed(2)}%)</span>
            </div>
          </div>
          <div className="mt-2 sm:mt-0 flex items-center space-x-3">
            <div className="text-sm">
              <span className="text-neutral-600">Market Cap:</span>
              <span className="ml-1 font-medium">₹{(stockPrice.current * 77.89).toFixed(2)} Cr</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StockHeader;
