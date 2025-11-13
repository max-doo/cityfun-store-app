// 账号设置页：个人信息、安全设置、通知设置
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { List, Switch, NavBar } from 'antd-mobile'
import { 
  BsShieldLock, 
  BsPhoneFill,
  BsEnvelopeFill,
  BsKeyFill,
  BsChevronRight
} from 'react-icons/bs'
import { userInfo } from '../mock/data'

const AccountSettings: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="page-container page-with-fixed-navbar">
      <NavBar 
        onBack={() => navigate(-1)}
        className="bg-white"
      >
        账号设置
      </NavBar>

      <div className="p-3">
        {/* 账号信息 */}
        <div className="bg-white rounded-lg mb-3 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-light mr-4 overflow-hidden">
                <img 
                  src={userInfo.avatar} 
                  alt="avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="text-lg font-semibold mb-1">{userInfo.name}</div>
                <div className="text-sm text-gray-500">{userInfo.level}</div>
              </div>
              <BsChevronRight className="text-gray-400" />
            </div>
          </div>

          <List>
            <List.Item
              prefix={<BsPhoneFill className="text-xl text-primary" />}
              extra={<span className="text-gray-500">{userInfo.phone}</span>}
              arrow={<BsChevronRight />}
              clickable
            >
              手机号码
            </List.Item>
            <List.Item
              prefix={<BsEnvelopeFill className="text-xl text-primary" />}
              extra={<span className="text-gray-500">未绑定</span>}
              arrow={<BsChevronRight />}
              clickable
            >
              邮箱地址
            </List.Item>
          </List>
        </div>

        {/* 安全设置 */}
        <div className="bg-white rounded-lg mb-3">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center">
            <BsShieldLock className="text-lg text-primary mr-2" />
            <span className="font-semibold">安全设置</span>
          </div>
          <List>
            <List.Item
              prefix={<BsKeyFill className="text-xl text-gray-400" />}
              extra={<span className="text-gray-400">已设置</span>}
              arrow={<BsChevronRight />}
              clickable
            >
              登录密码
            </List.Item>
            <List.Item
              prefix={<BsShieldLock className="text-xl text-gray-400" />}
              extra={<span className="text-gray-400">未绑定</span>}
              arrow={<BsChevronRight />}
              clickable
            >
              实名认证
            </List.Item>
            <List.Item
              description="开启后需要验证码才能登录"
              extra={
                <Switch 
                  defaultChecked 
                  style={{
                    '--checked-color': '#FF6B35',
                  }}
                />
              }
            >
              登录验证
            </List.Item>
          </List>
        </div>

        {/* 退出登录 */}
        <div className="px-4 mt-8 mb-6">
          <button 
            className="w-full bg-red-500 text-white font-semibold py-3 rounded-lg active:bg-red-600"
            onClick={() => navigate('/login')}
          >
            退出登录
          </button>
        </div>
      </div>
    </div>
  )
}

export default AccountSettings
