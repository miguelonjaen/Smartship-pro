import React from 'react';
import { cn } from '../lib/utils';

interface DataItem {
    label: string;
    value: string;
    unit?: string;
}

export const BasicDataPage = ({ title, items }: { title: string, items: DataItem[] }) => {
  return (
    <div className="w-full h-full bg-black flex flex-col p-px bg-white/5">
      <div className="bg-black p-2 flex justify-center">
          <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.3em]">{title}</span>
      </div>
      
      <div className={cn(
          "flex-grow grid grid-rows-2 gap-px bg-white/10",
          items.length > 2 && "grid-cols-2"
      )}>
          {items.map((item, idx) => (
              <div key={idx} className="bg-black flex flex-col items-center justify-center p-4">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{item.label}</span>
                  <div className="text-5xl font-black text-white font-mono leading-none tracking-tighter">
                      {item.value}
                      {item.unit && <span className="text-xl ml-1 text-slate-600">{item.unit}</span>}
                  </div>
              </div>
          ))}
      </div>
    </div>
  );
};
