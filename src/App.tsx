// 主应用组件：配置路由和整体布局，使用 HashRouter 以兼容 GitHub Pages 部署
import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Analysis from './pages/Analysis'
import Mall from './pages/Mall'
import ProductDetail from './pages/ProductDetail'
import Profile from './pages/Profile'
import OrderManagement from './pages/OrderManagement'
import TicketPackage from './pages/TicketPackage'
import Marketing from './pages/Marketing'
import TerminalDevice from './pages/TerminalDevice'
import MemberManagement from './pages/MemberManagement'
import ProductManagement from './pages/ProductManagement'
import DistributionManagement from './pages/DistributionManagement'
import CouponManagement from './pages/CouponManagement'
import ActivationZone from './pages/ActivationZone'
import SelfMall from './pages/SelfMall'
import Financing from './pages/Financing'
import Academy from './pages/Academy'
import More from './pages/More'
import AccountSettings from './pages/AccountSettings'
import Login from './pages/Login'
import Application from './pages/Application'
import StoreApplication from './pages/StoreApplication'
import MyOrders from './pages/MyOrders'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* 登录页 - 独立路由，不显示底部TabBar */}
        <Route path="/login" element={<Login />} />
        {/* 开店申请页 - 独立路由，不显示底部TabBar */}
        <Route path="/application" element={<Application />} />
        {/* 扩店申请页 - 独立路由，不显示底部TabBar */}
        <Route path="/store-application" element={<StoreApplication />} />
        
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="analysis" element={<Analysis />} />
          <Route path="mall" element={<Mall />} />
          <Route path="profile" element={<Profile />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="tickets" element={<TicketPackage />} />
          <Route path="marketing" element={<Marketing />} />
          <Route path="terminal" element={<TerminalDevice />} />
          <Route path="members" element={<MemberManagement />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="distribution" element={<DistributionManagement />} />
          <Route path="coupons" element={<CouponManagement />} />
          <Route path="activation" element={<ActivationZone />} />
          <Route path="self-mall" element={<SelfMall />} />
          <Route path="financing" element={<Financing />} />
          <Route path="academy" element={<Academy />} />
          <Route path="more" element={<More />} />
          <Route path="account-settings" element={<AccountSettings />} />
        </Route>
        {/* 商品详情页 - 独立路由，不显示底部TabBar */}
        <Route path="product/:id" element={<ProductDetail />} />
        {/* 我的订单页 - 独立路由，不显示底部TabBar */}
        <Route path="my-orders" element={<MyOrders />} />
      </Routes>
    </Router>
  )
}

export default App

