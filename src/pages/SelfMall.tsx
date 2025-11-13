// 自营商城：订单管理、发货管理、商城装饰
import React, { useState } from 'react'
import { NavBar, Tabs, Card, Grid, List } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'

const SelfMall: React.FC = () => {
  const navigate = useNavigate()
  const [activeKey, setActiveKey] = useState('overview')

  return (
    <div className="page-container page-with-fixed-navbar">
      <NavBar onBack={() => navigate(-1)}>自营商城</NavBar>

      <Tabs activeKey={activeKey} onChange={setActiveKey}>
        <Tabs.Tab title="概览" key="overview">
          <div className="page-content">
            <Card className="mb-3">
              <div className="text-sm font-semibold mb-3">商城数据</div>
              <Grid columns={2} gap={12}>
                <Grid.Item>
                  <div className="text-center p-3">
                    <div className="text-xl font-semibold text-primary mb-1">
                      156
                    </div>
                    <div className="text-xs text-gray-500">今日订单</div>
                  </div>
                </Grid.Item>
                <Grid.Item>
                  <div className="text-center p-3">
                    <div className="text-xl font-semibold text-primary mb-1">
                      ¥12,890
                    </div>
                    <div className="text-xs text-gray-500">今日销售额</div>
                  </div>
                </Grid.Item>
                <Grid.Item>
                  <div className="text-center p-3">
                    <div className="text-xl font-semibold text-yellow-500 mb-1">
                      23
                    </div>
                    <div className="text-xs text-gray-500">待发货</div>
                  </div>
                </Grid.Item>
                <Grid.Item>
                  <div className="text-center p-3">
                    <div className="text-xl font-semibold text-green-500 mb-1">
                      98
                    </div>
                    <div className="text-xs text-gray-500">已发货</div>
                  </div>
                </Grid.Item>
              </Grid>
            </Card>
          </div>
        </Tabs.Tab>

        <Tabs.Tab title="订单管理" key="orders">
          <div className="page-content">
            <Card>
              <div className="text-center py-5">
                <div className="text-sm text-gray-600">
                  暂无商城订单
                </div>
              </div>
            </Card>
          </div>
        </Tabs.Tab>

        <Tabs.Tab title="发货管理" key="delivery">
          <div className="page-content">
            <Card>
              <div className="text-center py-5">
                <div className="text-sm text-gray-600">
                  暂无待发货订单
                </div>
              </div>
            </Card>
          </div>
        </Tabs.Tab>

        <Tabs.Tab title="商城装饰" key="decoration">
          <div className="page-content">
            <List>
              <List.Item clickable>首页轮播图设置</List.Item>
              <List.Item clickable>商品分类管理</List.Item>
              <List.Item clickable>推荐商品设置</List.Item>
              <List.Item clickable>页面主题配置</List.Item>
            </List>
          </div>
        </Tabs.Tab>
      </Tabs>
    </div>
  )
}

export default SelfMall
