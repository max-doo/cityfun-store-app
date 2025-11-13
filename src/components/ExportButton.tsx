// 导出报表按钮组件：提供浮动按钮样式和导出功能
import React from 'react'
import { Toast } from 'antd-mobile'
import { BsDownload } from 'react-icons/bs'

interface ExportButtonProps {
  activeKey: string
  tabs: Array<{ key: string; title: string }>
  dataMap: Record<string, any>
  bottom?: number // 底部距离，默认为 80px
}

const ExportButton: React.FC<ExportButtonProps> = ({ activeKey, tabs, dataMap, bottom = 80 }) => {
  // 导出报表功能
  const handleExport = () => {
    const tabTitle = tabs.find(tab => tab.key === activeKey)?.title
    Toast.show({
      content: `正在导出${tabTitle}报表...`,
      duration: 2000,
    })
    
    // 模拟导出CSV
    setTimeout(() => {
      const data = dataMap[activeKey]
      console.log('导出数据:', data)
      Toast.show({
        content: '报表导出成功',
        duration: 1500,
      })
    }, 1000)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto pointer-events-none" style={{ zIndex: 100 }}>
      <button
        onClick={handleExport}
        className="bg-primary absolute right-5 h-12 px-5 rounded-full 
        shadow-lg flex items-center justify-center gap-2 pointer-events-auto 
        transition-transform active:scale-95 hover:scale-105"
        style={{ bottom: `${bottom}px` }}
      >
        <span className="text-white text-lg">导出</span>
        <BsDownload className="text-xl text-white" />
      </button>
    </div>
  )
}

export default ExportButton

