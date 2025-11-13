// 我的订单页：采购订单和租赁订单
import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { NavBar, Tabs, List, Tag, Popup } from 'antd-mobile'
import { purchaseOrders, rentalOrders } from '../mock/data'

const MyOrders: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  // 从URL参数获取初始tab，默认为purchase
  const initialTab = searchParams.get('tab') || 'purchase'
  const [activeKey, setActiveKey] = useState(initialTab)

  // 切换tab时更新URL参数
  const handleTabChange = (key: string) => {
    setActiveKey(key)
    setSearchParams({ tab: key })
  }

  // 获取订单状态颜色
  const getStatusColor = (status: string) => {
    const colorMap: { [key: string]: 'success' | 'primary' | 'warning' | 'danger' | 'default' } = {
      '已完成': 'success',
      '已发货': 'success',
      '待发货': 'warning',
      '租赁中': 'primary',
      '已取消': 'default',
    }
    return colorMap[status] || 'default'
  }

  // 订单详情抽屉
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  // 处理订单点击，显示详情抽屉
  const handleOrderClick = (order: any) => {
    setSelectedOrder(order)
    setDrawerVisible(true)
  }

  return (
    <div 
      className="page-container page-with-fixed-navbar"
    >
      <NavBar 
        onBack={() => navigate(-1)}
      >
        我的订单
      </NavBar>
      <Tabs activeKey={activeKey} onChange={handleTabChange}>
        <Tabs.Tab title="采购订单" key="purchase">
          <List>
            {purchaseOrders.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                暂无采购订单
              </div>
            ) : (
              purchaseOrders.map(order => (
                <List.Item
                  key={order.id}
                  onClick={() => handleOrderClick(order)}
                  description={
                    <div>
                      <div className="mt-1 text-xs text-gray-500">
                        {order.createTime}
                      </div>
                      <div className="mt-2 space-y-1">
                        {order.items.slice(0, 2).map((item: any, index: number) => (
                          <div key={index} className="text-xs text-gray-600">
                            {item.name} ×{item.quantity} {item.unit}
                          </div>
                        ))}
                        {order.items.length > 2 && (
                          <div className="text-xs text-gray-400">
                            等{order.items.length}件商品
                          </div>
                        )}
                      </div>
                    </div>
                  }
                  extra={
                    <div className="text-right">
                      <div className="text-base font-semibold text-primary mb-1">
                        ¥{order.totalAmount.toLocaleString()}
                      </div>
                      <Tag color={getStatusColor(order.status)} fill='outline'>
                        {order.status}
                      </Tag>
                    </div>
                  }
                >
                  <div className="flex items-center">
                    <span className="text-sm font-medium">{order.orderNo}</span>
                  </div>
                </List.Item>
              ))
            )}
          </List>
        </Tabs.Tab>

        <Tabs.Tab title="租赁订单" key="rental">
          <List>
            {rentalOrders.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                暂无租赁订单
              </div>
            ) : (
              rentalOrders.map(order => (
                <List.Item
                  key={order.id}
                  onClick={() => handleOrderClick(order)}
                  description={
                    <div>
                      <div className="mt-1 text-xs text-gray-500">
                        {order.createTime}
                      </div>
                      {order.startDate && order.endDate && (
                        <div className="mt-1 text-xs text-gray-500">
                          租赁时间：{order.startDate} 至 {order.endDate}（{order.days}天）
                        </div>
                      )}
                      <div className="mt-2 space-y-1">
                        {order.items.slice(0, 2).map((item: any, index: number) => (
                          <div key={index} className="text-xs text-gray-600">
                            {item.name} ×{item.quantity} {item.unit}
                          </div>
                        ))}
                        {order.items.length > 2 && (
                          <div className="text-xs text-gray-400">
                            等{order.items.length}件商品
                          </div>
                        )}
                      </div>
                    </div>
                  }
                  extra={
                    <div className="text-right">
                      <div className="text-base font-semibold text-primary mb-1">
                        ¥{order.totalAmount.toLocaleString()}
                      </div>
                      <Tag color={getStatusColor(order.status)} fill='outline'>
                        {order.status}
                      </Tag>
                    </div>
                  }
                >
                  <div className="flex items-center">
                    <span className="text-sm font-medium">{order.orderNo}</span>
                  </div>
                </List.Item>
              ))
            )}
          </List>
        </Tabs.Tab>
      </Tabs>

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
                <span className="text-gray-900 font-medium">{selectedOrder.orderNo}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">订单状态</span>
                <Tag color={getStatusColor(selectedOrder.status)} fill='outline'>
                  {selectedOrder.status}
                </Tag>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">创建时间</span>
                <span className="text-gray-900">{selectedOrder.createTime}</span>
              </div>

              {/* 租赁订单特有信息 */}
              {activeKey === 'rental' && selectedOrder.startDate && selectedOrder.endDate && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">租赁开始时间</span>
                    <span className="text-gray-900">{selectedOrder.startDate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">租赁结束时间</span>
                    <span className="text-gray-900">{selectedOrder.endDate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">租赁天数</span>
                    <span className="text-gray-900">{selectedOrder.days} 天</span>
                  </div>
                </>
              )}

              <div>
                <div className="text-sm text-gray-600 mb-2">商品明细</div>
                <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                  {selectedOrder.items.map((item: any, index: number) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="text-sm text-gray-900">{item.name}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {item.quantity} {item.unit} × ¥{item.price.toLocaleString()}
                          {activeKey === 'rental' && selectedOrder.days && (
                            <span> × {selectedOrder.days}天</span>
                          )}
                        </div>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        ¥{(
                          item.price * 
                          item.quantity * 
                          (activeKey === 'rental' && selectedOrder.days ? selectedOrder.days : 1)
                        ).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                <span className="text-gray-600">订单总额</span>
                <span className="text-primary text-lg font-semibold">¥{selectedOrder.totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </Popup>
    </div>
  )
}

export default MyOrders

