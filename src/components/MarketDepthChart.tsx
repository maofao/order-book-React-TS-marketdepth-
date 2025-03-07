import React from 'react';
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, Tooltip, ReferenceLine, XAxis, YAxis, Legend } from 'recharts';
import { MarketDepthChartProps } from '../types/types';

const MarketDepthChart: React.FC<MarketDepthChartProps> = ({ data, hoveredPrice }) => {
  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const bidVolume = payload.find((p: any) => p.dataKey === 'bidVolume')?.value || 0;
      const askVolume = payload.find((p: any) => p.dataKey === 'askVolume')?.value || 0;
      return (
        <div className="p-2 bg-white border border-gray-200 rounded shadow-md">
          <p className="font-semibold text-gray-800">Price: {label.toLocaleString()}</p>
          <p className="text-green-600">Bids: {bidVolume.toLocaleString()}</p>
          <p className="text-red-600">Asks: {askVolume.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  console.log('Chart Data in Component:', data);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e8ecef" />
        <XAxis
          dataKey="price"
          tickFormatter={(value) => value.toLocaleString()}
          stroke="#a0aec0"
          tick={{ fill: '#718096', fontSize: 12 }}
        />
        <YAxis
          tickFormatter={(value) => value.toLocaleString()}
          stroke="#a0aec0"
          tick={{ fill: '#718096', fontSize: 12 }}
        />
        <Tooltip content={customTooltip} />
        <Legend verticalAlign="top" height={36} />
        <Area
          type="step"
          dataKey="bidVolume"
          name="Bids"
          stroke="#38a169"
          fill="#38a169"
          fillOpacity={0.3}
          strokeWidth={2}
          isAnimationActive={false}
        />
        <Area
          type="step"
          dataKey="askVolume"
          name="Asks"
          stroke="#e53e3e"
          fill="#e53e3e"
          fillOpacity={0.3}
          strokeWidth={2}
          isAnimationActive={false}
        />
        {hoveredPrice && (
          <ReferenceLine
            x={hoveredPrice}
            stroke="#1e88e5"
            strokeDasharray="3 3"
            strokeWidth={1.5}
            label={{
              value: hoveredPrice.toLocaleString(),
              position: 'top',
              fill: '#1e88e5',
              fontSize: 12,
            }}
          />
        )}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default MarketDepthChart;