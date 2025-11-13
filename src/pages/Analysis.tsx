// 分析页：营收、会员、游玩、库存分析（标签切换）
import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd-mobile'
import { useSearchParams } from 'react-router-dom'
import { BsArrowUpShort, BsArrowDownShort } from 'react-icons/bs'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import DateRangePicker from '../components/DateRangePicker'
import ExportButton from '../components/ExportButton'
import { 
  revenueAnalysis, 
  memberAnalysis, 
  playAnalysis, 
  inventoryAnalysis 
} from '../mock/data'

const Analysis: React.FC = () => {
  const [searchParams] = useSearchParams()
  const tabFromUrl = searchParams.get('tab')
  const [activeKey, setActiveKey] = useState(tabFromUrl || 'revenue')

  // 当 URL 参数变化时，更新 activeKey
  useEffect(() => {
    if (tabFromUrl) {
      setActiveKey(tabFromUrl)
    }
  }, [tabFromUrl])

  const tabs = [
    { key: 'revenue', title: '营收' },
    { key: 'member', title: '会员' },
    { key: 'play', title: '游玩' },
    { key: 'inventory', title: '库存' },
  ]

  // 数据映射
  const dataMap: Record<string, any> = {
    revenue: revenueAnalysis,
    member: memberAnalysis,
    play: playAnalysis,
    inventory: inventoryAnalysis,
  }

  return (
    <div className="page-container">
      {/* Header 容器 */}
      <div className="fixed top-0 left-0 right-0 z-50 max-w-[480px] mx-auto bg-[#1A0A00] h-[48px] flex items-center px-4">
        <span className="text-xl font-semibold text-gray-400 flex-1 text-center">数据分析</span>
      </div>
      {/* 固定在顶部的 Tabs 标签栏 */}
      <div 
        className="fixed left-0 right-0 z-40 max-w-[480px] mx-auto bg-white page-tabs"
        style={{ top: '48px' }}
      >
        <Tabs activeKey={activeKey} onChange={setActiveKey}>
          {tabs.map(tab => (
            <Tabs.Tab title={tab.title} key={tab.key} />
          ))}
        </Tabs>
      </div>
      
      {/* 内容区域 - 添加顶部间距避免被固定元素遮挡 */}
      <div style={{ paddingTop: 'var(--top-fixed-height)' }}>
        <div className="pb-4">
          {/* 营收分析 */}
          {activeKey === 'revenue' && <RevenueContent />}
          
          {/* 会员分析 */}
          {activeKey === 'member' && <MemberContent />}
          
          {/* 游玩分析 */}
          {activeKey === 'play' && <PlayContent />}
          
          {/* 库存分析 */}
          {activeKey === 'inventory' && <InventoryContent />}
        </div>
      </div>

      {/* 浮动操作按钮 - 导出报表 */}
      <ExportButton 
        activeKey={activeKey}
        tabs={tabs}
        dataMap={dataMap}
      />
    </div>
  )
}

// 营收分析内容组件
const RevenueContent: React.FC = () => {
  const { summary, dailyTrend, categoryRevenue } = revenueAnalysis

  // 概览卡片数据配置
  const overviewCards = [
    {
      label: '今日营收',
      revenue: summary.today.revenue,
      orders: summary.today.orders,
      compareValue: summary.yesterday.revenue,
      compareLabel: '较昨日',
      formatRevenue: (val: number) => `${val.toLocaleString()}`
    },
    {
      label: '本周营收',
      revenue: summary.week.revenue,
      orders: summary.week.orders,
      trend: 8.3,
      compareLabel: '较上周',
      formatRevenue: (val: number) => `${(val / 1000).toFixed(1)}k`
    },
    {
      label: '本月营收',
      revenue: summary.month.revenue,
      orders: summary.month.orders,
      trend: 15.7,
      compareLabel: '较上月',
      formatRevenue: (val: number) => `${(val / 1000).toFixed(1)}k`
    }
  ]

  // 自定义 Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const total = payload.reduce((sum: number, item: any) => sum + item.value, 0)
      return (
        <div className="bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg text-xs">
          <p className="font-semibold mb-1">{payload[0].payload.date}</p>
          <p className="text-blue-300">员工分销: ¥{(payload[0].value / 1000).toFixed(1)}k</p>
          <p className="text-green-300">用户分销: ¥{(payload[1].value / 1000).toFixed(1)}k</p>
          <p className="text-orange-300">第三方渠道: ¥{(payload[2].value / 1000).toFixed(1)}k</p>
          <p className="text-gray-300 mt-1 pt-1 border-t border-gray-600">总计: ¥{(total / 1000).toFixed(1)}k</p>
          <p className="text-gray-400">订单: {payload[0].payload.orders}笔</p>
        </div>
      )
    }
    return null
  }

  // 渲染趋势组件
  const renderTrend = (card: typeof overviewCards[0]) => {
    if (card.compareValue !== undefined) {
      // 动态计算今日环比
      const isIncrease = card.revenue > card.compareValue
      const percentage = isIncrease
        ? ((card.revenue / card.compareValue - 1) * 100).toFixed(1)
        : ((1 - card.revenue / card.compareValue) * 100).toFixed(1)
      
      return (
        <>
          {isIncrease ? (
            <BsArrowUpShort className="text-green-500 text-lg" />
          ) : (
            <BsArrowDownShort className="text-red-500 text-lg" />
          )}
          <span className={isIncrease ? 'text-green-500' : 'text-red-500'}>
            {percentage}%
          </span>
        </>
      )
    } else if (card.trend !== undefined) {
      // 固定趋势值
      return (
        <>
          <BsArrowUpShort className="text-green-500 text-lg" />
          <span className="text-green-500">{card.trend}%</span>
        </>
      )
    }
    return null
  }

  return (
    <div className="px-4">
      {/* 概览数据卡片 */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        {overviewCards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl p-3 flex flex-col items-center">
            <div className="text-sm text-gray-600 mb-1">{card.label}</div>
            <div className="text-3xl font-bold text-primary ">
              {card.formatRevenue(card.revenue)}
            </div>
            <div className="text-sm text-gray-500 mt-1">{card.orders}笔订单</div>
            <div className="flex items-center justify-center mt-2 text-sm">
              {renderTrend(card)}
              <span className="text-gray-400 ml-1">{card.compareLabel}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 分析图表 - 使用 recharts */}
      <div className="mt-4 bg-white rounded-xl p-4 shadow-sm">
        {/* 日期范围选择器 */}
        <div className="border-b border-gray-200 pb-2 mb-2">
          <DateRangePicker title="分析时段" />
        </div>
        {/* 营收趋势 */}
        <h3 className="text-base font-semibold text-gray-800 mb-4">营收趋势</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={dailyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 11, fill: '#999' }}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis 
              tick={{ fontSize: 11, fill: '#999' }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }} />
            <Legend 
              formatter={(value) => {
                if (value === 'employeeDistribution') return '员工分销'
                if (value === 'userDistribution') return '用户分销'
                if (value === 'thirdParty') return '第三方渠道'
                return value
              }}
              iconType="rect"
              wrapperStyle={{ fontSize: '12px' }}
            />
            {/* 员工分销 */}
            <Bar 
              dataKey="employeeDistribution" 
              stackId="revenue"
              fill="url(#colorEmployee)" 
              radius={[0, 0, 0, 0]}
              maxBarSize={40}
            />
            {/* 用户分销 */}
            <Bar 
              dataKey="userDistribution" 
              stackId="revenue"
              fill="url(#colorUser)" 
              radius={[0, 0, 0, 0]}
              maxBarSize={40}
            />
            {/* 第三方渠道 */}
            <Bar 
              dataKey="thirdParty" 
              stackId="revenue"
              fill="url(#colorThirdParty)" 
              radius={[8, 8, 0, 0]}
              maxBarSize={40}
            />
            <defs>
              <linearGradient id="colorEmployee" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity={1} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={1} />
              </linearGradient>
              <linearGradient id="colorUser" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34d399" stopOpacity={1} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={1} />
              </linearGradient>
              <linearGradient id="colorThirdParty" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity={1} />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity={1} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>

        {/* 营收构成 - 饼状图 */}
        <div className="mt-6 pt-2 border-t border-gray-200">
          <h3 className="text-base font-semibold text-gray-800">营收构成</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={categoryRevenue}
                dataKey="revenue"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={({ name, ratio }) => `${name} ${ratio}%`}
                labelLine={{ stroke: '#999', strokeWidth: 1 }}
              >
                {categoryRevenue.map((_entry, index) => {
                  const colors = ['#fb923c', '#06b6d4', '#ec4899', '#9ca3af']
                  return <Cell key={`cell-${index}`} fill={colors[index]} />
                })}
              </Pie>
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-black bg-opacity-85 text-white px-3 py-2 rounded-lg shadow-lg text-xs">
                        <p className="font-semibold">{payload[0].name}</p>
                        <p>营收: ¥{(payload[0].value / 1000).toFixed(1)}k</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Legend 
                layout="vertical"
                verticalAlign="middle" 
                align="left"
                iconType="circle"
                formatter={(value) => <span style={{ color: '#6b7280', fontSize: '12px' }}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

// 会员分析内容组件
const MemberContent: React.FC = () => {
  const { summary, userProfileTags, dailyVisitors, dailyNewMembers, consumptionRanking } = memberAnalysis

  // 概览卡片数据配置
  const overviewCards = [
    {
      label: '总会员数',
      value: summary.total,
      color: 'text-gray-800',
      format: (val: number) => val.toString()
    },
    {
      label: '储值会员数',
      value: summary.storedValueMembers,
      color: 'text-blue-600',
      format: (val: number) => val.toString()
    },
    {
      label: '会员储值',
      value: summary.storedValue,
      color: 'text-green-600',
      format: (val: number) => `¥${(val / 1000).toFixed(0)}k`
    },
    {
      label: '今日到店数',
      value: summary.todayVisit,
      color: 'text-orange-600',
      format: (val: number) => val.toString()
    },
    {
      label: '今日新增会员',
      value: summary.newToday,
      color: 'text-purple-600',
      format: (val: number) => val.toString()
    },
    {
      label: '本周活跃会员数',
      value: summary.weeklyActive,
      color: 'text-cyan-600',
      format: (val: number) => val.toString()
    }
  ]

  return (
    <div className="px-4">
      {/* 概览数据卡片 */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        {overviewCards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl p-3 flex flex-col items-center">
            <div className="text-sm text-gray-600 mb-1">{card.label}</div>
            <div className={`text-3xl font-bold ${card.color}`}>
              {card.format(card.value)}
            </div>
          </div>
        ))}
      </div>
      
      {/* 到店人数趋势 - 使用 recharts */}
      <div className="mt-4 bg-white rounded-xl p-4 shadow-sm">
        <h3 className="text-base font-semibold text-gray-800 mb-3">到店人数趋势</h3>
        {/* 日期范围选择器 */}
        <div className="border-b border-gray-200 pb-2 mb-2">
          <DateRangePicker title="分析时段" />
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={dailyVisitors} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 11, fill: '#999' }}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis 
              tick={{ fontSize: 11, fill: '#999' }}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: 'none', 
                borderRadius: '8px',
                fontSize: '12px',
                color: '#fff'
              }}
              labelStyle={{ color: '#fff' }}
              formatter={(value: any, name: string) => {
                let label = ''
                if (name === 'normalMembers') label = '普通会员'
                else if (name === 'storedValueMembers') label = '储值会员'
                else if (name === 'walkIn') label = '散客'
                return [`${value}人`, label]
              }}
            />
            <Legend 
              formatter={(value) => {
                if (value === 'normalMembers') return '到店普通会员'
                if (value === 'storedValueMembers') return '到店储值会员'
                if (value === 'walkIn') return '到店散客'
                return value
              }}
              iconType="rect"
              wrapperStyle={{ fontSize: '12px' }}
            />
            <Bar 
              dataKey="normalMembers" 
              stackId="visitors"
              fill="url(#colorVisitorNormal)" 
              radius={[0, 0, 0, 0]}
              maxBarSize={35}
            />
            <Bar 
              dataKey="storedValueMembers" 
              stackId="visitors"
              fill="url(#colorVisitorStored)" 
              radius={[0, 0, 0, 0]}
              maxBarSize={35}
            />
            <Bar 
              dataKey="walkIn" 
              stackId="visitors"
              fill="url(#colorVisitorWalkIn)" 
              radius={[8, 8, 0, 0]}
              maxBarSize={35}
            />
            <defs>
              <linearGradient id="colorVisitorNormal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity={1} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={1} />
              </linearGradient>
              <linearGradient id="colorVisitorStored" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34d399" stopOpacity={1} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={1} />
              </linearGradient>
              <linearGradient id="colorVisitorWalkIn" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity={1} />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity={1} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 新增会员趋势 - 使用 recharts */}
      <div className="mt-4 bg-white rounded-xl p-4 shadow-sm">
        <h3 className="text-base font-semibold text-gray-800 mb-3">新增会员趋势</h3>
        {/* 日期范围选择器 */}
        <div className="border-b border-gray-200 pb-2 mb-2">
          <DateRangePicker title="分析时段" />
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={dailyNewMembers} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 11, fill: '#999' }}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis 
              tick={{ fontSize: 11, fill: '#999' }}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: 'none', 
                borderRadius: '8px',
                fontSize: '12px',
                color: '#fff'
              }}
              labelStyle={{ color: '#fff' }}
              formatter={(value: any, name: string) => {
                const label = name === 'normalMembers' ? '普通会员' : '储值会员'
                return [`${value}人`, label]
              }}
            />
            <Legend 
              formatter={(value) => {
                if (value === 'normalMembers') return '普通会员'
                if (value === 'storedValueMembers') return '储值会员'
                return value
              }}
              iconType="rect"
              wrapperStyle={{ fontSize: '12px' }}
            />
            <Bar 
              dataKey="normalMembers" 
              stackId="members"
              fill="url(#colorNormalMember)" 
              radius={[0, 0, 0, 0]}
              maxBarSize={35}
            />
            <Bar 
              dataKey="storedValueMembers" 
              stackId="members"
              fill="url(#colorStoredValueMember)" 
              radius={[8, 8, 0, 0]}
              maxBarSize={35}
            />
            <defs>
              <linearGradient id="colorNormalMember" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity={1} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={1} />
              </linearGradient>
              <linearGradient id="colorStoredValueMember" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34d399" stopOpacity={1} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={1} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 用户画像分析 */}
      <div className="mt-4 bg-white rounded-xl p-4 shadow-sm">
        <h3 className="text-base font-semibold text-gray-800 mb-2">用户画像分析</h3>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={userProfileTags}
              dataKey="count"
              nameKey="tag"
              cx="50%"
              cy="50%"
              outerRadius={85}
              label={({ tag, ratio }) => `${tag} ${ratio}%`}
              labelLine={{ stroke: '#999', strokeWidth: 1 }}
            >
              {userProfileTags.map((_entry, index) => {
                const colors = ['#3b82f6', '#ec4899', '#10b981', '#f59e0b']
                return <Cell key={`cell-${index}`} fill={colors[index]} />
              })}
            </Pie>
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-black bg-opacity-85 text-white px-3 py-2 rounded-lg shadow-lg text-xs">
                      <p className="font-semibold">{payload[0].name}</p>
                      <p>会员数: {payload[0].value}人</p>
                      <p>占比: {payload[0].payload.ratio}%</p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Legend 
              layout="vertical"
              verticalAlign="middle" 
              align="left"
              iconType="circle"
              formatter={(value) => <span style={{ color: '#6b7280', fontSize: '12px' }}>{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* 不同人群客单价 */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">平均客单价分析</h4>
          <div className="grid grid-cols-2 gap-3">
            {userProfileTags.map((item, index) => {
              const colors = [
                { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
                { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-200' },
                { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
                { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' },
              ]
              return (
                <div 
                  key={index} 
                  className={`${colors[index].bg} ${colors[index].border} border rounded-lg p-3 flex flex-col`}
                >
                  <div className="text-xs text-gray-600 mb-1">{item.tag}</div>
                  <div className={`text-2xl font-bold ${colors[index].text}`}>
                    ¥{item.avgPrice}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* 消费排行 */}
      <div className="mt-4 bg-white rounded-xl p-4 shadow-sm mb-4">
        <h3 className="text-base font-semibold text-gray-800 mb-3">消费排行榜（本月）</h3>
        <div className="space-y-3">
          {consumptionRanking.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                index === 0 ? 'bg-yellow-400 text-white' :
                index === 1 ? 'bg-gray-400 text-white' :
                index === 2 ? 'bg-orange-400 text-white' :
                'bg-gray-200 text-gray-600'
              }`}>
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-800">{item.name}</div>
                <div className="text-xs text-gray-400">{item.phone}</div>
              </div>
              <div className="text-sm font-semibold text-gray-800">
                ¥{item.consumption.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 游玩分析内容组件
const PlayContent: React.FC = () => {
  const { summary, projectPopularity, hourlyDistribution, peakPeriods } = playAnalysis

  // 概览卡片数据配置
  const overviewCards = [
    {
      label: '总游玩次数',
      value: summary.totalPlays,
      color: 'text-gray-800',
      format: (val: number) => val.toString()
    },
    {
      label: '核销门票',
      value: summary.ticketVerified,
      color: 'text-blue-600',
      format: (val: number) => val.toString()
    },
    {
      label: '平均时长',
      value: summary.avgDuration,
      color: 'text-green-600',
      format: (val: number) => `${val}h`
    },
    {
      label: '满意度',
      value: summary.satisfaction,
      color: 'text-orange-600',
      format: (val: number) => val.toString()
    }
  ]

  return (
    <div className="px-4">
      {/* 概览数据卡片 */}
      <div className="mt-4 grid grid-cols-4 gap-3">
        {overviewCards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl p-3 flex flex-col items-center">
            <div className="text-sm text-gray-600 mb-1">{card.label}</div>
            <div className={`text-3xl font-bold ${card.color}`}>
              {card.format(card.value)}
            </div>
          </div>
        ))}
      </div>



      {/* 项目热度 */}
      <div className="mt-4 bg-white rounded-xl p-4 shadow-sm">
        <h3 className="text-base font-semibold text-gray-800 mb-3">项目热度分析</h3>
        {/* 日期范围选择器 */}
        <div className="border-b border-gray-200 pb-2 mb-2">
          <DateRangePicker title="分析时段" />
        </div>
        <div className="space-y-3">
          {projectPopularity.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">{item.name}</span>
                <span className="text-xs text-gray-500">
                  {item.plays}/{item.capacity} ({item.rate}%)
                </span>
              </div>
              {/* 游玩次数条形图 */}
              <div className="bg-gray-100 rounded-full h-8 overflow-hidden relative">
                <div 
                  className={`h-full rounded-full ${
                    item.rate > 80 ? 'bg-gradient-to-r from-red-400 to-red-500' :
                    item.rate > 60 ? 'bg-gradient-to-r from-orange-400 to-orange-500' :
                    'bg-gradient-to-r from-green-400 to-green-500'
                  }`}
                  style={{ width: `${item.rate}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-medium text-white">
                    游玩{item.plays}次
                  </span>
                </div>
              </div>
              {/* 核销数量条形图 */}
              <div className="mt-1 bg-gray-50 rounded-full h-5 overflow-hidden relative">
                <div 
                  className={`h-full rounded-full ${
                    ((item as any).verification / item.plays) < 0.85 
                      ? 'bg-red-800' 
                      : 'bg-gray-300'
                  }`}
                  style={{ width: `${((item as any).verification / item.capacity * 100)}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-medium text-white">
                    核销{(item as any).verification}次
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 时段客流分布图 - 使用 recharts */}
      <div className="mt-4 bg-white rounded-xl p-4 shadow-sm">
        <h3 className="text-base font-semibold text-gray-800 mb-3">时段客流分布</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={hourlyDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="hour" 
              tick={{ fontSize: 10, fill: '#999' }}
              axisLine={{ stroke: '#e5e7eb' }}
              interval={0}
            />
            <YAxis 
              tick={{ fontSize: 11, fill: '#999' }}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: 'none', 
                borderRadius: '8px',
                fontSize: '12px',
                color: '#fff'
              }}
              labelStyle={{ color: '#fff' }}
              formatter={(value: any) => [`${value}人`, '访客数']}
            />
            <Bar 
              dataKey="visitors" 
              fill="url(#colorVisitors)" 
              radius={[6, 6, 0, 0]}
              maxBarSize={25}
            />
            <defs>
              <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity={1} />
                <stop offset="100%" stopColor="#f97316" stopOpacity={1} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-2 text-xs text-gray-500 text-center">
          高峰时段：14:00-17:00
        </div>
      </div>

      {/* 高峰期分析 */}
      <div className="mt-4 bg-white rounded-xl p-4 shadow-sm mb-4">
        <h3 className="text-base font-semibold text-gray-800 mb-3">客流高峰分析</h3>
        <div className="space-y-3">
          {peakPeriods.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  index === 0 ? 'bg-red-100' : 'bg-blue-100'
                }`}>
                  <span className="text-lg">
                    {index === 0 ? '📅' : '💼'}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-800">{item.period}</div>
                  <div className="text-xs text-gray-500">日均{item.avgVisitors}人次</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-800">{item.ratio}%</div>
                <div className="text-xs text-gray-400">占比</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 库存分析内容组件
const InventoryContent: React.FC = () => {
  const { summary, categoryStock, lowStockProducts, topSelling } = inventoryAnalysis

  // 概览卡片数据配置
  const overviewCards = [
    {
      label: '商品总数',
      value: summary.totalProducts,
      color: 'text-gray-800',
      format: (val: number) => val.toString()
    },
    {
      label: '库存预警',
      value: summary.lowStock,
      color: 'text-orange-600',
      format: (val: number) => val.toString()
    },
    {
      label: '缺货商品',
      value: summary.outOfStock,
      color: 'text-red-600',
      format: (val: number) => val.toString()
    },
    {
      label: '库存总值',
      value: summary.totalValue,
      color: 'text-green-600',
      format: (val: number) => `¥${(val / 1000).toFixed(0)}k`
    }
  ]

  return (
    <div className="px-4">
      {/* 概览数据卡片 */}
      <div className="mt-4 grid grid-cols-4 gap-3">
        {overviewCards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl p-3 flex flex-col items-center">
            <div className="text-sm text-gray-600 mb-1">{card.label}</div>
            <div className={`text-3xl font-bold ${card.color}`}>
              {card.format(card.value)}
            </div>
          </div>
        ))}
      </div>

      {/* 分类库存 - 饼状图 */}
      <div className="mt-4 bg-white rounded-xl p-4 shadow-sm">
        <h3 className="text-base font-semibold text-gray-800 mb-3">分类库存统计</h3>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={categoryStock}
              dataKey="value"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label={({ category, ratio }) => `${category} ${ratio}%`}
              labelLine={{ stroke: '#999', strokeWidth: 1 }}
            >
              {categoryStock.map((_entry, index) => {
                const colors = ['#a855f7', '#ec4899', '#06b6d4', '#fb923c']
                return <Cell key={`cell-${index}`} fill={colors[index]} />
              })}
            </Pie>
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-black bg-opacity-85 text-white px-3 py-2 rounded-lg shadow-lg text-xs">
                      <p className="font-semibold">{payload[0].name}</p>
                      <p>商品种类: {payload[0].payload.count}种</p>
                      <p>库存价值: ¥{(payload[0].value / 1000).toFixed(1)}k</p>
                      <p>占比: {payload[0].payload.ratio}%</p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Legend 
              layout="vertical"
              verticalAlign="middle" 
              align="left"
              iconType="circle"
              formatter={(value) => <span style={{ color: '#6b7280', fontSize: '12px' }}>{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 低库存预警 */}
      <div className="mt-4 bg-white rounded-xl p-4 shadow-sm">
        <h3 className="text-base font-semibold text-gray-800 mb-3">库存预警</h3>
        <div className="space-y-2">
          {lowStockProducts.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-800">{item.name}</div>
                <div className="text-xs text-gray-400 mt-0.5">
                  当前库存：{item.current} / 最低：{item.min}
                </div>
              </div>
              <div className={`text-xs px-2 py-1 rounded ${
                item.status === '缺货' ? 'bg-red-100 text-red-600' :
                item.status === '库存紧张' ? 'bg-orange-100 text-orange-600' :
                'bg-yellow-100 text-yellow-600'
              }`}>
                {item.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 畅销商品 */}
      <div className="mt-4 bg-white rounded-xl p-4 shadow-sm mb-4">
        <h3 className="text-base font-semibold text-gray-800 mb-3">畅销商品排行</h3>
        <div className="space-y-3">
          {topSelling.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                index === 0 ? 'bg-yellow-400 text-white' :
                index === 1 ? 'bg-gray-400 text-white' :
                index === 2 ? 'bg-orange-400 text-white' :
                'bg-gray-200 text-gray-600'
              }`}>
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-800">{item.name}</div>
                <div className="text-xs text-gray-400">销量 {item.sales}</div>
              </div>
              <div className="text-sm font-semibold text-gray-800">
                ¥{item.revenue.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Analysis
