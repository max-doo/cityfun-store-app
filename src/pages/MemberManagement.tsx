// 会员管理：会员信息、会员触达、会员设置、会员记录
import React, { useState, useMemo, useRef, useEffect } from 'react'
import { NavBar, Tabs, List, Tag, Card, Grid, Input, Button } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import { members, memberData, memberReachRecords, memberSettings, memberTagSettings, memberConsumptionRecords } from '../mock/data'
import DateRangePicker from '../components/DateRangePicker'
import ExportButton from '../components/ExportButton'

const MemberManagement: React.FC = () => {
  const navigate = useNavigate()
  const [activeKey, setActiveKey] = useState('info')
  const [searchValue, setSearchValue] = useState('')
  const [searchMember, setSearchMember] = useState('')
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [bottomHeight, setBottomHeight] = useState(160)
  const bottomRef = useRef<HTMLDivElement>(null)

  // 动态计算底部查询区域的高度
  useEffect(() => {
    const updateHeight = () => {
      if (bottomRef.current) {
        const height = bottomRef.current.offsetHeight
        setBottomHeight(height + 10)
      }
    }
    
    const timer = setTimeout(updateHeight, 100)
    window.addEventListener('resize', updateHeight)
    
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', updateHeight)
    }
  }, [])

  // 处理查询按钮点击
  const handleSearch = () => {
    setSearchMember(searchValue)
  }

  // 获取会员等级颜色
  const getLevelColor = (level: string) => {
    const colorMap: { [key: string]: 'success' | 'primary' | 'warning' | 'danger' | 'default' } = {
      '储值会员': 'warning',
      '普通会员': 'default',
    }
    return colorMap[level] || 'default'
  }

  // 筛选会员信息
  const filteredMembers = useMemo(() => {
    return members.filter(member => {
      if (searchMember && !member.name.includes(searchMember) && !member.phone.includes(searchMember)) {
        return false
      }
      return true
    })
  }, [searchMember])

  // 筛选会员触达记录
  const filteredReachRecords = useMemo(() => {
    return memberReachRecords.filter(record => {
      if (searchMember && !record.memberName.includes(searchMember) && !record.memberPhone.includes(searchMember)) {
        return false
      }
      
      if (startDate && endDate) {
        const recordDate = new Date(record.time)
        const start = new Date(startDate)
        start.setHours(0, 0, 0, 0)
        const end = new Date(endDate)
        end.setHours(23, 59, 59, 999)
        
        if (recordDate < start || recordDate > end) {
          return false
        }
      }
      
      return true
    })
  }, [searchMember, startDate, endDate])

  // 筛选会员消费记录
  const filteredConsumptionRecords = useMemo(() => {
    return memberConsumptionRecords.filter(record => {
      if (searchMember && !record.memberName.includes(searchMember) && !record.memberPhone.includes(searchMember)) {
        return false
      }
      
      if (startDate && endDate) {
        const recordDate = new Date(record.time)
        const start = new Date(startDate)
        start.setHours(0, 0, 0, 0)
        const end = new Date(endDate)
        end.setHours(23, 59, 59, 999)
        
        if (recordDate < start || recordDate > end) {
          return false
        }
      }
      
      return true
    })
  }, [searchMember, startDate, endDate])

  // 会员数据概览配置
  const overviewData = useMemo(() => [
    { label: '总会员', value: memberData.total },
    { label: '新增', value: memberData.new },
    { label: '活跃', value: memberData.active },
    { label: '储值会员', value: members.filter(m => m.level === '储值会员').length },
  ], [])

  // 导出按钮配置
  const tabs = [
    { key: 'info', title: '会员信息' },
    { key: 'reach', title: '会员触达' },
    { key: 'settings', title: '会员设置' },
    { key: 'records', title: '会员记录' }
  ]

  const dataMap = {
    info: filteredMembers,
    reach: filteredReachRecords,
    settings: memberSettings,
    records: filteredConsumptionRecords
  }

  return (
    <div className="page-container page-with-fixed-navbar">
      <NavBar onBack={() => navigate(-1)}>会员管理</NavBar>
      
      <Tabs activeKey={activeKey} onChange={setActiveKey}>
        {/* 会员信息标签页 */}
        <Tabs.Tab title="会员信息" key="info">
          <div className="page-content">
            {/* 会员数据概览 */}
            <Card className="mb-3">
              <div className="flex items-center justify-between mb-3">
                <div className="text-[14px] font-semibold">会员数据概览</div>
                <button
                  onClick={() => navigate('/analysis?tab=member')}
                  className="text-primary text-sm flex items-center gap-1 hover:opacity-80 active:opacity-60"
                >
                  查看详细分析&gt;&gt;
                </button>
              </div>
              <Grid columns={4} gap={8}>
                {overviewData.map((item, index) => (
                  <Grid.Item key={index}>
                    <div className="text-center p-2">
                      <div className="text-2xl font-semibold text-primary mb-1">
                        {item.value}
                      </div>
                      <div className="text-[11px] text-gray-500">{item.label}</div>
                    </div>
                  </Grid.Item>
                ))}
              </Grid>
            </Card>

            {/* 会员列表 */}
            <div className="section-title">会员列表</div>
            <List style={{ paddingBottom: `${bottomHeight}px` }}>
              {filteredMembers.map(member => (
                <List.Item
                  key={member.id}
                  prefix={
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white text-base font-semibold">
                      {member.name.charAt(0)}
                    </div>
                  }
                  description={
                    <div className="mt-1">
                      <div className="text-xs text-gray-500 mb-0.5">
                        {member.phone}
                      </div>
                      <div className="text-xs text-gray-500">
                        余额：¥{member.balance} | 积分：{member.points}
                      </div>
                    </div>
                  }
                  extra={
                    <Tag 
                      color={getLevelColor(member.level)} 
                      fill='outline'
                    >
                      {member.level}
                    </Tag>
                  }
                >
                  <div className="text-sm font-medium">{member.name}</div>
                </List.Item>
              ))}
            </List>
          </div>
        </Tabs.Tab>

        {/* 会员触达标签页 */}
        <Tabs.Tab title="会员触达" key="reach">
          <List style={{ paddingBottom: `${bottomHeight}px` }}>
            {filteredReachRecords.map(record => (
              <List.Item
                key={record.id}
                description={
                  <div className="mt-1">
                    <div className="text-xs text-gray-500 mb-0.5">
                      {record.memberPhone} | {record.time}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {record.content}
                    </div>
                  </div>
                }
                extra={
                  <div className="text-right">
                    <Tag color={record.result === '已查看' ? 'success' : 'default'} fill='outline' className="mb-1">
                      {record.result}
                    </Tag>
                    <div className="text-xs text-gray-500 mt-1">
                      {record.reachType}
                    </div>
                  </div>
                }
              >
                <div className="text-sm font-medium">{record.memberName}</div>
              </List.Item>
            ))}
          </List>
        </Tabs.Tab>

        {/* 会员设置标签页 */}
        <Tabs.Tab title="会员设置" key="settings">
          <div className="page-content">
            {/* 会员等级设置 */}
            <div className="section-title">会员等级设置</div>
            <List>
              {memberSettings.map(setting => (
                <List.Item
                  key={setting.id}
                  description={
                    <div className="mt-2 space-y-1">
                      <div className="text-xs text-gray-500">
                        升级条件：{setting.upgradeCondition}
                      </div>
                      <div className="text-xs text-gray-500">
                        会员权益：{setting.benefits}
                      </div>
                      <div className="text-xs text-gray-500">
                        折扣：{(setting.discount * 10).toFixed(1)}折 | 积分倍率：{setting.pointsRate}倍
                      </div>
                    </div>
                  }
                  extra={
                    <Tag color={getLevelColor(setting.level)} fill='outline'>
                      {setting.level}
                    </Tag>
                  }
                >
                  <div className="text-sm font-medium">{setting.level}</div>
                </List.Item>
              ))}
            </List>

            {/* 会员标签设置 */}
            <div className="section-title">会员标签设置</div>
            <div className="grid grid-cols-2 gap-3 px-3">
              {memberTagSettings.map((item, index) => {
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
                    <div className="text-sm font-medium text-gray-800 mb-2">{item.tag}</div>
                    <div className="text-xs text-gray-500 mb-1">会员数：{item.count}人</div>
                    <div className="text-xs text-gray-500 mb-1">占比：{item.ratio}%</div>
                    <div className={`text-base font-semibold ${colors[index].text} mt-1`}>
                      平均客单价：¥{item.avgPrice}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </Tabs.Tab>

        {/* 会员记录标签页 */}
        <Tabs.Tab title="会员记录" key="records">
          <List style={{ paddingBottom: `${bottomHeight}px` }}>
            {filteredConsumptionRecords.map(record => (
              <List.Item
                key={record.id}
                description={
                  <div className="mt-1">
                    <div className="text-xs text-gray-500 mb-0.5">
                      {record.memberPhone} | {record.time}
                    </div>
                    <div className="text-xs text-gray-500">
                      订单号：{record.orderId} | 支付方式：{record.paymentMethod}
                    </div>
                  </div>
                }
                extra={
                  <div className="text-right">
                    <div className="text-base font-semibold text-primary mb-1">
                      ¥{record.amount}
                    </div>
                    <div className="text-xs text-gray-500">
                      积分：+{record.points}
                    </div>
                  </div>
                }
              >
                <div className="flex items-center">
                  <span className="text-sm font-medium">{record.memberName}</span>
                  <Tag color='default' className="ml-2" fill='outline'>
                    {record.type}
                  </Tag>
                </div>
              </List.Item>
            ))}
          </List>
        </Tabs.Tab>
      </Tabs>

      {/* 导出按钮（会员设置页面不显示） */}
      {activeKey !== 'settings' && (
        <ExportButton 
          activeKey={activeKey}
          tabs={tabs}
          dataMap={dataMap}
          bottom={
            activeKey === 'reach' || activeKey === 'records' 
              ? bottomHeight + 20 // 会员触达和会员记录增加更多底部高度
              : bottomHeight
          }
        />
      )}

      {/* 固定在底部的查询区域（会员设置页面不显示） */}
      {activeKey !== 'settings' && (
        <div 
          ref={bottomRef}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 pb-3"
          style={{ 
            maxWidth: '480px', 
            margin: '0 auto',
            boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.08)'
          }}
        >
        <div className="p-3 space-y-3">
          {/* 日期范围选择器（仅会员触达和会员记录显示） */}
          {(activeKey === 'reach' || activeKey === 'records') && (
            <DateRangePicker
              title="记录日期"
              startDate={startDate}
              endDate={endDate}
              onRangeChange={(start, end) => {
                setStartDate(start)
                setEndDate(end)
              }}
              showToast={false}
            />
          )}
          
          {/* 会员搜索输入和查询按钮 */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 whitespace-nowrap">会员</span>
            <div className="w-full">
              <Input
                placeholder="输入会员姓名或手机号"
                value={searchValue}
                onChange={setSearchValue}
                clearable
                onEnterPress={handleSearch}
                style={{ 
                  '--font-size': '14px',
                }}
                className="p-2 border border-gray-300 rounded-md focus:border-primary"
              />
            </div>
            <div className="flex-1 flex justify-end">
              <Button 
                color="primary"
                size="middle"
                onClick={handleSearch}
                style={{
                  minWidth: '120px'
                }}
              >
                查询
              </Button>
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  )
}

export default MemberManagement
