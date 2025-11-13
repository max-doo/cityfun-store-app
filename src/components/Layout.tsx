// 主布局组件：包含底部导航栏
import React from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { TabBar } from 'antd-mobile'
import { 
  BsFillHouseDoorFill, 
  BsBarChartFill, 
  BsBagCheckFill, 
  BsPersonCircle 
} from 'react-icons/bs'

const Layout: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const tabs = [
    {
      key: '/',
      title: '首页',
      icon: <BsFillHouseDoorFill />,
    },
    {
      key: '/analysis',
      title: '分析',
      icon: <BsBarChartFill />,
    },
    {
      key: '/mall',
      title: '商城',
      icon: <BsBagCheckFill />,
    },
    {
      key: '/profile',
      title: '我的',
      icon: <BsPersonCircle />,
    },
  ]

  const handleTabChange = (key: string) => {
    navigate(key)
  }

  // 判断当前路由是否是主页面（需要显示底部导航）
  const isMainRoute = ['/', '/analysis', '/mall', '/profile'].includes(location.pathname)

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div 
        className="page-content-wrapper"
        style={{ 
          flex: 1, 
          overflow: 'auto',
          height: isMainRoute ? 'calc(100% - var(--tabbar-height))' : '100%'
        }}
      >
        <Outlet />
      </div>
      {isMainRoute && (
        <TabBar className="custom-tabbar z-50" activeKey={location.pathname} onChange={handleTabChange}>
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      )}
    </div>
  )
}

export default Layout

