import React, { useState, useCallback, useEffect } from 'react';
import { ConfigProvider, Button, Card, Space } from 'antd';
import MarketDepthTable from './components/MarketDepthOrderList.tsx';
import MarketDepthChart from './components/MarketDepthChart.tsx';
import { MarketDepthProps, TableData, ChartData, OrderLevel } from './types/types';

const generateMockData = (basePrice: number = 100): { bids: OrderLevel[], asks: OrderLevel[], maxVolume: number, chart: ChartData[] } => {
  const bids: OrderLevel[] = Array.from({ length: 20 }, (_, i) => ({
    price: basePrice - i * 0.5 + (Math.random() - 0.5) * 0.2,
    volume: Math.random() * 1000 + 100,
  })).sort((a, b) => b.price - a.price);

  const asks: OrderLevel[] = Array.from({ length: 20 }, (_, i) => ({
    price: basePrice + i * 0.5 + (Math.random() - 0.5) * 0.2,
    volume: Math.random() * 1000 + 100,
  })).sort((a, b) => a.price - b.price);

  const maxVolume = Math.max(...bids.map(b => b.volume), ...asks.map(a => a.volume));

  const chart: ChartData[] = [
    ...bids.map(b => ({ price: b.price, bidVolume: b.volume, askVolume: 0 })),
    ...asks.map(a => ({ price: a.price, bidVolume: 0, askVolume: a.volume })),
  ];

  console.log('Generated Chart Data:', chart);

  return { bids, asks, maxVolume, chart };
};

const MarketDepth: React.FC<MarketDepthProps> = ({ onPriceSelect }) => {
  const [mode, setMode] = useState<'table' | 'chart'>('table');
  const [tableData, setTableData] = useState<TableData>({ bids: [], asks: [], maxVolume: 0 });
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [hoveredPrice, setHoveredPrice] = useState<number | null>(null);
  const [basePrice, setBasePrice] = useState(100);

  useEffect(() => {
    const { bids, asks, maxVolume, chart } = generateMockData(basePrice);
    setTableData({ bids, asks, maxVolume });
    setChartData(chart);
  }, [basePrice]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBasePrice(prev => prev + (Math.random() - 0.5) * 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const toggleMode = useCallback(() => setMode(prev => (prev === 'table' ? 'chart' : 'table')), []);

  const handlePriceClick = useCallback((price: number) => {
    if (onPriceSelect) onPriceSelect(price);
  }, [onPriceSelect]);

  console.log('Current Chart Data:', chartData);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1e88e5',
          borderRadius: 6,
          colorBgContainer: '#ffffff',
          colorText: '#2d3748',
        },
        components: {
          Card: {
            headerBg: '#f7fafc',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          },
          Button: {
            primaryColor: '#fff',
            defaultBg: '#1e88e5',
          },
        },
      }}
    >
      <Card
        title={
          <Space>
            <span className="text-lg font-semibold">Market Depth: BTC/USD</span>
            <Button
              type="primary"
              size="small"
              shape="round"
              onClick={toggleMode}
            >
              {mode === 'table' ? 'Chart' : 'Table'}
            </Button>
          </Space>
        }
        className="max-w-3xl mx-auto my-4"
        styles={{ body: { padding: 0 }, header: { padding: '12px 16px' } }}
      >
        <div style={{ height: '450px', width: '100%' }}>
          {mode === 'table' ? (
            tableData.bids.length || tableData.asks.length ? (
              <MarketDepthTable
                bids={tableData.bids}
                asks={tableData.asks}
                maxVolume={tableData.maxVolume}
                onHoverPrice={setHoveredPrice}
                onPriceClick={handlePriceClick}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Loading mock data...
              </div>
            )
          ) : (
            chartData.length ? (
              <MarketDepthChart data={chartData} hoveredPrice={hoveredPrice} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No chart data available
              </div>
            )
          )}
        </div>
      </Card>
    </ConfigProvider>
  );
};

export { MarketDepth };