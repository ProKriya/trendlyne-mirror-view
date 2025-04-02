
import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface KeyRatios {
  pe: number;
  pbv: number;
  roe: number;
  eps: number;
  dividend: {
    yield: number;
    payout: number;
  };
  debtToEquity: number;
}

interface Financials {
  quarterly: {
    periods: string[];
    revenue: number[];
    netProfit: number[];
    netInterestIncome: number[];
  };
  annual: {
    periods: string[];
    revenue: number[];
    netProfit: number[];
    netInterestIncome: number[];
  };
}

interface KeyMetricsProps {
  keyRatios: KeyRatios;
  financials: Financials;
}

const KeyMetrics: React.FC<KeyMetricsProps> = ({ keyRatios, financials }) => {
  return (
    <Card className="p-4 mb-6 bg-white shadow-sm">
      <Tabs defaultValue="ratios">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="ratios">Key Ratios</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
        </TabsList>
        
        <TabsContent value="ratios">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-3 bg-gray-50 rounded-md">
              <div className="text-sm text-neutral-600">P/E Ratio</div>
              <div className="text-xl font-bold">{keyRatios.pe.toFixed(2)}</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-md">
              <div className="text-sm text-neutral-600">Price to Book</div>
              <div className="text-xl font-bold">{keyRatios.pbv.toFixed(2)}</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-md">
              <div className="text-sm text-neutral-600">ROE</div>
              <div className="text-xl font-bold">{keyRatios.roe.toFixed(2)}%</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-md">
              <div className="text-sm text-neutral-600">EPS (TTM)</div>
              <div className="text-xl font-bold">₹{keyRatios.eps.toFixed(2)}</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-md">
              <div className="text-sm text-neutral-600">Dividend Yield</div>
              <div className="text-xl font-bold">{keyRatios.dividend.yield.toFixed(2)}%</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-md">
              <div className="text-sm text-neutral-600">Debt to Equity</div>
              <div className="text-xl font-bold">{keyRatios.debtToEquity.toFixed(2)}</div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="financials">
          <Tabs defaultValue="quarterly">
            <TabsList className="grid grid-cols-2 mb-4 w-[200px]">
              <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
              <TabsTrigger value="annual">Annual</TabsTrigger>
            </TabsList>
            
            <TabsContent value="quarterly">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Period</th>
                      {financials.quarterly.periods.map((period, i) => (
                        <th key={i} className="text-right p-2">{period}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="text-left p-2 font-medium">Revenue (Cr)</td>
                      {financials.quarterly.revenue.map((val, i) => (
                        <td key={i} className="text-right p-2">₹{val.toFixed(2)}</td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="text-left p-2 font-medium">Net Profit (Cr)</td>
                      {financials.quarterly.netProfit.map((val, i) => (
                        <td key={i} className="text-right p-2">₹{val.toFixed(2)}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="text-left p-2 font-medium">Net Interest Income (Cr)</td>
                      {financials.quarterly.netInterestIncome.map((val, i) => (
                        <td key={i} className="text-right p-2">₹{val.toFixed(2)}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="annual">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Period</th>
                      {financials.annual.periods.map((period, i) => (
                        <th key={i} className="text-right p-2">{period}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="text-left p-2 font-medium">Revenue (Cr)</td>
                      {financials.annual.revenue.map((val, i) => (
                        <td key={i} className="text-right p-2">₹{val.toFixed(2)}</td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="text-left p-2 font-medium">Net Profit (Cr)</td>
                      {financials.annual.netProfit.map((val, i) => (
                        <td key={i} className="text-right p-2">₹{val.toFixed(2)}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="text-left p-2 font-medium">Net Interest Income (Cr)</td>
                      {financials.annual.netInterestIncome.map((val, i) => (
                        <td key={i} className="text-right p-2">₹{val.toFixed(2)}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default KeyMetrics;
