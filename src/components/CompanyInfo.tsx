
import React from 'react';
import { Card } from '@/components/ui/card';
import { Info } from 'lucide-react';

interface CompanyInfoProps {
  companyInfo: {
    name: string;
    ticker: string;
    sector: string;
    industry: string;
    listing: string;
    isin: string;
    description: string;
  };
}

const CompanyInfo: React.FC<CompanyInfoProps> = ({ companyInfo }) => {
  return (
    <Card className="p-4 mb-6 bg-white shadow-sm">
      <div className="flex items-center mb-3">
        <Info className="h-5 w-5 mr-2 text-highlight" />
        <h2 className="text-lg font-semibold">Company Overview</h2>
      </div>
      
      <p className="text-sm text-neutral-700 mb-4">{companyInfo.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-neutral-600">Sector</span>
            <span className="font-medium">{companyInfo.sector}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-neutral-600">Industry</span>
            <span className="font-medium">{companyInfo.industry}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-neutral-600">Listed On</span>
            <span className="font-medium">{companyInfo.listing}</span>
          </div>
        </div>
        <div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-neutral-600">NSE Symbol</span>
            <span className="font-medium">{companyInfo.ticker}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-neutral-600">BSE Code</span>
            <span className="font-medium">532187</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-neutral-600">ISIN</span>
            <span className="font-medium">{companyInfo.isin}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CompanyInfo;
