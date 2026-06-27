import React from 'react';

export interface PremiumChartProps {
  dataPoints: number[];
  labels: string[];
  color: string;
  title: string;
}

export const PremiumCharts: React.FC<PremiumChartProps> = ({ dataPoints, labels, color, title }) => {
  const maxVal = Math.max(...dataPoints, 100);

  return (
    <div className="p-6 bg-slate-900 rounded-xl shadow-lg border border-slate-700">
      <h3 className="text-lg font-bold text-slate-200 mb-6">{title}</h3>
      <div className="flex items-end space-x-2 h-48 w-full">
        {dataPoints.map((val, idx) => {
          const heightPct = (val / maxVal) * 100;
          return (
            <div key={idx} className="flex flex-col items-center flex-1 group">
              {/* Tooltip on hover */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-white bg-slate-800 p-1 rounded mb-2 absolute -mt-8">
                {val}
              </div>
              
              {/* Bar */}
              <div
                className="w-full rounded-t-sm transition-all duration-500 ease-in-out"
                style={{ height: `${heightPct}%`, backgroundColor: color }}
              />
              
              {/* Label */}
              <span className="text-[10px] text-slate-500 mt-2 rotate-45 origin-top-left">{labels[idx]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
