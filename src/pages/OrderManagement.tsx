// 订单管理：销售订单和核销订单
import React, { useState, useMemo, useRef, useEffect } from 'react'
import { NavBar, Tabs, List, Tag, Input, Button, Popup, Dialog, Toast } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import { salesOrders, verificationOrders } from '../mock/data'
import DateRangePicker from '../components/DateRangePicker'
import ExportButton from '../components/ExportButton'

const OrderManagement: React.FC = () => {
  const navigate = useNavigate()
  const [activeKey, setActiveKey] = useState('sales')
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [orderNumber, setOrderNumber] = useState('')
  const [searchOrderNumber, setSearchOrderNumber] = useState('')
  const [bottomHeight, setBottomHeight] = useState(160) // 默认高度，更保守的初始值
  const bottomRef = useRef<HTMLDivElement>(null)
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  // 动态计算底部查询区域的高度
  useEffect(() => {
    const updateHeight = () => {
      if (bottomRef.current) {
        const height = bottomRef.current.offsetHeight
        // 添加额外的10px安全边距
        setBottomHeight(height + 10)
      }
    }
    
    // 延迟测量确保DOM完全渲染
    const timer = setTimeout(updateHeight, 100)
    
    // 添加 resize 监听器
    window.addEventListener('resize', updateHeight)
    
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', updateHeight)
    }
  }, [])

  const getStatusColor = (status: string) => {
    const colorMap: { [key: string]: 'success' | 'primary' | 'warning' | 'danger' | 'default' } = {
      '已核销': 'success',
      '待使用': 'primary',
      '待发货': 'warning',
      '已取消': 'default',
    }
    return colorMap[status] || 'default'
  }

  // 处理查询按钮点击
  const handleSearch = () => {
    setSearchOrderNumber(orderNumber)
  }

  // 处理订单点击，显示详情抽屉
  const handleOrderClick = (order: any) => {
    setSelectedOrder(order)
    setDrawerVisible(true)
  }

  // 处理退单
  const handleRefund = () => {
    if (!selectedOrder) return
    
    Dialog.confirm({
      content: `确定要退单 ${selectedOrder.id} 吗？`,
      onConfirm: async () => {
        // 这里可以调用退单API
        Toast.show({
          content: `订单 ${selectedOrder.id} 退单成功`,
          icon: 'success',
        })
        setDrawerVisible(false)
        setSelectedOrder(null)
      },
    })
  }

  // 格式化订单来源显示
  const formatOrderSource = (order: any) => {
    if (!order.source) {
      // 如果没有来源字段，默认显示小程序购买（销售订单）
      return '小程序购买'
    }

    const source = order.source
    
    // 核销订单来源：抖音、美团、携程
    if (source.type === 'douyin' || source.type === 'meituan' || source.type === 'ctrip') {
      const sourceMap: { [key: string]: string } = {
        'douyin': '抖音',
        'meituan': '美团',
        'ctrip': '携程'
      }
      return sourceMap[source.type] || '未知来源'
    }
    
    // 销售订单来源：员工分销、用户分销、小程序购买
    if (source.type === 'employee') {
      return `员工分销（${source.name || '未知员工'}）`
    } else if (source.type === 'user') {
      return `用户分销（${source.name || '未知用户'}）`
    } else if (source.type === 'miniprogram') {
      return '小程序购买'
    }
    
    return '未知来源'
  }

  // 根据当前标签页选择对应的订单数组
  const currentOrders = useMemo(() => {
    return activeKey === 'sales' ? salesOrders : verificationOrders
  }, [activeKey])

  // 筛选订单
  const filteredOrders = useMemo(() => {
    return currentOrders.filter(order => {
      // 按订单号筛选
      if (searchOrderNumber && !order.id.toLowerCase().includes(searchOrderNumber.toLowerCase())) {
        return false
      }
      
      // 按日期范围筛选
      if (startDate && endDate) {
        const orderDate = new Date(order.time)
        const start = new Date(startDate)
        start.setHours(0, 0, 0, 0)
        const end = new Date(endDate)
        end.setHours(23, 59, 59, 999)
        
        if (orderDate < start || orderDate > end) {
          return false
        }
      }
      
      return true
    })
  }, [currentOrders, searchOrderNumber, startDate, endDate])

  // 导出按钮配置
  const tabs = [
    { key: 'sales', title: '销售订单' },
    { key: 'verification', title: '核销订单' }
  ]

  const dataMap = {
    sales: filteredOrders,
    verification: filteredOrders
  }

  return (
    <div 
      className="page-container page-with-fixed-navbar"
    >
      <NavBar 
        onBack={() => navigate(-1)}
      >
        订单管理
      </NavBar>
      <Tabs activeKey={activeKey} onChange={setActiveKey}>
        <Tabs.Tab title="销售订单" key="sales">
          <List style={{ paddingBottom: `${bottomHeight}px` }}>
            {filteredOrders.map(order => (
              <List.Item
                key={order.id}
                onClick={() => handleOrderClick(order)}
                description={
                  <div>
                    <div className="mt-1 text-xs text-gray-500">
                      客户：{order.customer} | {order.time}
                    </div>
                  </div>
                }
                extra={
                  <div className="text-right">
                    <div className="text-base font-semibold text-primary mb-1">
                      ¥{order.amount}
                    </div>
                    <Tag color={getStatusColor(order.status)} fill='outline'>
                      {order.status}
                    </Tag>
                  </div>
                }
              >
                <div className="flex items-center">
                  <span className="text-sm font-medium">{order.id}</span>
                  <Tag color='default' className="ml-2" fill='outline'>
                    {order.type}
                  </Tag>
                </div>
              </List.Item>
            ))}
          </List>
        </Tabs.Tab>

        <Tabs.Tab title="核销订单" key="verification">
          <List style={{ paddingBottom: `${bottomHeight}px` }}>
            {filteredOrders.map(order => (
              <List.Item
                key={order.id}
                onClick={() => handleOrderClick(order)}
                description={
                  <div>
                    <div className="mt-1 text-xs text-gray-500">
                      客户：{order.customer} | 核销时间：{order.time}
                    </div>
                  </div>
                }
                extra={
                  <div className="text-right">
                    <div className="text-base font-semibold text-primary mb-1">
                      ¥{order.amount}
                    </div>
                    <Tag color='success' fill='outline'>已核销</Tag>
                  </div>
                }
              >
                <div className="flex items-center">
                  <span className="text-sm font-medium">{order.id}</span>
                  <Tag color='default' className="ml-2" fill='outline'>
                    {order.type}
                  </Tag>
                </div>
              </List.Item>
            ))}
          </List>
        </Tabs.Tab>
      </Tabs>

      {/* 导出按钮 */}
      <ExportButton 
        activeKey={activeKey}
        tabs={tabs}
        dataMap={dataMap}
        bottom={bottomHeight + 10}
      />

      {/* 固定在底部的查询区域 */}
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
          {/* 日期范围选择器 */}
          <DateRangePicker
            title="订单日期"
            startDate={startDate}
            endDate={endDate}
            onRangeChange={(start, end) => {
              setStartDate(start)
              setEndDate(end)
            }}
            showToast={false}
          />
          
          {/* 订单号输入和查询按钮 */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 whitespace-nowrap">订单号</span>
            <div className="w-full">
              <Input
                placeholder="输入订单号查询"
                value={orderNumber}
                onChange={setOrderNumber}
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

      {/* 订单详情抽屉 */}
      <Popup
        visible={drawerVisible}
        onMaskClick={() => {
          setDrawerVisible(false)
          setSelectedOrder(null)
        }}
        position="bottom"
        bodyStyle={{
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
          maxHeight: '80vh',
          paddingBottom: '20px'
        }}
      >
        {selectedOrder && (
          <div className="p-4">
            {/* 标题栏 */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">订单详情</h3>
              <button
                onClick={() => {
                  setDrawerVisible(false)
                  setSelectedOrder(null)
                }}
                className="text-gray-400 text-xl"
              >
                ×
              </button>
            </div>

            {/* 订单信息 */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">订单号</span>
                <span className="text-gray-900 font-medium">{selectedOrder.id}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">订单类型</span>
                <Tag color='default' fill='outline'>{selectedOrder.type}</Tag>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">订单状态</span>
                <Tag color={getStatusColor(selectedOrder.status)} fill='outline'>
                  {selectedOrder.status}
                </Tag>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">客户姓名</span>
                <span className="text-gray-900">{selectedOrder.customer}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">订单金额</span>
                <span className="text-primary text-lg font-semibold">¥{selectedOrder.amount}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">订单时间</span>
                <span className="text-gray-900">{selectedOrder.time}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">订单来源</span>
                <span className="text-gray-900">{formatOrderSource(selectedOrder)}</span>
              </div>
            </div>

            {/* 退单按钮 */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <Button
                color="danger"
                block
                size="large"
                onClick={handleRefund}
                disabled={selectedOrder.status === '已取消'}
              >
                {selectedOrder.status === '已取消' ? '订单已取消' : '退单'}
              </Button>
            </div>
          </div>
        )}
      </Popup>
    </div>
  )
}


export default OrderManagement
