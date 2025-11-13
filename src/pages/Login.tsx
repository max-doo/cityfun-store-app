// 登录页：手机号登录
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Toast, Tabs } from 'antd-mobile'
import { BsShop } from 'react-icons/bs'
import { userInfo } from '../mock/data'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('login')

  const onFinish = async (_values: any) => {
    setLoading(true)
    // 模拟登录请求
    setTimeout(() => {
      setLoading(false)
      Toast.show({
        content: '登录成功',
      })
      navigate('/')
    }, 1000)
  }

  const onOpenStore = async (_values: any) => {
    // 立即跳转到开店申请表页面
    navigate('/application')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary-light flex items-center justify-center p-5">
      <div className="w-full max-w-md">
        {/* Logo区域 */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-white rounded-full p-6 mb-4 shadow-lg">
            <BsShop className="text-6xl text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">城市乐园门店管家</h1>
          <p className="text-white opacity-90 text-lg">城市乐园门店后台管理系统</p>
        </div>

        {/* 登录表单卡片 */}
        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <Tabs 
            activeKey={activeTab} 
            onChange={setActiveTab}
            style={{
              '--title-font-size': '18px',
              '--active-title-color': '#FF6B35',
              '--active-line-color': '#FF6B35',
            }}
          >
            <Tabs.Tab title="登录" key="login">
              <div className="pt-4">
                <Form
                  onFinish={onFinish}
                  footer={
                    <Button 
                      block 
                      type="submit" 
                      color="primary" 
                      size="large"
                      loading={loading}
                      className="mt-4"
                      style={{
                        '--background-color': '#FF6B35',
                        '--border-radius': '8px',
                      }}
                    >
                      登录
                    </Button>
                  }
                >
                  <Form.Item
                    name="phone"
                    label="手机号"
                    initialValue={userInfo.phone}
                    rules={[
                      { required: true, message: '请输入手机号' },
                      { pattern: /^1\d{10}$/, message: '请输入正确的手机号' }
                    ]}
                  >
                    <Input 
                      placeholder="请输入手机号" 
                      clearable
                      maxLength={11}
                    />
                  </Form.Item>

                  <Form.Item
                    name="code"
                    label="验证码"
                    initialValue="123456"
                    rules={[{ required: true, message: '请输入验证码' }]}
                    extra={
                      <Button 
                        size="small"
                        fill="none"
                        style={{ color: '#FF6B35' }}
                      >
                        获取验证码
                      </Button>
                    }
                  >
                    <Input 
                      placeholder="请输入验证码" 
                      clearable
                      maxLength={6}
                    />
                  </Form.Item>
                </Form>
              </div>
            </Tabs.Tab>

            <Tabs.Tab title="我要开店" key="openstore">
              <div className="pt-4">
                <Form
                  initialValues={{
                    phone: userInfo.phone,
                    code: '123456'
                  }}
                  onFinish={onOpenStore}
                  footer={
                    <Button 
                      block 
                      type="submit" 
                      color="primary" 
                      size="large"
                      loading={loading}
                      className="mt-4"
                      style={{
                        '--background-color': '#FF6B35',
                        '--border-radius': '8px',
                      }}
                    >
                      填写开店申请表
                    </Button>
                  }
                >
                  <Form.Item
                    name="phone"
                    label="手机号"
                    initialValue={userInfo.phone}
                    rules={[
                      { required: true, message: '请输入手机号' },
                      { pattern: /^1\d{10}$/, message: '请输入正确的手机号' }
                    ]}
                  >
                    <Input 
                      placeholder="请输入手机号" 
                      clearable
                      maxLength={11}
                    />
                  </Form.Item>

                  <Form.Item
                    name="code"
                    label="验证码"
                    initialValue="123456"
                    rules={[{ required: true, message: '请输入验证码' }]}
                    extra={
                      <Button 
                        size="small"
                        fill="none"
                        style={{ color: '#FF6B35' }}
                      >
                        获取验证码
                      </Button>
                    }
                  >
                    <Input 
                      placeholder="请输入验证码" 
                      clearable
                      maxLength={6}
                    />
                  </Form.Item>
                </Form>
              </div>
            </Tabs.Tab>
          </Tabs>

          <div className="text-center text-gray-400 text-xs mt-6">
            登录即表示同意<span className="text-primary">《用户协议》</span>和<span className="text-primary">《隐私政策》</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
