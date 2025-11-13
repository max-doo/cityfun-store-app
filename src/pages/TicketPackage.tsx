// 门票套餐：门票管理和套餐管理
import React, { useState } from 'react'
import { NavBar, Tabs, Button, Card } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import { tickets, packages } from '../mock/data'

const TicketPackage: React.FC = () => {
  const navigate = useNavigate()
  const [activeKey, setActiveKey] = useState('ticket')

  return (
    <div className="page-container page-with-fixed-navbar">
      <NavBar onBack={() => navigate(-1)}>门票套餐</NavBar>

      <Tabs activeKey={activeKey} onChange={setActiveKey}>
        <Tabs.Tab title="门票管理" key="ticket">
          <div className="p-3">
            {tickets.map(ticket => (
              <Card key={ticket.id} className="mb-3">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <div className="text-base font-semibold mb-2">
                      {ticket.name}
                    </div>
                    <div className="text-xs text-gray-500 mb-1">
                      库存：{ticket.stock}张 | 已售：{ticket.sales}张
                    </div>
                    <div className="text-lg font-semibold text-primary">
                      ¥{ticket.price}
                    </div>
                  </div>
                  <Button color='primary' size='small'>
                    编辑
                  </Button>
                </div>
              </Card>
            ))}
            <Button block color='primary' className="mt-3">
              + 添加门票
            </Button>
          </div>
        </Tabs.Tab>

        <Tabs.Tab title="套餐管理" key="package">
          <div className="p-3">
            {packages.map(pkg => (
              <Card key={pkg.id} className="mb-3">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <div className="text-base font-semibold mb-2">
                      {pkg.name}
                    </div>
                    <div className="text-xs text-gray-600 mb-1">
                      {pkg.includes}
                    </div>
                    <div className="text-xs text-gray-500 mb-1">
                      已售：{pkg.sales}份
                    </div>
                    <div className="text-lg font-semibold text-primary">
                      ¥{pkg.price}
                    </div>
                  </div>
                  <Button color='primary' size='small'>
                    编辑
                  </Button>
                </div>
              </Card>
            ))}
            <Button block color='primary' className="mt-3">
              + 添加套餐
            </Button>
          </div>
        </Tabs.Tab>
      </Tabs>
    </div>
  )
}

export default TicketPackage
