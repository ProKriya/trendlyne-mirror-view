
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDown, ArrowUp, TrendingUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DerivativeDataProps {
  derivativeData: {
    expiry: string;
    summary: {
      spotPrice: number;
      futurePrice: number;
      premium: number;
      premiumPercent: number;
      openInterest: number;
      openInterestChange: number;
      openInterestChangePercent: number;
      volume: number;
      impliedVolatility: number;
    };
    futuresChain: {
      expiryDate: string;
      label: string;
      price: number;
      change: number;
      changePercent: number;
      openInterest: number;
      oiChange: number;
      oiChangePercent: number;
      volume: number;
    }[];
    optionsData: {
      callOptions: {
        strikePrice: number;
        lastPrice: number;
        change: number;
        changePercent: number;
        openInterest: number;
        volume: number;
      }[];
      putOptions: {
        strikePrice: number;
        lastPrice: number;
        change: number;
        changePercent: number;
        openInterest: number;
        volume: number;
      }[];
    };
  };
}

const DerivativeData: React.FC<DerivativeDataProps> = ({ derivativeData }) => {
  const formatNumber = (num: number) => {
    if (num >= 10000000) {
      return (num / 10000000).toFixed(2) + ' Cr';
    } else if (num >= 100000) {
      return (num / 100000).toFixed(2) + ' L';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(2) + ' K';
    }
    return num.toString();
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-highlight" />
            Derivative Summary ({derivativeData.expiry})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-neutral-600">Spot Price</span>
                <span className="font-medium">₹{derivativeData.summary.spotPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-neutral-600">Future Price</span>
                <span className="font-medium">₹{derivativeData.summary.futurePrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-neutral-600">Premium</span>
                <span className="font-medium">₹{derivativeData.summary.premium.toFixed(2)} ({derivativeData.summary.premiumPercent.toFixed(2)}%)</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-neutral-600">Open Interest</span>
                <span className="font-medium">{formatNumber(derivativeData.summary.openInterest)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-neutral-600">OI Change</span>
                <span className={`font-medium ${derivativeData.summary.openInterestChange >= 0 ? 'text-positive' : 'text-negative'}`}>
                  {derivativeData.summary.openInterestChange >= 0 ? (
                    <ArrowUp className="h-3 w-3 inline mr-1" />
                  ) : (
                    <ArrowDown className="h-3 w-3 inline mr-1" />
                  )}
                  {formatNumber(Math.abs(derivativeData.summary.openInterestChange))} ({derivativeData.summary.openInterestChangePercent.toFixed(2)}%)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-neutral-600">Volume</span>
                <span className="font-medium">{formatNumber(derivativeData.summary.volume)}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-neutral-600">Implied Volatility</span>
                <span className="font-medium">{derivativeData.summary.impliedVolatility.toFixed(2)}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Futures Chain</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-neutral-600">
                  <th className="text-left p-2">Expiry</th>
                  <th className="text-right p-2">Price</th>
                  <th className="text-right p-2">Change</th>
                  <th className="text-right p-2">OI</th>
                  <th className="text-right p-2">OI Change</th>
                  <th className="text-right p-2">Volume</th>
                </tr>
              </thead>
              <tbody>
                {derivativeData.futuresChain.map((future, index) => {
                  const isPositiveChange = future.change >= 0;
                  const isPositiveOI = future.oiChange >= 0;
                  
                  return (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-2">
                        <div className="font-medium">{future.expiryDate}</div>
                        <div className="text-xs text-neutral-600">{future.label}</div>
                      </td>
                      <td className="text-right p-2 font-medium">₹{future.price.toFixed(2)}</td>
                      <td className={`text-right p-2 font-medium ${isPositiveChange ? 'text-positive' : 'text-negative'}`}>
                        <div className="flex items-center justify-end">
                          {isPositiveChange ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                          {future.change.toFixed(2)} ({future.changePercent.toFixed(2)}%)
                        </div>
                      </td>
                      <td className="text-right p-2 font-medium">{formatNumber(future.openInterest)}</td>
                      <td className={`text-right p-2 font-medium ${isPositiveOI ? 'text-positive' : 'text-negative'}`}>
                        <div className="flex items-center justify-end">
                          {isPositiveOI ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                          {formatNumber(Math.abs(future.oiChange))} ({future.oiChangePercent.toFixed(2)}%)
                        </div>
                      </td>
                      <td className="text-right p-2 font-medium">{formatNumber(future.volume)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Options Chain</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="call">
            <TabsList className="mb-4">
              <TabsTrigger value="call" className="text-sm">Call Options</TabsTrigger>
              <TabsTrigger value="put" className="text-sm">Put Options</TabsTrigger>
            </TabsList>
            
            <TabsContent value="call">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-neutral-600">
                      <th className="text-left p-2">Strike Price</th>
                      <th className="text-right p-2">Last Price</th>
                      <th className="text-right p-2">Change</th>
                      <th className="text-right p-2">OI</th>
                      <th className="text-right p-2">Volume</th>
                    </tr>
                  </thead>
                  <tbody>
                    {derivativeData.optionsData.callOptions.map((option, index) => {
                      const isPositive = option.change >= 0;
                      
                      return (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-2 font-medium">₹{option.strikePrice.toFixed(2)}</td>
                          <td className="text-right p-2 font-medium">₹{option.lastPrice.toFixed(2)}</td>
                          <td className={`text-right p-2 font-medium ${isPositive ? 'text-positive' : 'text-negative'}`}>
                            <div className="flex items-center justify-end">
                              {isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                              {Math.abs(option.change).toFixed(2)} ({Math.abs(option.changePercent).toFixed(2)}%)
                            </div>
                          </td>
                          <td className="text-right p-2 font-medium">{formatNumber(option.openInterest)}</td>
                          <td className="text-right p-2 font-medium">{formatNumber(option.volume)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="put">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-neutral-600">
                      <th className="text-left p-2">Strike Price</th>
                      <th className="text-right p-2">Last Price</th>
                      <th className="text-right p-2">Change</th>
                      <th className="text-right p-2">OI</th>
                      <th className="text-right p-2">Volume</th>
                    </tr>
                  </thead>
                  <tbody>
                    {derivativeData.optionsData.putOptions.map((option, index) => {
                      const isPositive = option.change >= 0;
                      
                      return (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-2 font-medium">₹{option.strikePrice.toFixed(2)}</td>
                          <td className="text-right p-2 font-medium">₹{option.lastPrice.toFixed(2)}</td>
                          <td className={`text-right p-2 font-medium ${isPositive ? 'text-positive' : 'text-negative'}`}>
                            <div className="flex items-center justify-end">
                              {isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                              {Math.abs(option.change).toFixed(2)} ({Math.abs(option.changePercent).toFixed(2)}%)
                            </div>
                          </td>
                          <td className="text-right p-2 font-medium">{formatNumber(option.openInterest)}</td>
                          <td className="text-right p-2 font-medium">{formatNumber(option.volume)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DerivativeData;
