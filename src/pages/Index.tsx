
import React from 'react';
import stockData from '@/data/stockData.json';
import StockHeader from '@/components/StockHeader';
import StockChart from '@/components/StockChart';
import KeyMetrics from '@/components/KeyMetrics';
import CompanyInfo from '@/components/CompanyInfo';
import StockSignals from '@/components/StockSignals';
import PeerComparison from '@/components/PeerComparison';
import RecentNews from '@/components/RecentNews';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <StockHeader 
          companyInfo={stockData.companyInfo} 
          stockPrice={stockData.stockPrice} 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <StockChart chartData={stockData.chartData} />
            <KeyMetrics 
              keyRatios={stockData.keyRatios} 
              financials={stockData.financials} 
            />
            <CompanyInfo companyInfo={stockData.companyInfo} />
          </div>
          
          <div className="lg:col-span-1">
            <StockSignals 
              stockSignals={stockData.stockSignals} 
              currentPrice={stockData.stockPrice.current} 
            />
            <PeerComparison peers={stockData.peers} />
            <RecentNews news={stockData.recentNews} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
