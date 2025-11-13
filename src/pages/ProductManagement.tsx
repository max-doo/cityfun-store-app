// 商品管理：商品资料、库存管理、库存记录、商品设置
import React, { useState, useMemo, useRef, useEffect } from 'react'
import { NavBar, Tabs, List, Tag, Card, Grid, Input, Button } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import { products, stockRecords, productSettings } from '../mock/data'
import DateRangePicker from '../components/DateRangePicker'
import ExportButton from '../components/ExportButton'

const ProductManagement: React.FC = () => {
  const navigate = useNavigate()
  const [activeKey, setActiveKey] = useState('stock')
  const [searchValue, setSearchValue] = useState('')
  const [searchProduct, setSearchProduct] = useState('')
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [bottomHeight, setBottomHeight] = useState(160)
  const bottomRef = useRef<HTMLDivElement>(null)

  // 动态计算底部查询区域的高度
  useEffect(() => {
    const updateHeight = () => {
      if (bottomRef.current) {
        const height = bottomRef.current.offsetHeight
        setBottomHeight(height + 10)
      }
    }
    
    const timer = setTimeout(updateHeight, 100)
    window.addEventListener('resize', updateHeight)
    
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', updateHeight)
    }
  }, [])

  // 处理查询按钮点击
  const handleSearch = () => {
    setSearchProduct(searchValue)
  }

  // 获取库存状态
  const getStockStatus = (stock: number) => {
    if (stock < 50) return { text: '库存不足', color: 'danger' as const }
    if (stock < 100) return { text: '库存偏低', color: 'warning' as const }
    return { text: '库存充足', color: 'success' as const }
  }

  // 筛选商品信息
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (searchProduct && !product.name.includes(searchProduct) && !product.category.includes(searchProduct)) {
        return false
      }
      return true
    })
  }, [searchProduct])

  // 筛选库存记录
  const filteredStockRecords = useMemo(() => {
    return stockRecords.filter(record => {
      if (searchProduct && !record.productName.includes(searchProduct)) {
        return false
      }
      
      if (startDate && endDate) {
        const recordDate = new Date(record.time)
        const start = new Date(startDate)
        start.setHours(0, 0, 0, 0)
        const end = new Date(endDate)
        end.setHours(23, 59, 59, 999)
        
        if (recordDate < start || recordDate > end) {
          return false
        }
      }
      
      return true
    })
  }, [searchProduct, startDate, endDate])

  // 商品数据概览配置
  const overviewData = useMemo(() => [
    { label: '总商品', value: products.length },
    { label: '库存预警', value: products.filter(p => p.stock < 50).length },
    { label: '总库存', value: products.reduce((sum, p) => sum + p.stock, 0) },
    { label: '总销售额', value: products.reduce((sum, p) => sum + p.sales * p.price, 0) },
  ], [])

  // 导出按钮配置
  const tabs = [
    { key: 'stock', title: '库存管理' },
    { key: 'records', title: '库存记录' },
    { key: 'info', title: '商品资料' },
    { key: 'settings', title: '商品设置' }
  ]

  const dataMap = {
    info: filteredProducts,
    stock: filteredProducts,
    records: filteredStockRecords,
    settings: productSettings
  }

  return (
    <div className="page-container page-with-fixed-navbar">
      <NavBar onBack={() => navigate(-1)}>商品管理</NavBar>
      
      <Tabs activeKey={activeKey} onChange={setActiveKey}>
        {/* 库存管理标签页 */}
        <Tabs.Tab title="库存管理" key="stock">
          <div className="page-content">
            {/* 商品数据概览 */}
            <Card className="mb-3">
              <div className="flex items-center justify-between mb-3">
                <div className="text-[14px] font-semibold">商品数据概览</div>
                <button
                  onClick={() => navigate('/analysis?tab=inventory')}
                  className="text-primary text-sm flex items-center gap-1 hover:opacity-80 active:opacity-60"
                >
                  查看详细分析&gt;&gt;
                </button>
              </div>
              <Grid columns={4} gap={8}>
                {overviewData.map((item, index) => (
                  <Grid.Item key={index}>
                    <div className="text-center p-2">
                      <div className="text-2xl font-semibold text-primary mb-1">
                        {typeof item.value === 'number' && item.value > 1000 
                          ? `¥${(item.value / 1000).toFixed(1)}k`
                          : item.value}
                      </div>
                      <div className="text-[11px] text-gray-500">{item.label}</div>
                    </div>
                  </Grid.Item>
                ))}
              </Grid>
            </Card>

            {/* 库存预警 */}
            <Card className="mb-3 bg-yellow-50 border border-yellow-200">
              <div className="text-xs text-yellow-800">
                ⚠️ 有 {products.filter(p => p.stock < 50).length} 件商品库存不足，建议及时补货
              </div>
            </Card>

            {/* 库存列表 */}
            <div className="section-title">库存列表</div>
            <List style={{ paddingBottom: `${bottomHeight}px` }}>
              {filteredProducts.map(product => {
                const stockStatus = getStockStatus(product.stock)
                return (
                  <List.Item
                    key={product.id}
                    description={
                      <div className="mt-1">
                        <div className="text-xs text-gray-500 mb-0.5">
                          分类：{product.category}
                        </div>
                        <div className="text-xs text-gray-500">
                          已售：{product.sales}件 | 库存价值：¥{product.stock * product.price}
                        </div>
                      </div>
                    }
                    extra={
                      <div className="text-right">
                        <div className="text-base font-semibold text-primary mb-1">
                          {product.stock}件
                        </div>
                        <Tag color={stockStatus.color} fill='outline'>
                          {stockStatus.text}
                        </Tag>
                      </div>
                    }
                  >
                    <div className="text-sm font-medium">{product.name}</div>
                  </List.Item>
                )
              })}
            </List>
          </div>
        </Tabs.Tab>

        {/* 库存记录标签页 */}
        <Tabs.Tab title="库存记录" key="records">
          <List style={{ paddingBottom: `${bottomHeight}px` }}>
            {filteredStockRecords.map(record => (
              <List.Item
                key={record.id}
                description={
                  <div className="mt-1">
                    <div className="text-xs text-gray-500 mb-0.5">
                      {record.operator} | {record.time}
                    </div>
                    <div className="text-xs text-gray-500">
                      库存变化：{record.beforeStock} → {record.afterStock} | 备注：{record.remark}
                    </div>
                  </div>
                }
                extra={
                  <div className="text-right">
                    <Tag 
                      color={record.type === '入库' ? 'success' : 'warning'} 
                      fill='outline' 
                      className="mb-1"
                    >
                      {record.type}
                    </Tag>
                    <div className="text-base font-semibold text-primary mt-1">
                      {record.type === '入库' ? '+' : '-'}{record.quantity}
                    </div>
                  </div>
                }
              >
                <div className="text-sm font-medium">{record.productName}</div>
              </List.Item>
            ))}
          </List>
        </Tabs.Tab>

        {/* 商品资料标签页 */}
        <Tabs.Tab title="商品资料" key="info">
          <div className="page-content">
            {/* 商品列表 */}
            <div className="section-title">商品列表</div>
            <List style={{ paddingBottom: `${bottomHeight}px` }}>
              {filteredProducts.map(product => {
                const stockStatus = getStockStatus(product.stock)
                return (
                  <List.Item
                    key={product.id}
                    description={
                      <div className="mt-1">
                        <div className="text-xs text-gray-500 mb-0.5">
                          分类：{product.category}
                        </div>
                        <div className="text-xs text-gray-500">
                          库存：{product.stock}件 | 已售：{product.sales}件
                        </div>
                      </div>
                    }
                    extra={
                      <div className="text-right">
                        <div className="text-base font-semibold text-primary mb-1">
                          ¥{product.price}
                        </div>
                        <Tag color={stockStatus.color} fill='outline'>
                          {stockStatus.text}
                        </Tag>
                      </div>
                    }
                  >
                    <div className="text-sm font-medium">{product.name}</div>
                  </List.Item>
                )
              })}
            </List>
          </div>
        </Tabs.Tab>

        {/* 商品设置标签页 */}
        <Tabs.Tab title="商品设置" key="settings">
          <div className="page-content">
            {/* 分类设置 */}
            <div className="section-title">分类设置</div>
            <List>
              {productSettings.map(setting => (
                <List.Item
                  key={setting.id}
                  description={
                    <div className="mt-2 space-y-1">
                      <div className="text-xs text-gray-500">
                        供应商：{setting.supplier}
                      </div>
                      <div className="text-xs text-gray-500">
                        采购价：¥{setting.purchasePrice} | 销售价：¥{setting.salesPrice} | 利润率：{setting.profitMargin}%
                      </div>
                      <div className="text-xs text-gray-500">
                        自动补货：{setting.autoOrder ? '已开启' : '已关闭'}
                      </div>
                    </div>
                  }
                  extra={
                    <div className="text-right">
                      <div className="text-sm font-semibold text-primary mb-1">
                        预警阈值：{setting.lowStockThreshold}
                      </div>
                      <Tag color='primary' fill='outline'>
                        {setting.category}
                      </Tag>
                    </div>
                  }
                >
                  <div className="text-sm font-medium">{setting.category}</div>
                </List.Item>
              ))}
            </List>
          </div>
        </Tabs.Tab>
      </Tabs>

      {/* 导出按钮（商品设置页面不显示） */}
      {activeKey !== 'settings' && (
        <ExportButton 
          activeKey={activeKey}
          tabs={tabs}
          dataMap={dataMap}
          bottom={
            activeKey === 'records' 
              ? bottomHeight + 20 // 库存记录增加更多底部高度
              : bottomHeight
          }
        />
      )}

      {/* 固定在底部的查询区域（商品设置页面不显示） */}
      {activeKey !== 'settings' && (
        <div 
          ref={bottomRef}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 pb-3"
          style={{ 
            maxWidth: '480px', 
            margin: '0 auto',
            boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.08)'
          }}
        >
        <div className="p-3 space-y-3">
          {/* 日期范围选择器（仅库存记录显示） */}
          {activeKey === 'records' && (
            <DateRangePicker
              title="记录日期"
              startDate={startDate}
              endDate={endDate}
              onRangeChange={(start, end) => {
                setStartDate(start)
                setEndDate(end)
              }}
              showToast={false}
            />
          )}
          
          {/* 商品搜索输入和查询按钮 */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 whitespace-nowrap">商品</span>
            <div className="w-full">
              <Input
                placeholder="输入商品名称或分类"
                value={searchValue}
                onChange={setSearchValue}
                clearable
                onEnterPress={handleSearch}
                style={{ 
                  '--font-size': '14px',
                }}
                className="p-2 border border-gray-300 rounded-md focus:border-primary"
              />
            </div>
            <div className="flex-1 flex justify-end">
              <Button 
                color="primary"
                size="middle"
                onClick={handleSearch}
                style={{
                  minWidth: '120px'
                }}
              >
                查询
              </Button>
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  )
}

export default ProductManagement
