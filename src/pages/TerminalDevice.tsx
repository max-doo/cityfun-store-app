// 终端设备：游玩项目、运营管理、设备管理、使用记录
import React, { useState } from 'react'
import { NavBar, Tabs, List, Tag, Button, Card } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import { projects } from '../mock/data'

const TerminalDevice: React.FC = () => {
  const navigate = useNavigate()
  const [activeKey, setActiveKey] = useState('projects')

  return (
    <div className="page-container page-with-fixed-navbar">
      <NavBar onBack={() => navigate(-1)}>终端设备</NavBar>
      
      <Tabs activeKey={activeKey} onChange={setActiveKey}>
        {/* 游玩项目标签页 */}
        <Tabs.Tab title="游玩项目" key="projects">
          <div className="page-content">
            {/* 项目统计 */}
            <Card className="mb-3">
              <div className="flex justify-around p-2">
                <div className="text-center">
                  <div className="text-xl font-semibold text-primary mb-1">
                    {projects.length}
                  </div>
                  <div className="text-xs text-gray-500">总项目数</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-semibold text-green-500 mb-1">
                    {projects.filter(p => p.status === '运营中').length}
                  </div>
                  <div className="text-xs text-gray-500">运营中</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-semibold text-yellow-500 mb-1">
                    {projects.filter(p => p.status === '维护中').length}
                  </div>
                  <div className="text-xs text-gray-500">维护中</div>
                </div>
              </div>
            </Card>

            {/* 项目列表 */}
            <div className="section-title">项目列表</div>
            <List>
              {projects.map(project => (
                <List.Item
                  key={project.id}
                  description={
                    <div className="mt-1">
                      <div className="text-xs text-gray-500">
                        容量：{project.capacity}人
                        {project.waitTime !== '-' && ` | 等待时间：${project.waitTime}`}
                      </div>
                    </div>
                  }
                  extra={
                    <div className="flex flex-col items-end">
                      <Tag 
                        color={project.status === '运营中' ? 'success' : 'warning'} 
                        fill='outline'
                        className="mb-2"
                      >
                        {project.status}
                      </Tag>
                      <Button size='small' color='primary'>
                        管理
                      </Button>
                    </div>
                  }
                >
                  <div className="text-sm font-medium">{project.name}</div>
                </List.Item>
              ))}
            </List>

            <Button block color='primary' className="mt-3">
              + 添加项目
            </Button>
          </div>
        </Tabs.Tab>

        {/* 运营管理标签页 */}
        <Tabs.Tab title="运营管理" key="operations">
          <div className="page-content">
            <Card className="mb-3">
              <div className="text-sm font-semibold mb-3">运营管理</div>
              <div className="space-y-3">
                <div className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="text-sm font-medium text-gray-900 mb-1">终端配置</div>
                  <div className="text-xs text-gray-500">配置终端设备参数和设置</div>
                </div>
                <div className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="text-sm font-medium text-gray-900 mb-1">设备维修</div>
                  <div className="text-xs text-gray-500">查看和管理设备维修记录</div>
                </div>
              </div>
            </Card>
          </div>
        </Tabs.Tab>

        {/* 设备管理标签页 */}
        <Tabs.Tab title="设备管理" key="devices">
          <div className="page-content">
            <Card className="mb-3">
              <div className="text-sm font-semibold mb-3">设备状态概览</div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-2">
                  <div className="text-xl font-semibold text-green-500 mb-1">
                    12
                  </div>
                  <div className="text-xs text-gray-500">运营中</div>
                </div>
                <div className="text-center p-2">
                  <div className="text-xl font-semibold text-yellow-500 mb-1">
                    2
                  </div>
                  <div className="text-xs text-gray-500">维护中</div>
                </div>
                <div className="text-center p-2">
                  <div className="text-xl font-semibold text-gray-500 mb-1">
                    1
                  </div>
                  <div className="text-xs text-gray-500">已停用</div>
                </div>
              </div>
            </Card>
            <div className="section-title">设备列表</div>
            <List>
              <List.Item
                description={
                  <div className="mt-1">
                    <div className="text-xs text-gray-500">
                      设备编号：DEV001 | 安装位置：A区
                    </div>
                  </div>
                }
                extra={
                  <Tag color='success' fill='outline'>
                    运营中
                  </Tag>
                }
              >
                <div className="text-sm font-medium">旋转木马终端</div>
              </List.Item>
              <List.Item
                description={
                  <div className="mt-1">
                    <div className="text-xs text-gray-500">
                      设备编号：DEV002 | 安装位置：B区
                    </div>
                  </div>
                }
                extra={
                  <Tag color='warning' fill='outline'>
                    维护中
                  </Tag>
                }
              >
                <div className="text-sm font-medium">海盗船终端</div>
              </List.Item>
            </List>
          </div>
        </Tabs.Tab>

        {/* 使用记录标签页 */}
        <Tabs.Tab title="使用记录" key="records">
          <div className="page-content">
            <List>
              <List.Item
                description={
                  <div className="mt-1">
                    <div className="text-xs text-gray-500">
                      设备：旋转木马终端 | 使用时间：2023-11-06 14:30
                    </div>
                  </div>
                }
                extra={
                  <Tag color='success' fill='outline'>
                    正常
                  </Tag>
                }
              >
                <div className="text-sm font-medium">记录编号：REC001</div>
              </List.Item>
              <List.Item
                description={
                  <div className="mt-1">
                    <div className="text-xs text-gray-500">
                      设备：海盗船终端 | 使用时间：2023-11-06 13:15
                    </div>
                  </div>
                }
                extra={
                  <Tag color='success' fill='outline'>
                    正常
                  </Tag>
                }
              >
                <div className="text-sm font-medium">记录编号：REC002</div>
              </List.Item>
            </List>
          </div>
        </Tabs.Tab>
      </Tabs>
    </div>
  )
}

export default TerminalDevice
