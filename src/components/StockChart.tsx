
import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartDataPoint {
  date: string;
  price: number;
}

interface StockChartProps {
  chartData: {
    daily: ChartDataPoint[];
    moving_averages: {
      '50day': number;
      '200day': number;
    };
  };
}

const StockChart: React.FC<StockChartProps> = ({ chartData }) => {
  const formatData = chartData.daily.map(item => ({
    date: item.date.substring(5), // Just show MM-DD
    price: item.price
  }));

  return (
    <Card className="p-4 mb-6 bg-white shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Price Chart</h2>
        <Tabs defaultValue="1W" className="w-[300px]">
          <TabsList className="grid grid-cols-5 h-8">
            <TabsTrigger value="1D">1D</TabsTrigger>
            <TabsTrigger value="1W">1W</TabsTrigger>
            <TabsTrigger value="1M">1M</TabsTrigger>
            <TabsTrigger value="3M">3M</TabsTrigger>
            <TabsTrigger value="1Y">1Y</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={formatData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="date" tickLine={false} axisLine={false} />
            <YAxis 
              domain={['dataMin - 10', 'dataMax + 10']} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(value) => `₹${value}`} 
              orientation="right"
            />
            <Tooltip 
              formatter={(value: number) => [`₹${value.toFixed(2)}`, 'Price']}
              labelFormatter={(label) => `Date: ${label}`}
              contentStyle={{ backgroundColor: '#1e293b', color: 'white', border: 'none', borderRadius: '0.375rem' }}
              itemStyle={{ color: 'white' }}
              labelStyle={{ color: 'white' }}
            />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke="#2563eb" 
              fillOpacity={1} 
              fill="url(#colorPrice)" 
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-neutral-600">
        <div>
          <span className="block">50-Day MA:</span>
          <span className="font-medium text-black">₹{chartData.moving_averages['50day'].toFixed(2)}</span>
        </div>
        <div>
          <span className="block">200-Day MA:</span>
          <span className="font-medium text-black">₹{chartData.moving_averages['200day'].toFixed(2)}</span>
        </div>
      </div>
    </Card>
  );
};

export default StockChart;
