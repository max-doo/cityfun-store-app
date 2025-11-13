// 我要融资：融资产品和申请
import React from 'react'
import { NavBar, Card, Button } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import { financingOptions } from '../mock/data'

const Financing: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="page-container page-with-fixed-navbar">
      <NavBar onBack={() => navigate(-1)}>我要融资</NavBar>

      <div className="page-content">
        <div className="section-title">推荐融资产品</div>
        {financingOptions.map(option => (
          <Card key={option.id} className="mb-3">
            <div 
              className="h-[120px] bg-cover bg-center rounded-lg mb-3 flex flex-col justify-center p-4 text-white"
              style={{ backgroundImage: `url(${option.image})` }}
            >
              <div className="text-lg font-semibold mb-2">
                {option.title}
              </div>
              <div className="text-sm">{option.desc}</div>
            </div>
            <Button block color='primary'>
              立即申请
            </Button>
          </Card>
        ))}

        <div className="section-title">我的申请</div>
        <Card>
          <div className="text-center py-5">
            <div className="text-sm text-gray-600 mb-2">
              暂无申请记录
            </div>
            <div className="text-xs text-gray-400">
              申请融资后可在此查看进度
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Financing
