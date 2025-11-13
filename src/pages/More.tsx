// 更多功能页面：展示所有二级功能菜单
import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavBar, Card, Grid, SearchBar } from 'antd-mobile'
import { 
  BsClipboardCheckFill,
  BsFillTicketDetailedFill,
  BsMegaphoneFill,
  BsFillGrid1X2Fill,
  BsBoxSeam,
  BsCart,
  BsShopWindow,
  BsPeople,
  BsBook,
  BsGearFill,
  BsReceipt,
  BsTicketPerforated,
  BsGift,
  BsChatDotsFill,
  BsStarFill,
  BsPeopleFill,
  BsJoystick,
  BsTools,
  BsController,
  BsCashStack,
  BsClipboardData,
  BsBarChartFill,
  BsInboxesFill,
  BsArchiveFill,
  BsListCheck,
  BsClockHistory,
  BsTruckFlatbed,
  BsCalendar2CheckFill,
  BsCashCoin,
  BsBoxArrowInRight,
  BsTruck,
  BsPaletteFill,
  BsGraphUpArrow,
  BsPersonLinesFill,
  BsMailbox2,
  BsSliders,
  BsPersonBadgeFill,
  BsShieldLockFill,
  BsThreeDots,
  BsTrophyFill,
  BsJournalBookmarkFill,
  BsQuestionCircleFill,
  BsSend,
  BsPersonAdd,
  BsSearch
} from 'react-icons/bs'

// 更多功能数据配置
const moreFunctions = [
  {
    category: '订单管理',
    icon: <BsClipboardCheckFill />,
    color: 'from-blue-400 to-blue-600',
    items: [
      { name: '销售订单', icon: <BsReceipt />, path: '/orders/sales' },
      { name: '核销订单', icon: <BsTicketPerforated />, path: '/orders/verification' }
    ]
  },
  {
    category: '门票套餐',
    icon: <BsFillTicketDetailedFill />,
    color: 'from-purple-400 to-purple-600',
    items: [
      { name: '门票管理', icon: <BsTicketPerforated />, path: '/tickets/manage' },
      { name: '套餐管理', icon: <BsGift />, path: '/tickets/package' }
    ]
  },
  {
    category: '营销工具',
    icon: <BsMegaphoneFill />,
    color: 'from-pink-400 to-pink-600',
    items: [
      { name: '员工分销', icon: <BsPersonBadgeFill />, path: '/distribution/employee' },
      { name: '用户分销', icon: <BsPeopleFill />, path: '/distribution/user' },
      { name: '渠道分销', icon: <BsSend />, path: '/distribution/channel' },
      { name: '券种管理', icon: <BsTicketPerforated />, path: '/coupons/types' },
      { name: '送券活动', icon: <BsGift />, path: '/coupons/activities' },
      { name: '券派送记录', icon: <BsMailbox2 />, path: '/coupons/distribution' },
      { name: '券核销记录', icon: <BsListCheck />, path: '/coupons/verification' },
      { name: '限时优惠', icon: <BsClockHistory />, path: '/activation/limited' },
      { name: '拼团活动', icon: <BsPeopleFill />, path: '/activation/group' },
      { name: '砍价活动', icon: <BsCashStack />, path: '/activation/bargain' },
      { name: '领券中心', icon: <BsTicketPerforated />, path: '/activation/coupon-center' },
      { name: '幸运抽奖', icon: <BsStarFill />, path: '/interactive/lottery' },
      { name: '弹窗广告', icon: <BsChatDotsFill />, path: '/interactive/popup' },
      { name: '首页Banner', icon: <BsPaletteFill />, path: '/interactive/banner' },
      { name: '新人专享', icon: <BsStarFill />, path: '/new-user/exclusive' },
      { name: '拉新有礼', icon: <BsPersonAdd />, path: '/new-user/referral' }
    ]
  },
  {
    category: '终端&设备',
    icon: <BsFillGrid1X2Fill />,
    color: 'from-indigo-400 to-indigo-600',
    items: [
      { name: '项目管理', icon: <BsJoystick />, path: '/projects/manage' },
      { name: '项目分组', icon: <BsInboxesFill />, path: '/projects/groups' },
      { name: '终端配置', icon: <BsSliders />, path: '/terminal/config' },
      { name: '设备维修', icon: <BsTools />, path: '/terminal/repair' },
      { name: '游玩设备', icon: <BsController />, path: '/terminal/play' },
      { name: '经营设备', icon: <BsCashStack />, path: '/terminal/business' },
      { name: '使用记录', icon: <BsClipboardData />, path: '/terminal/records' }
    ]
  },
  {
    category: '商品管理',
    icon: <BsBoxSeam />,
    color: 'from-green-400 to-green-600',
    items: [
      { name: '库存分析', icon: <BsBarChartFill />, path: '/products/analysis' },
      { name: '商品资料', icon: <BsArchiveFill />, path: '/products/info' },
      { name: '库存管理', icon: <BsInboxesFill />, path: '/products/inventory' },
      { name: '库存记录', icon: <BsClipboardData />, path: '/products/records' },
      { name: '商品设置', icon: <BsSliders />, path: '/products/settings' }
    ]
  },
  {
    category: '供应平台',
    icon: <BsCart />,
    color: 'from-orange-400 to-orange-600',
    items: [
      { name: '物资购买', icon: <BsCart />, path: '/supply/purchase' },
      { name: '我的订单', icon: <BsReceipt />, path: '/supply/orders' },
      { name: '设备租赁', icon: <BsTruckFlatbed />, path: '/supply/rental' },
      { name: '租赁订单', icon: <BsCalendar2CheckFill />, path: '/supply/rental-orders' },
      { name: '我要融资', icon: <BsCashCoin />, path: '/financing' }
    ]
  },
  {
    category: '自营商城管理',
    icon: <BsShopWindow />,
    color: 'from-red-400 to-red-600',
    items: [
      { name: '订单管理', icon: <BsBoxArrowInRight />, path: '/self-mall/orders' },
      { name: '发货管理', icon: <BsTruck />, path: '/self-mall/shipping' },
      { name: '商城装饰', icon: <BsPaletteFill />, path: '/self-mall/decoration' }
    ]
  },
  {
    category: '会员管理',
    icon: <BsPeople />,
    color: 'from-cyan-400 to-cyan-600',
    items: [
      { name: '会员分析', icon: <BsGraphUpArrow />, path: '/members/analysis' },
      { name: '会员信息', icon: <BsPersonLinesFill />, path: '/members/info' },
      { name: '会员触达', icon: <BsMailbox2 />, path: '/members/reach' },
      { name: '会员设置', icon: <BsSliders />, path: '/members/settings' },
      { name: '会员记录', icon: <BsClipboardData />, path: '/members/records' }
    ]
  },
  {
    category: '城市乐园学院',
    icon: <BsBook />,
    color: 'from-teal-400 to-teal-600',
    items: [
      { name: '加盟商等级', icon: <BsTrophyFill />, path: '/academy/level' },
      { name: '学习资源', icon: <BsJournalBookmarkFill />, path: '/academy/resources' },
      { name: '运营咨询', icon: <BsQuestionCircleFill />, path: '/academy/consulting' }
    ]
  },
  {
    category: '系统设置',
    icon: <BsGearFill />,
    color: 'from-gray-400 to-gray-600',
    items: [
      { name: '员工管理', icon: <BsPersonBadgeFill />, path: '/settings/staff' },
      { name: '权限管理', icon: <BsShieldLockFill />, path: '/settings/permissions' },
      { name: '基础设置', icon: <BsSliders />, path: '/settings/basic' },
      { name: '更多设置', icon: <BsThreeDots />, path: '/settings/more' }
    ]
  }
]

const More: React.FC = () => {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')

  // 根据搜索词过滤功能列表，支持搜索菜单名称和功能名称
  const filteredFunctions = useMemo(() => {
    if (!searchValue.trim()) {
      return moreFunctions
    }
    
    const keyword = searchValue.toLowerCase().trim()
    
    return moreFunctions.map(category => {
      // 如果菜单名称匹配，返回该菜单下的所有功能
      if (category.category.toLowerCase().includes(keyword)) {
        return category
      }
      
      // 否则只返回匹配的功能项
      const filteredItems = category.items.filter(item => 
        item.name.toLowerCase().includes(keyword)
      )
      
      return {
        ...category,
        items: filteredItems
      }
    }).filter(category => category.items.length > 0)
  }, [searchValue])

  const handleItemClick = (path: string) => {
    // 这里可以根据实际情况处理路由跳转
    // 如果页面还未开发，可以显示提示
    console.log('Navigate to:', path)
    // navigate(path)
  }

  return (
    <div className="page-container page-with-fixed-navbar">
      <NavBar 
        onBack={() => navigate(-1)}
      >
        更多功能
      </NavBar>

      <div className="page-content pb-20">
        {/* 搜索结果提示 */}
        {searchValue && filteredFunctions.length === 0 && (
          <div className="flex flex-col text-gray-400 py-8">
            <BsSearch className="text-gray-400 text-3xl mb-2 mx-auto items-center justify-center" />
            <div className="text-center">未找到相关功能，试试其他关键词</div>
          </div>
        )}

        {/* 功能分类卡片 */}
        {filteredFunctions.map((category, index) => (
          <Card key={index} className="mb-3">
            {/* 分类标题 */}
            <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white text-xl">
                {category.icon}
              </div>
              <h2 className="text-base font-semibold text-gray-900">
                {category.category}
              </h2>
            </div>

            {/* 功能列表 */}
            <Grid columns={4} gap={12}>
              {category.items.map((item, itemIndex) => (
                <Grid.Item key={itemIndex} onClick={() => handleItemClick(item.path)}>
                  <div className="function-item">
                    <div className="text-2xl text-primary mb-2">
                      {item.icon}
                    </div>
                    <div className="text-[11px] text-gray-900 text-center leading-tight">
                      {item.name}
                    </div>
                  </div>
                </Grid.Item>
              ))}
            </Grid>
          </Card>
        ))}

        {/* 底部提示 */}
        {!searchValue && (
          <div className="text-center text-gray-400 text-xs py-4">
            更多功能持续开发中...
          </div>
        )}
      </div>

      {/* 固定在底部的搜索框 */}
      <div 
        className="fixed left-0 right-0 bg-white border-t border-gray-200 p-3 pb-10 shadow-lg z-50"
        style={{ 
          bottom: '0',
          maxWidth: '480px',
          margin: '0 auto'
        }}
      >
        <SearchBar 
          placeholder="搜索功能..." 
          value={searchValue}
          onChange={setSearchValue}
          onClear={() => setSearchValue('')}
        />
      </div>
    </div>
  )
}

export default More

