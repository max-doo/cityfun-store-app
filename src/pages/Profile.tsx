// 我的页：账号信息、功能卡片、设置
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Grid, List, Swiper } from 'antd-mobile'
import { 
  BsGear, 
  BsFillWalletFill,
  BsHeadset,
  BsQuestionCircle,
  BsExclamationCircle,
  BsChevronRight,
  BsBook,
  BsHouseAdd,
  BsAwardFill,
  BsFillHousesFill,
  BsBag
} from 'react-icons/bs'
import { userInfo, financingOptions } from '../mock/data'

const Profile: React.FC = () => {
  const navigate = useNavigate()
  
  // 统一的信息卡片样式配置
  const infoCardStyles = {
    container: "text-center text-[#FFBA54] cursor-pointer",
    icon: "mx-auto mb-2 bg-[#1A0A00] rounded-3xl p-3",
    iconSize: "text-6xl", // 统一图标大小
    value: "text-xl font-semibold mb-1",
    label: "text-sm flex items-center justify-center gap-1"
  }

  return (
    <div className="page-container">
      {/* 顶部账号信息 */}
      <div className="bg-gradient-to-br from-primary to-primary-light p-5 text-white cursor-pointer">
        <div className="flex justify-between items-center mb-4">
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => navigate('/account-settings')}
          >
            <div className="w-16 h-16 rounded-full bg-white mr-3 overflow-hidden">
              <img 
                src={userInfo.avatar} 
                alt="avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-xl font-semibold mb-1">
                {userInfo.name}
              </div>
              <div className="text-sm opacity-90">
                {userInfo.phone}
              </div>
            </div>
          </div>
          <div 
            className="flex items-center gap-1 text-lg font-medium"
            onClick={() => navigate('/account-settings')}
          >
            账号设置<BsChevronRight />
          </div>
        </div>

        {/* 等级和门店信息 */}
        <div className="bg-primary-dark bg-opacity-80 rounded-3xl p-4">
          <Grid columns={3} gap={8}>
            <Grid.Item>
              <div className={infoCardStyles.container}>
                <BsAwardFill className={`${infoCardStyles.iconSize} ${infoCardStyles.icon}`} />
                <div className={infoCardStyles.value}>{userInfo.level}</div>
                <div className={infoCardStyles.label}>成长等级<BsChevronRight /></div>
              </div>
            </Grid.Item>
            <Grid.Item>
              <div className={infoCardStyles.container}>
                <BsFillHousesFill className={`${infoCardStyles.iconSize} ${infoCardStyles.icon}`} />
                <div className={infoCardStyles.value}>{userInfo.storeCount} 家</div>
                <div className={infoCardStyles.label}>门店数量<BsChevronRight /></div>
              </div>
            </Grid.Item>
            <Grid.Item>
              <div className={infoCardStyles.container}>
                <BsFillWalletFill className={`${infoCardStyles.iconSize} ${infoCardStyles.icon}`} />
                <div className={infoCardStyles.value}>¥{userInfo.balance.toLocaleString()}</div>
                <div className={infoCardStyles.label}>我的钱包<BsChevronRight /></div>
              </div>
            </Grid.Item>
          </Grid>
        </div>
      </div>

      <div className="page-content">

        {/* 融资推荐轮播 */}
        <div>
          <Swiper autoplay loop className="rounded-lg overflow-hidden">
            {financingOptions.map(item => (
              <Swiper.Item key={item.id}>
                <div 
                  className="h-[150px] bg-cover bg-center flex flex-col justify-center p-5 text-white"
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <div className="text-2xl font-semibold mb-2">
                    {item.title}
                  </div>
                  <div className="text-sm">{item.desc}</div>
                  <div className="text-sm bg-red-500 rounded-full px-6 py-2 mt-2 inline-block self-start">立即申请</div>
                </div>
              </Swiper.Item>
            ))}
          </Swiper>
        </div>

        {/* 功能列表 */}
        <Card className="mt-3">
          <List>
          <List.Item
              prefix={<BsBag className="text-xl text-primary" />}
              extra={<BsChevronRight />}
              arrow={false}
              clickable
              onClick={() => navigate('/my-orders')}
            >
              我的订单
            </List.Item>
            <List.Item
              prefix={<BsBook className="text-xl text-primary" />}
              extra={<BsChevronRight />}
              arrow={false}
              clickable
              onClick={() => navigate('/academy')}
            >
              乐园学院
            </List.Item>

            <List.Item
              prefix={<BsHouseAdd className="text-xl text-primary" />}
              extra={<BsChevronRight />}
              arrow={false}
              clickable
              onClick={() => navigate('/store-application')}
            >
              扩店申请
            </List.Item>
            <List.Item
              prefix={<BsGear className="text-xl text-primary" />}
              extra={<BsChevronRight />}
              arrow={false}
              clickable
            >
              系统设置
            </List.Item>
            <List.Item
              prefix={<BsQuestionCircle className="text-xl text-primary" />}
              extra={<BsChevronRight />}
              arrow={false}
              clickable
            >
              常见问题
            </List.Item>
            <List.Item
              prefix={<BsHeadset className="text-xl text-primary" />}
              extra={<BsChevronRight />}
              arrow={false}
              clickable
            >
              客服咨询
            </List.Item>
            <List.Item
              prefix={<BsExclamationCircle className="text-xl text-primary" />}
              extra={<BsChevronRight />}
              arrow={false}
              clickable
            >
              关于我们
            </List.Item>
          </List>
        </Card>

        {/* 版本信息 */}
        <div className="text-center py-5 text-gray-400 text-xs">
          城市乐园门店后台 v1.0.0
        </div>
      </div>
    </div>
  )
}

export default Profile
