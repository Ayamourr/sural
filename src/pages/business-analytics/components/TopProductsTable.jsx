import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TopProductsTable = ({ products }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'votes', direction: 'desc' });

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  const sortedProducts = [...products]?.sort((a, b) => {
    if (sortConfig?.direction === 'asc') {
      return a?.[sortConfig?.key] > b?.[sortConfig?.key] ? 1 : -1;
    }
    return a?.[sortConfig?.key] < b?.[sortConfig?.key] ? 1 : -1;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Planned': return 'bg-accent/10 text-accent';
      case 'In Transit': return 'bg-warning/10 text-warning';
      case 'Available': return 'bg-success/10 text-success';
      case 'Sold Out': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getOpportunityLevel = (votes) => {
    if (votes >= 100) return { label: 'High', color: 'text-success' };
    if (votes >= 50) return { label: 'Medium', color: 'text-warning' };
    return { label: 'Low', color: 'text-muted-foreground' };
  };

  return (
    <div className="card overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Top Requested Products</h3>
        <p className="text-sm text-muted-foreground mt-1">Products with highest demand indicators</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Category
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors"
                onClick={() => handleSort('votes')}
              >
                <div className="flex items-center gap-2">
                  Votes
                  <Icon 
                    name={sortConfig?.key === 'votes' && sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
                    size={14} 
                  />
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Opportunity
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors"
                onClick={() => handleSort('conversionRate')}
              >
                <div className="flex items-center gap-2">
                  Conversion
                  <Icon 
                    name={sortConfig?.key === 'conversionRate' && sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
                    size={14} 
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedProducts?.map((product) => {
              const opportunity = getOpportunityLevel(product?.votes);
              return (
                <tr key={product?.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <Image 
                          src={product?.image} 
                          alt={product?.imageAlt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{product?.name}</p>
                        <p className="text-xs text-muted-foreground">{product?.region}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-foreground">{product?.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Icon name="ThumbsUp" size={16} className="text-primary" />
                      <span className="text-sm font-semibold text-foreground">{product?.votes}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(product?.status)}`}>
                      {product?.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium ${opportunity?.color}`}>
                      {opportunity?.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-muted rounded-full h-2 max-w-[80px]">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${product?.conversionRate}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-foreground">{product?.conversionRate}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopProductsTable;