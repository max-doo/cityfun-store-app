// 促活专区：限时优惠、拼团、砍价、领券中心
import React from 'react'
import { NavBar, Grid, Card } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import { 
  BsClock,
  BsPeople,
  BsChevronDown,
  BsCashCoin
} from 'react-icons/bs'

const ActivationZone: React.FC = () => {
  const navigate = useNavigate()

  const activities = [
    { key: 'flash', icon: <BsClock />, name: '限时优惠', count: 3 },
    { key: 'group', icon: <BsPeople />, name: '拼团活动', count: 5 },
    { key: 'bargain', icon: <BsChevronDown />, name: '砍价活动', count: 2 },
    { key: 'coupon', icon: <BsCashCoin />, name: '领券中心', count: 8 },
  ]

  return (
    <div className="page-container page-with-fixed-navbar">
      <NavBar onBack={() => navigate(-1)}>促活专区</NavBar>

      <div className="page-content">
        <div className="section-title">营销活动</div>
        <Card>
          <Grid columns={2} gap={12}>
            {activities.map(activity => (
              <Grid.Item key={activity.key}>
                <div className="p-5 text-center border border-gray-200 rounded-lg cursor-pointer">
                  <div className="text-4xl text-primary mb-2">
                    {activity.icon}
                  </div>
                  <div className="text-sm font-medium mb-1">
                    {activity.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    进行中 {activity.count}
                  </div>
                </div>
              </Grid.Item>
            ))}
          </Grid>
        </Card>

        <div className="section-title">活动数据</div>
        <Card>
          <div className="p-3">
            <div className="flex justify-between mb-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">今日参与人数</div>
                <div className="text-xl font-semibold text-primary">3,456</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">活动订单</div>
                <div className="text-xl font-semibold text-primary">1,234</div>
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <div className="text-xs text-gray-500 mb-1">活动销售额</div>
                <div className="text-xl font-semibold text-primary">¥89,567</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">转化率</div>
                <div className="text-xl font-semibold text-primary">35.6%</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default ActivationZone
