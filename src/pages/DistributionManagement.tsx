// 分销管理：员工分销、用户分销、渠道分销
import React, { useState } from 'react'
import { NavBar, Tabs, Card, Grid } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import { distribution } from '../mock/data'

const DistributionManagement: React.FC = () => {
  const navigate = useNavigate()
  const [activeKey, setActiveKey] = useState('staff')

  return (
    <div className="page-container page-with-fixed-navbar">
      <NavBar onBack={() => navigate(-1)}>分销管理</NavBar>

      <Tabs activeKey={activeKey} onChange={setActiveKey}>
        <Tabs.Tab title="员工分销" key="staff">
          <div className="page-content">
            <Card>
              <div className="text-sm font-semibold mb-3">数据概览</div>
              <Grid columns={3} gap={8}>
                <Grid.Item>
                  <div className="text-center p-2">
                    <div className="text-lg font-semibold text-primary mb-1">
                      {distribution.staff.count}
                    </div>
                    <div className="text-[11px] text-gray-500">分销员工</div>
                  </div>
                </Grid.Item>
                <Grid.Item>
                  <div className="text-center p-2">
                    <div className="text-lg font-semibold text-primary mb-1">
                      ¥{distribution.staff.sales.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-gray-500">销售额</div>
                  </div>
                </Grid.Item>
                <Grid.Item>
                  <div className="text-center p-2">
                    <div className="text-lg font-semibold text-primary mb-1">
                      ¥{distribution.staff.commission.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-gray-500">佣金</div>
                  </div>
                </Grid.Item>
              </Grid>
            </Card>
          </div>
        </Tabs.Tab>

        <Tabs.Tab title="用户分销" key="user">
          <div className="page-content">
            <Card>
              <div className="text-sm font-semibold mb-3">数据概览</div>
              <Grid columns={3} gap={8}>
                <Grid.Item>
                  <div className="text-center p-2">
                    <div className="text-lg font-semibold text-primary mb-1">
                      {distribution.user.count}
                    </div>
                    <div className="text-[11px] text-gray-500">分销用户</div>
                  </div>
                </Grid.Item>
                <Grid.Item>
                  <div className="text-center p-2">
                    <div className="text-lg font-semibold text-primary mb-1">
                      ¥{distribution.user.sales.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-gray-500">销售额</div>
                  </div>
                </Grid.Item>
                <Grid.Item>
                  <div className="text-center p-2">
                    <div className="text-lg font-semibold text-primary mb-1">
                      ¥{distribution.user.commission.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-gray-500">佣金</div>
                  </div>
                </Grid.Item>
              </Grid>
            </Card>
          </div>
        </Tabs.Tab>

        <Tabs.Tab title="渠道分销" key="channel">
          <div className="page-content">
            <Card>
              <div className="text-sm font-semibold mb-3">数据概览</div>
              <Grid columns={3} gap={8}>
                <Grid.Item>
                  <div className="text-center p-2">
                    <div className="text-lg font-semibold text-primary mb-1">
                      {distribution.channel.count}
                    </div>
                    <div className="text-[11px] text-gray-500">渠道数</div>
                  </div>
                </Grid.Item>
                <Grid.Item>
                  <div className="text-center p-2">
                    <div className="text-lg font-semibold text-primary mb-1">
                      ¥{distribution.channel.sales.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-gray-500">销售额</div>
                  </div>
                </Grid.Item>
                <Grid.Item>
                  <div className="text-center p-2">
                    <div className="text-lg font-semibold text-primary mb-1">
                      ¥{distribution.channel.commission.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-gray-500">佣金</div>
                  </div>
                </Grid.Item>
              </Grid>
            </Card>
          </div>
        </Tabs.Tab>
      </Tabs>
    </div>
  )
}

export default DistributionManagement
