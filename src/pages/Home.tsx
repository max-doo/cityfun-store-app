// 首页：门店概览、功能入口、数据看板
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Grid } from 'antd-mobile'
import { 
  BsClipboardCheckFill,
  BsFillTicketDetailedFill,
  BsPatchCheckFill,
  BsFillGrid1X2Fill,
  BsPeople,
  BsBoxSeam,
  BsJoystick,
  BsShopWindow,
  BsCashCoin,
  BsThreeDots,
  BsShare,
  BsTicketPerforated,
  BsHandThumbsUp,
  BsBook,
  BsChevronDown,
  BsMegaphoneFill
} from 'react-icons/bs'
import { stores, notifications, revenueData, memberData, playData } from '../mock/data'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const [currentStore, setCurrentStore] = useState(stores[0])
  const [showStoreDropdown, setShowStoreDropdown] = useState(false)
  
  // 消息通知轮播状态
  const [currentNotificationIndex, setCurrentNotificationIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [offsetX, setOffsetX] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // 数据卡片统一样式变量
  const dataCardStyles = {
    container: "text-center p-2",
    label: "text-xs text-gray-500 mb-1",
    value: "text-xl font-semibold text-gray-900 mb-0.5",
    subtitle: "text-[11px] text-gray-400",
    subtitleGreen: "text-[11px] text-green-500",
  }

  // 消息通知自动轮播
  useEffect(() => {
    if (isDragging) return // 如果正在拖动，暂停自动轮播
    
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setCurrentNotificationIndex((prev) => 
        (prev + 1) % notifications.length
      )
    }, 4000) // 每条消息显示4秒

    return () => clearInterval(interval)
  }, [isDragging])

  // 处理拖动开始
  const handleDragStart = (clientX: number) => {
    setIsDragging(true)
    setStartX(clientX)
    setIsTransitioning(false)
  }

  // 处理拖动中
  const handleDragMove = (clientX: number) => {
    if (!isDragging) return
    const diff = clientX - startX
    setOffsetX(diff)
  }

  // 处理拖动结束
  const handleDragEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    
    const threshold = 50 // 滑动阈值
    
    if (offsetX > threshold) {
      // 向右滑动，显示上一条
      setIsTransitioning(true)
      setCurrentNotificationIndex((prev) => 
        prev === 0 ? notifications.length - 1 : prev - 1
      )
    } else if (offsetX < -threshold) {
      // 向左滑动，显示下一条
      setIsTransitioning(true)
      setCurrentNotificationIndex((prev) => 
        (prev + 1) % notifications.length
      )
    }
    
    setOffsetX(0)
  }

  // 鼠标事件
  const handleMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX)
  }

  const handleMouseUp = () => {
    handleDragEnd()
  }

  const handleMouseLeave = () => {
    if (isDragging) handleDragEnd()
  }

  // 触摸事件
  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    handleDragEnd()
  }

  // 主要功能入口
  const mainFunctions = [
    { key: 'orders', icon: <BsClipboardCheckFill />, name: '订单管理', path: '/orders' },
    { key: 'tickets', icon: <BsFillTicketDetailedFill />, name: '门票套餐', path: '/tickets' },
    { key: 'marketing', icon: <BsPatchCheckFill />, name: '营销工具', path: '/marketing' },
    { key: 'terminal', icon: <BsFillGrid1X2Fill />, name: '终端设备', path: '/terminal' },
  ]

  // 常用功能入口
  const commonFunctions = [
    { key: 'members', icon: <BsPeople />, name: '会员管理', path: '/members' },
    { key: 'products', icon: <BsBoxSeam />, name: '商品管理', path: '/products' },
    { key: 'projects', icon: <BsJoystick />, name: '游乐项目', path: '/terminal' },
    { key: 'distribution', icon: <BsShare />, name: '分销管理', path: '/distribution' },
    { key: 'coupons', icon: <BsTicketPerforated />, name: '券管理', path: '/coupons' },
    { key: 'activation', icon: <BsHandThumbsUp/>, name: '促活专区', path: '/activation' },
    { key: 'self-mall', icon: <BsShopWindow />, name: '自营商城', path: '/self-mall' },
    { key: 'financing', icon: <BsCashCoin />, name: '我要融资', path: '/financing' },
    { key: 'academy', icon: <BsBook />, name: '乐园学院', path: '/academy' },
    { key: 'more', icon: <BsThreeDots />, name: '更多功能', path: '/more' },
  ]

  const handleFunctionClick = (path: string) => {
    if (path !== '#') {
      navigate(path)
    }
  }

  return (
    <div className="page-container">
      {/* 整合的顶部容器：标题 + 门店选择 + 主要功能入口 */}
      <div className="bg-gradient-to-br from-primary to-primary-light p-4">
        {/* 标题和门店选择 */}
        <div className="flex justify-between items-center mb-4 gap-3">
          <span className="text-2xl font-semibold text-primary-dark flex-1 whitespace-nowrap ml-5">
            城市乐园门店管家
          </span>
          
          <div className="flex-shrink-0 relative">
            {/* 自定义下拉选择器 */}
            <div 
              className="flex items-center gap-2 p-2 cursor-pointer rounded-lg hover:bg-white/30 transition-all"
              onClick={() => setShowStoreDropdown(!showStoreDropdown)}
            >
              <span className="text-black text-sm font-medium">{currentStore.name}</span>
              <BsChevronDown className="text-primary-dark text-xs" />
            </div>
            
            {/* 下拉列表 */}
            {showStoreDropdown && (
              <>
                {/* 遮罩层 */}
                <div 
                  className="fixed inset-0 z-40"
                  onClick={() => setShowStoreDropdown(false)}
                />
                {/* 下拉选项 */}
                <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg overflow-hidden z-50 min-w-[160px]">
                  {stores.map(store => (
                    <div
                      key={store.id}
                      className={`px-4 py-3 cursor-pointer transition-colors ${
                        currentStore.id === store.id 
                          ? 'bg-orange-50 text-primary font-medium' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => {
                        setCurrentStore(store);
                        setShowStoreDropdown(false);
                      }}
                    >
                      {store.name}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* 主要功能入口 */}
        <div className="mt-24">
          <Grid columns={4} gap={8}>
            {mainFunctions.map(item => (
              <Grid.Item key={item.key} onClick={() => handleFunctionClick(item.path)}>
                <div className="function-item">
                  <div className="text-4xl text-primary-dark mb-2">
                    {item.icon}
                  </div>
                  <div className="text-sm text-primary-dark">{item.name}</div>
                </div>
              </Grid.Item>
            ))}
          </Grid>
        </div>
      </div>

      <div className="page-content">
        {/* 常用功能入口 */}
        <Card className="mb-3">
          <Grid columns={5} gap={8}>
            {commonFunctions.map(item => (
              <Grid.Item key={item.key} onClick={() => handleFunctionClick(item.path)}>
                <div className="function-item">
                  <div className="text-2xl text-primary mb-2">
                    {item.icon}
                  </div>
                  <div className="text-[11px] text-gray-900 text-center">{item.name}</div>
                </div>
              </Grid.Item>
            ))}
          </Grid>
        </Card>

        {/* 消息通知 - 可滑动轮播 */}
        <div className="mb-3 rounded-lg border-primary bg-gradient-to-r from-orange-50 to-red-50">
          <div className="flex items-start gap-3 p-3">
            {/* 喇叭图标 - 固定不滚动 */}
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-orange-500 rounded-lg flex items-center justify-center text-white text-lg">
              <BsMegaphoneFill />
            </div>
            
            {/* 消息内容 - 可滚动区域 */}
            <div 
              className="flex-1 overflow-hidden"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
              <div
                className={`flex ${isTransitioning ? 'transition-transform duration-300 ease-out' : ''}`}
                style={{
                  transform: `translateX(calc(-${currentNotificationIndex * 100}% + ${offsetX}px))`,
                }}
              >
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="w-full flex-shrink-0"
                    style={{ userSelect: 'none' }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-gray-900">
                        {notification.title}
                      </span>
                      <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                        {notification.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-gray-600 leading-relaxed flex-1">
                        {notification.content}
                      </span>
                      <span className="text-primary font-medium cursor-pointer hover:text-orange-600 transition-colors whitespace-nowrap">
                        查看详情 &gt;&gt;
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* 轮播指示器 */}
          <div className="flex justify-center gap-1 pb-2">
            {notifications.map((_, index) => (
              <div
                key={index}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentNotificationIndex 
                    ? 'w-6 bg-primary' 
                    : 'w-1 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* 实时经营数据看板 - 整合今日数据、会员概况和游玩分析 */}
        <Card className="mb-3">
          <Grid columns={3} gap={8}>
            {/* 今日经营数据 */}
            <Grid.Item>
              <div className={dataCardStyles.container}>
                <div className={dataCardStyles.label}>营业额</div>
                <div className={dataCardStyles.value}>
                  ¥{revenueData.today.revenue.toLocaleString()}
                </div>
                <div className={dataCardStyles.subtitleGreen}>{revenueData.today.trend}</div>
              </div>
            </Grid.Item>
            <Grid.Item>
              <div className={dataCardStyles.container}>
                <div className={dataCardStyles.label}>订单数</div>
                <div className={dataCardStyles.value}>
                  {revenueData.today.orders}
                </div>
                <div className={dataCardStyles.subtitleGreen}>{revenueData.today.trend}</div>
              </div>
            </Grid.Item>
            <Grid.Item>
              <div className={dataCardStyles.container}>
                <div className={dataCardStyles.label}>游玩人数</div>
                <div className={dataCardStyles.value}>
                  {revenueData.today.members}
                </div>
                <div className={dataCardStyles.subtitleGreen}>{revenueData.today.trend}</div>
              </div>
            </Grid.Item>
            
            {/* 会员数据 */}
            <Grid.Item>
              <div className={dataCardStyles.container}>
                <div className={dataCardStyles.label}>总会员</div>
                <div className={dataCardStyles.value}>
                  {memberData.total}
                </div>
                <div className={dataCardStyles.subtitle}>累计注册</div>
              </div>
            </Grid.Item>
            <Grid.Item>
              <div className={dataCardStyles.container}>
                <div className={dataCardStyles.label}>新增会员</div>
                <div className={dataCardStyles.value}>
                  {memberData.new}
                </div>
                <div className={dataCardStyles.subtitle}>今日新增</div>
              </div>
            </Grid.Item>
            <Grid.Item>
              <div className={dataCardStyles.container}>
                <div className={dataCardStyles.label}>到店人数</div>
                <div className={dataCardStyles.value}>
                  {memberData.active}
                </div>
                <div className={dataCardStyles.subtitle}>当日到店</div>
              </div>
            </Grid.Item>
            
            {/* 游玩分析 */}
            <Grid.Item>
              <div className={dataCardStyles.container}>
                <div className={dataCardStyles.label}>游玩人次</div>
                <div className={dataCardStyles.value}>
                  {playData.totalPlays}
                </div>
                <div className={dataCardStyles.subtitle}>总游玩</div>
              </div>
            </Grid.Item>
            <Grid.Item>
              <div className={dataCardStyles.container}>
                <div className={dataCardStyles.label}>核销数</div>
                <div className={dataCardStyles.value}>
                  {playData.ticketVerified}
                </div>
                <div className={dataCardStyles.subtitle}>门票核销</div>
              </div>
            </Grid.Item>
            <Grid.Item>
              <div className={dataCardStyles.container}>
                <div className={dataCardStyles.label}>核销率</div>
                <div className={dataCardStyles.value}>
                  {((playData.ticketVerified / playData.totalPlays) * 100).toFixed(1)}%
                </div>
                <div className={dataCardStyles.subtitleGreen}>数据正常</div>
              </div>
            </Grid.Item>
          </Grid>
          <div
            className="mt-3 p-2 text-primary text-sm text-center cursor-pointer"
            onClick={() => navigate('/analysis')}
          >
            查看详细分析报告 &gt;&gt;
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Home
