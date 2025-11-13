// 营销工具：分销、券、促活、互动、拉新
import React from 'react'
import { NavBar, Card } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import { 
  BsShare, 
  BsCashCoin, 
  BsFileText,
  BsGift,
  BsPersonPlus
} from 'react-icons/bs'

const Marketing: React.FC = () => {
  const navigate = useNavigate()

  const marketingTools = [
    { key: 'distribution', icon: <BsShare />, name: '分销管理', path: '/distribution' },
    { key: 'coupon', icon: <BsCashCoin />, name: '券管理', path: '/coupons' },
    { key: 'activation', icon: <BsFileText />, name: '促活专区', path: '/activation' },
    { key: 'interaction', icon: <BsGift />, name: '互动专区', path: '#' },
    { key: 'new', icon: <BsPersonPlus />, name: '拉新专区', path: '#' },
  ]

  return (
    <div className="page-container page-with-fixed-navbar">
      <NavBar onBack={() => navigate(-1)}>营销工具</NavBar>

      <div className="page-content">
        <div className="grid grid-cols-2 gap-3">
          {marketingTools.map(tool => (
            <Card
              key={tool.key}
              onClick={() => tool.path !== '#' && navigate(tool.path)}
              className="cursor-pointer transition-all active:opacity-80 active:scale-[0.98] overflow-hidden"
              style={{ 
                background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%)'
              }}
            >
              <div className="flex flex-col items-center justify-center p-4">
                <div className="text-4xl text-white mb-2">
                  {tool.icon}
                </div>
                <div className="text-xl font-semibold text-white">
                  {tool.name}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* 营销数据概览 */}
        <div className="section-title">营销数据概览</div>
        <Card>
          <div className="p-3">
            <div className="flex justify-between mb-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">本月分销订单</div>
                <div className="text-xl font-semibold text-primary">1,234</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">分销金额</div>
                <div className="text-xl font-semibold text-primary">¥45,678</div>
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <div className="text-xs text-gray-500 mb-1">优惠券发放</div>
                <div className="text-xl font-semibold text-primary">2,345</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">核销率</div>
                <div className="text-xl font-semibold text-primary">68%</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Marketing
