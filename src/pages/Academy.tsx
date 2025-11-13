// 乐园学院：学习资源、运营咨询
import React, { useState } from 'react'
import { NavBar, Tabs, List, Card, Tag } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import { courses, userInfo } from '../mock/data'

const Academy: React.FC = () => {
  const navigate = useNavigate()
  const [activeKey, setActiveKey] = useState('courses')

  return (
    <div className="page-container page-with-fixed-navbar">
      <NavBar onBack={() => navigate(-1)}>乐园学院</NavBar>

      {/* 加盟商等级卡片 - 固定在顶部，避开 NavBar 和 Tabs */}
      <div className="px-3 pt-3" style={{ marginTop: '48px' }}>
        <Card className="mb-3 bg-gradient-to-br from-primary to-primary-light">
          <div className="text-white p-2">
            <div className="text-xs opacity-90 mb-1">我的等级</div>
            <div className="text-xl font-semibold mb-2">
              {userInfo.level}
            </div>
            <div className="text-xs opacity-90">
              已学习课程 12 门 | 累计学时 36 小时
            </div>
          </div>
        </Card>
      </div>

      <Tabs activeKey={activeKey} onChange={setActiveKey}>
        <Tabs.Tab title="学习资源" key="courses">
          <div className="p-3">
            <div className="text-sm font-semibold mb-3">推荐课程</div>
            {courses.map(course => (
              <Card key={course.id} className="mb-3">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="text-[15px] font-medium mb-2">
                        {course.title}
                      </div>
                      <div className="flex items-center gap-3">
                        <Tag color='primary' fill='outline'>{course.duration}</Tag>
                        <span className="text-xs text-gray-500">
                          {course.students}人学习
                        </span>
                        <span className="text-xs text-primary">
                          ⭐ {course.rating}分
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Tabs.Tab>

        <Tabs.Tab title="运营咨询" key="consulting">
          <div className="p-3">
            <Card>
              <List>
                <List.Item clickable>在线客服咨询</List.Item>
                <List.Item clickable>预约运营顾问</List.Item>
                <List.Item clickable>加盟商社群</List.Item>
                <List.Item clickable>运营资料下载</List.Item>
              </List>
            </Card>

            <div className="mt-3">
              <Card className="bg-blue-50 border border-blue-200">
                <div className="p-2">
                  <div className="text-sm font-medium text-blue-900 mb-1">
                    💡 运营小贴士
                  </div>
                  <div className="text-xs text-blue-700">
                    双十一活动即将开始，建议提前准备营销素材和优惠券
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Tabs.Tab>
      </Tabs>
    </div>
  )
}

export default Academy
