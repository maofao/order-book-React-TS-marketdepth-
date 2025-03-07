export type OrderLevel = {
    price: number;
    volume: number;
  };
  
  export type TableData = {
    bids: OrderLevel[];
    asks: OrderLevel[];
    maxVolume: number;
  };
  
  export type ChartData = {
    price: number;
    bidVolume: number;
    askVolume: number;
  };
  
  export interface MarketDepthProps {
    onPriceSelect?: (price: number) => void;
  }
  
  export interface MarketDepthTableProps {
    bids: OrderLevel[];
    asks: OrderLevel[];
    maxVolume: number;
    onHoverPrice: (price: number | null) => void;
    onPriceClick: (price: number) => void;
  }
  
  export interface MarketDepthChartProps {
    data: ChartData[];
    hoveredPrice: number | null;
  }