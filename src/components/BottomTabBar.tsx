// 底部导航栏组件：用于页面内的标签切换
import React from 'react'
import { TabBar } from 'antd-mobile'

interface BottomTabBarProps {
  activeKey: string
  onChange: (key: string) => void
  tabs: Array<{
    key: string
    title: string
  }>
}

const BottomTabBar: React.FC<BottomTabBarProps> = ({ activeKey, onChange, tabs }) => {
  return (
    <>
      {/* 固定在底部的导航栏 */}
      <div 
        className="bg-white fixed bottom-0 left-0 right-0 z-50 order-tabbar" 
        style={{ 
          maxWidth: '480px', 
          margin: '0 auto',
          boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1)'
        }}
      >
        <TabBar 
          activeKey={activeKey} 
          onChange={onChange}
        >
          {tabs.map(tab => (
            <TabBar.Item key={tab.key} title={tab.title} />
          ))}
        </TabBar>
      </div>
      
      <style>{`
        .order-tabbar .adm-tab-bar-item-title {
          font-size: 16px !important;
        }
        .order-tabbar .adm-tab-bar-item-active .adm-tab-bar-item-title {
          text-decoration: underline;
          text-underline-offset: 6px;
          text-decoration-thickness: 2px;
        }
      `}</style>
    </>
  )
}

export default BottomTabBar

