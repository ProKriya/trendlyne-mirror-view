
import React from 'react';
import { Card } from '@/components/ui/card';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface PeerComparisonProps {
  peers: {
    name: string;
    ticker: string;
    price: number;
    change: number;
  }[];
}

const PeerComparison: React.FC<PeerComparisonProps> = ({ peers }) => {
  return (
    <Card className="p-4 mb-6 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Peer Comparison</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-neutral-600">
              <th className="text-left p-2">Company</th>
              <th className="text-right p-2">Price</th>
              <th className="text-right p-2">Change</th>
            </tr>
          </thead>
          <tbody>
            {peers.map((peer, index) => {
              const isPositive = peer.change >= 0;
              
              return (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-2">
                    <div className="font-medium">{peer.name}</div>
                    <div className="text-xs text-neutral-600">{peer.ticker}</div>
                  </td>
                  <td className="text-right p-2 font-medium">₹{peer.price.toFixed(2)}</td>
                  <td className={`text-right p-2 font-medium ${isPositive ? 'text-positive' : 'text-negative'}`}>
                    <div className="flex items-center justify-end">
                      {isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                      {peer.change.toFixed(2)}%
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default PeerComparison;
