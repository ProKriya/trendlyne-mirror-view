
import React from 'react';
import { Card } from '@/components/ui/card';
import { Newspaper } from 'lucide-react';

interface NewsItem {
  date: string;
  title: string;
  source: string;
}

interface RecentNewsProps {
  news: NewsItem[];
}

const RecentNews: React.FC<RecentNewsProps> = ({ news }) => {
  return (
    <Card className="p-4 mb-6 bg-white shadow-sm">
      <div className="flex items-center mb-3">
        <Newspaper className="h-5 w-5 mr-2 text-highlight" />
        <h2 className="text-lg font-semibold">Recent News</h2>
      </div>
      
      <div className="space-y-3">
        {news.map((item, index) => (
          <div key={index} className="border-b pb-3 last:border-0">
            <div className="text-sm font-medium hover:text-highlight cursor-pointer">{item.title}</div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-neutral-600">{item.source}</span>
              <span className="text-xs text-neutral-600">{item.date}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentNews;
