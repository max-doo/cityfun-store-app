// 券管理：券种管理、送券活动
import React, { useState } from 'react'
import { NavBar, Tabs, List, Tag, Button, Card } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import { coupons } from '../mock/data'

const CouponManagement: React.FC = () => {
  const navigate = useNavigate()
  const [activeKey, setActiveKey] = useState('coupon')

  return (
    <div className="page-container page-with-fixed-navbar">
      <NavBar onBack={() => navigate(-1)}>券管理</NavBar>

      <Tabs activeKey={activeKey} onChange={setActiveKey}>
        <Tabs.Tab title="券种管理" key="coupon">
          <div className="page-content">
            <List>
              {coupons.map(coupon => (
                <List.Item
                  key={coupon.id}
                  description={
                    <div className="mt-1">
                      <div className="text-xs text-gray-500 mb-0.5">
                        {coupon.value}
                      </div>
                      <div className="text-xs text-gray-500">
                        库存：{coupon.stock}张 | 已使用：{coupon.used}张
                      </div>
                    </div>
                  }
                  extra={
                    <div className="flex flex-col items-end">
                      <Tag color='primary' fill='outline' className="mb-2">
                        {coupon.type}
                      </Tag>
                      <Button size='small' color='primary'>
                        编辑
                      </Button>
                    </div>
                  }
                >
                  <div className="text-sm font-medium">{coupon.name}</div>
                </List.Item>
              ))}
            </List>

            <Button block color='primary' className="mt-3">
              + 创建优惠券
            </Button>
          </div>
        </Tabs.Tab>

        <Tabs.Tab title="送券活动" key="activity">
          <div className="page-content">
            <Card className="mb-3">
              <div className="text-center py-5">
                <div className="text-sm text-gray-600 mb-2">
                  暂无送券活动
                </div>
                <Button color='primary' size='small'>
                  创建活动
                </Button>
              </div>
            </Card>
          </div>
        </Tabs.Tab>

        <Tabs.Tab title="派送记录" key="send">
          <div className="page-content">
            <Card className="mb-3">
              <div className="text-center py-5">
                <div className="text-sm text-gray-600">
                  暂无派送记录
                </div>
              </div>
            </Card>
          </div>
        </Tabs.Tab>

        <Tabs.Tab title="核销记录" key="verify">
          <div className="page-content">
            <Card className="mb-3">
              <div className="text-center py-5">
                <div className="text-sm text-gray-600">
                  暂无核销记录
                </div>
              </div>
            </Card>
          </div>
        </Tabs.Tab>
      </Tabs>
    </div>
  )
}

export default CouponManagement
