import React from 'react';
import { Table, Tag, Tooltip } from 'antd';
import { MarketDepthTableProps } from '../types/types';

const MarketDepthTable: React.FC<MarketDepthTableProps> = ({
  bids,
  asks,
  maxVolume,
  onHoverPrice,
  onPriceClick,
}) => {
  const formatNumber = (num: number) => num.toLocaleString(undefined, { maximumFractionDigits: 2 });

  const bidColumns = [
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => (
        <Tooltip title={`Price: ${formatNumber(price)}`}>
          <Tag color="green" className="font-medium">
            {formatNumber(price)}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: 'Volume',
      dataIndex: 'volume',
      key: 'volume',
      align: 'center' as const,
      render: (volume: number) => (
        <Tooltip title={`Volume: ${formatNumber(volume)}`}>
          {formatNumber(volume)}
        </Tooltip>
      ),
    },
    {
      title: 'Total',
      key: 'total',
      align: 'right' as const,
      render: (_: any, record: any, index: number) => {
        const total = bids.slice(0, index + 1).reduce((sum, b) => sum + b.volume, 0);
        return (
          <Tooltip title={`Total: ${formatNumber(total)}`}>
            {formatNumber(total)}
          </Tooltip>
        );
      },
    },
  ];

  const askColumns = [
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => (
        <Tooltip title={`Price: ${formatNumber(price)}`}>
          <Tag color="red" className="font-medium">
            {formatNumber(price)}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: 'Volume',
      dataIndex: 'volume',
      key: 'volume',
      align: 'center' as const,
      render: (volume: number) => (
        <Tooltip title={`Volume: ${formatNumber(volume)}`}>
          {formatNumber(volume)}
        </Tooltip>
      ),
    },
    {
      title: 'Total',
      key: 'total',
      align: 'right' as const,
      render: (_: any, record: any, index: number) => {
        const total = asks.slice(0, index + 1).reduce((sum, a) => sum + a.volume, 0);
        return (
          <Tooltip title={`Total: ${formatNumber(total)}`}>
            {formatNumber(total)}
          </Tooltip>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <Table
        dataSource={bids}
        columns={bidColumns}
        pagination={false}
        size="small"
        rowKey="price"
        scroll={{ y: '200px' }}
        className="flex-1"
        rowClassName="cursor-pointer hover:bg-gray-50"
        onRow={(record) => ({
          onMouseEnter: () => onHoverPrice(record.price),
          onMouseLeave: () => onHoverPrice(null),
          onClick: () => onPriceClick(record.price),
        })}
      />
      <Table
        dataSource={asks}
        columns={askColumns}
        pagination={false}
        size="small"
        rowKey="price"
        scroll={{ y: '200px' }}
        className="flex-1"
        rowClassName="cursor-pointer hover:bg-gray-50"
        onRow={(record) => ({
          onMouseEnter: () => onHoverPrice(record.price),
          onMouseLeave: () => onHoverPrice(null),
          onClick: () => onPriceClick(record.price),
        })}
      />
    </div>
  );
};

export default MarketDepthTable;