// 商城页：采购和租赁（标签切换）
import React, { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Tabs, Badge, Popup, Stepper, Button, Toast, Empty } from 'antd-mobile'
import { BsCart4, BsClipboardCheck, BsTrash } from 'react-icons/bs'
import { purchaseProducts, rentalProducts } from '../mock/data'
import DateRangePicker from '../components/DateRangePicker'

// 购物车商品类型
interface CartItem {
  id: number
  name: string
  image: string
  price: number
  unit: string
  quantity: number
  type: 'purchase' | 'rental' // 采购或租赁
  rentalStartDate?: Date // 租赁开始日期（仅租赁商品）
  rentalEndDate?: Date // 租赁结束日期（仅租赁商品）
}

const Mall: React.FC = () => {
  const navigate = useNavigate()
  const [activeKey, setActiveKey] = useState('purchase')
  const [selectedCategory, setSelectedCategory] = useState('全部商品')
  const [purchaseCartVisible, setPurchaseCartVisible] = useState(false)
  const [rentalCartVisible, setRentalCartVisible] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // 采购商品分类
  const purchaseCategories = [
    '全部商品',
    '零售商品',
    '运营物料',
    '广告物料',
    '游乐耗材'
  ]

  // 租赁商品分类
  const rentalCategories = [
    '全部商品',
    '游乐设备',
    '人偶服'
  ]

  // 根据当前标签获取对应的分类列表
  const categories = useMemo(() => {
    return activeKey === 'purchase' ? purchaseCategories : rentalCategories
  }, [activeKey])

  // 切换标签时重置分类选择
  useEffect(() => {
    setSelectedCategory('全部商品')
  }, [activeKey])

  // 根据当前标签和选中的分类筛选商品
  const filteredProducts = useMemo(() => {
    const products = activeKey === 'purchase' ? purchaseProducts : rentalProducts
    // 如果选择"全部商品"，返回所有商品
    if (selectedCategory === '全部商品') {
      return products
    }
    return products.filter(product => product.category === selectedCategory)
  }, [activeKey, selectedCategory])

  // 添加商品到购物车
  const handleAddToCart = (productId: number, type: 'purchase' | 'rental') => {
    const products = type === 'purchase' ? purchaseProducts : rentalProducts
    const product = products.find(p => p.id === productId)
    
    if (!product) return

    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === productId && item.type === type)
      
      if (existingItem) {
        // 如果已存在，增加数量
        return prev.map(item =>
          item.id === productId && item.type === type
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        // 如果不存在，添加新商品
        const newItem: CartItem = {
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          unit: product.unit,
          quantity: 1,
          type: type
        }
        
        // 如果是租赁商品，初始化日期范围（默认为今天和7天后）
        if (type === 'rental') {
          const startDate = new Date()
          const endDate = new Date()
          endDate.setDate(endDate.getDate() + 7)
          newItem.rentalStartDate = startDate
          newItem.rentalEndDate = endDate
        }
        
        return [...prev, newItem]
      }
    })

    Toast.show({
      content: '√已加入购物车',
    })
  }

  // 更新购物车商品数量
  const handleUpdateQuantity = (productId: number, type: 'purchase' | 'rental', quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId, type)
      return
    }

    setCartItems(prev =>
      prev.map(item =>
        item.id === productId && item.type === type
          ? { ...item, quantity }
          : item
      )
    )
  }

  // 从购物车删除商品
  const handleRemoveFromCart = (productId: number, type: 'purchase' | 'rental') => {
    setCartItems(prev => prev.filter(item => !(item.id === productId && item.type === type)))
    Toast.show({
      icon: 'success',
      content: '已移除',
    })
  }

  // 更新租赁商品的日期范围
  const handleUpdateRentalDateRange = (productId: number, startDate: Date, endDate: Date) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId && item.type === 'rental'
          ? { ...item, rentalStartDate: startDate, rentalEndDate: endDate }
          : item
      )
    )
  }

  // 计算采购购物车商品总数
  const purchaseCartCount = useMemo(() => {
    return cartItems
      .filter(item => item.type === 'purchase')
      .reduce((sum, item) => sum + item.quantity, 0)
  }, [cartItems])

  // 计算租赁购物车商品总数
  const rentalCartCount = useMemo(() => {
    return cartItems
      .filter(item => item.type === 'rental')
      .reduce((sum, item) => sum + item.quantity, 0)
  }, [cartItems])

  // 计算采购购物车总价
  const purchaseCartTotalPrice = useMemo(() => {
    return cartItems
      .filter(item => item.type === 'purchase')
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
  }, [cartItems])

  // 计算租赁购物车总价
  const rentalCartTotalPrice = useMemo(() => {
    return cartItems
      .filter(item => item.type === 'rental')
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
  }, [cartItems])

  // 按类型分组购物车商品
  const cartItemsByType = useMemo(() => {
    const purchase = cartItems.filter(item => item.type === 'purchase')
    const rental = cartItems.filter(item => item.type === 'rental')
    return { purchase, rental }
  }, [cartItems])

  // 处理分类名称，为四个字的标题添加换行符
  const formatCategoryName = (category: string) => {
    if (category.length === 4) {
      // 四个字的标题，在第二个字后面添加换行符
      return category.slice(0, 2) + '\n' + category.slice(2)
    }
    return category
  }

  return (
    <div className="page-container">
      {/* Header 容器 */}
      <div className="fixed top-0 left-0 right-0 z-50 max-w-[480px] mx-auto bg-[#1A0A00] h-[48px] flex items-center px-4">
        <span className="text-xl font-semibold text-gray-400 flex-1 text-center">商城</span>
      </div>
      
      {/* 固定在顶部的 Tabs 标签栏 */}
      <div className="fixed left-0 right-0 z-40 max-w-[480px] mx-auto bg-white page-tabs"
      >
        <Tabs activeKey={activeKey} onChange={setActiveKey}>
          <Tabs.Tab title="采购" key="purchase" />
          <Tabs.Tab title="租赁" key="rental" />
        </Tabs>
      </div>
      
      {/* 内容区域 - 添加顶部间距避免被固定元素遮挡 */}
      <div style={{ paddingTop: 'var(--top-fixed-height)' }}>
        {/* 采购标签内容 */}
        {activeKey === 'purchase' && (
          <>
            {/* 固定左侧分类导航 - 居中并定位到左侧 */}
            <div 
              className="fixed w-20 bg-gray-50 overflow-y-auto border-r border-gray-200 z-30"
              style={{
                top: '92px', // Header 48px + Tabs 48px
                left: 'max(0px, calc(50% - 240px))',
                height: 'calc(100vh - 94px - 50px - var(--tabbar-height))' // 减去顶部固定区域、底部购物车栏和底部TabBar
              }}
            >
              {categories.map((category) => (
                <div
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`p-3 text-center text-sm cursor-pointer transition-colors whitespace-pre-line leading-tight ${
                    selectedCategory === category
                      ? 'text-primary font-bold bg-white border-l-[3px] border-primary' 
                      : 'text-gray-600 font-medium hover:bg-gray-200'
                  }`}
                >
                  {formatCategoryName(category)}
                </div>
              ))}
            </div>

            {/* 右侧商品展示区域 - 添加左边距避免被固定导航遮挡 */}
            <div 
              className="ml-20 overflow-y-auto p-3"
              style={{ height: 'calc(100vh - 94px - 50px - var(--tabbar-height))' }}
            >
              {/* 商品网格 */}
              <div className="grid grid-cols-2 gap-3 pb-2">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => navigate(`/product/${product.id}?type=purchase`)}
                    className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    {/* 商品图片/图标 */}
                    <div className="h-32 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-6xl">
                      {product.image}
                    </div>
                    
                    {/* 商品信息 */}
                    <div className="p-2.5">
                      <div className="text-sm font-medium text-gray-900 mb-1 line-clamp-1">
                        {product.name}
                      </div>
                      <div className="text-xs text-gray-500 mb-2 line-clamp-2 h-8">
                        {product.desc}
                      </div>
                      
                      {/* 价格和库存 */}
                      <div className="flex items-end justify-between">
                        <div>
                          <div className="text-primary font-bold">
                            <span className="text-xs">¥</span>
                            <span className="text-base">{product.price.toLocaleString()}</span>
                            <span className="text-xs text-gray-400 ml-1">/{product.unit}</span>
                          </div>
                          <div className="text-xs text-gray-400 mt-0.5">
                            库存 {product.stock}
                          </div>
                        </div>
                        
                        {/* 加入购物车按钮 */}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation()
                            handleAddToCart(product.id, 'purchase')
                          }}
                          className="bg-primary text-white text-xs px-3 py-1.5 rounded hover:bg-primary/90 transition-colors"
                        >
                          加入
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 底部购物车和订单 */}
            <div
              className="fixed left-1/2 -translate-x-1/2 w-full max-w-[480px] h-[50px] bg-white border-t border-gray-200 flex justify-around items-center z-[100]"
              style={{ bottom: 'var(--tabbar-height)' }}
            >
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => setPurchaseCartVisible(true)}
              >
                <Badge content={purchaseCartCount || null}>
                  <BsCart4 className="text-3xl text-primary" />
                </Badge>
                <span className="ml-2 text-sm text-gray-900">采购购物车</span>
              </div>
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => navigate('/my-orders?tab=purchase')}
              >
                <BsClipboardCheck className="text-3xl text-primary" />
                <span className="ml-2 text-sm text-gray-900">采购订单</span>
              </div>
            </div>
          </>
        )}
        
        {/* 租赁标签内容 */}
        {activeKey === 'rental' && (
          <>
            {/* 固定左侧分类导航 - 居中并定位到左侧 */}
            <div 
              className="fixed w-20 bg-gray-50 overflow-y-auto border-r border-gray-200 z-30"
              style={{
                top: '92px', // Header 48px + Tabs 48px
                left: 'max(0px, calc(50% - 240px))',
                height: 'calc(100vh - 94px - 50px - var(--tabbar-height))' // 减去顶部固定区域、底部购物车栏和底部TabBar
              }}
            >
              {categories.map((category) => (
                <div
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`p-3 text-center text-sm cursor-pointer transition-colors whitespace-pre-line leading-tight ${
                    selectedCategory === category
                      ? 'text-primary font-bold bg-white border-l-[3px] border-primary' 
                      : 'text-gray-600 font-medium hover:bg-gray-200'
                  }`}
                >
                  {formatCategoryName(category)}
                </div>
              ))}
            </div>

            {/* 右侧商品展示区域 - 添加左边距避免被固定导航遮挡 */}
            <div 
              className="ml-20 overflow-y-auto p-3"
              style={{ height: 'calc(100vh - 94px - 50px - var(--tabbar-height))' }}
            >
              {/* 商品网格 */}
              <div className="grid grid-cols-2 gap-3 pb-2">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => navigate(`/product/${product.id}?type=rental`)}
                    className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    {/* 商品图片/图标 */}
                    <div className="h-32 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-6xl">
                      {product.image}
                    </div>
                    
                    {/* 商品信息 */}
                    <div className="p-2.5">
                      <div className="text-sm font-medium text-gray-900 mb-1 line-clamp-1">
                        {product.name}
                      </div>
                      <div className="text-xs text-gray-500 mb-2 line-clamp-2 h-8">
                        {product.desc}
                      </div>
                      
                      {/* 价格和库存 */}
                      <div className="flex items-end justify-between">
                        <div>
                          <div className="text-primary font-bold">
                            <span className="text-xs">¥</span>
                            <span className="text-base">{product.price.toLocaleString()}</span>
                            <span className="text-xs text-gray-400 ml-1">/{product.unit}</span>
                          </div>
                          <div className="text-xs text-gray-400 mt-0.5">
                            可租 {product.stock}
                          </div>
                        </div>
                        
                        {/* 租赁按钮 */}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation()
                            handleAddToCart(product.id, 'rental')
                          }}
                          className="bg-primary text-white text-xs px-3 py-1.5 rounded hover:bg-primary/90 transition-colors"
                        >
                          租赁
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 底部购物车和订单 */}
            <div
              className="fixed left-1/2 -translate-x-1/2 w-full max-w-[480px] h-[50px] bg-white border-t border-gray-200 flex justify-around items-center z-[100]"
              style={{ bottom: 'var(--tabbar-height)' }}
            >
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => setRentalCartVisible(true)}
              >
                <Badge content={rentalCartCount || null}>
                  <BsCart4 className="text-3xl text-primary" />
                </Badge>
                <span className="ml-2 text-sm text-gray-900">租赁购物车</span>
              </div>
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => navigate('/my-orders?tab=rental')}
              >
                <BsClipboardCheck className="text-3xl text-primary" />
                <span className="ml-2 text-sm text-gray-900">租赁订单</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* 采购购物车抽屉 */}
      <Popup
        visible={purchaseCartVisible}
        onMaskClick={() => setPurchaseCartVisible(false)}
        position="bottom"
        bodyStyle={{
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
          maxHeight: '80vh',
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div className="flex flex-col h-full">
          {/* 标题栏 */}
          <div className="flex items-center justify-between p-4 pb-3 border-b border-gray-200 flex-shrink-0">
            <h3 className="text-lg font-semibold text-gray-900">采购购物车</h3>
            <button
              onClick={() => setPurchaseCartVisible(false)}
              className="text-gray-400 text-xl"
            >
              ×
            </button>
          </div>

          {/* 购物车内容 - 可滚动区域 */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartItemsByType.purchase.length === 0 ? (
              <Empty
                className="py-20"
                imageStyle={{ width: 128 }}
                description="购物车是空的"
              />
            ) : (
              <div className="space-y-3">
                {cartItemsByType.purchase.map((item) => (
                  <div
                    key={`purchase-${item.id}`}
                    className="flex items-center bg-gray-50 rounded-lg p-3"
                  >
                    <div className="text-4xl mr-3">{item.image}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </div>
                      <div className="text-primary font-bold mt-1">
                        <span className="text-xs">¥</span>
                        <span>{item.price.toLocaleString()}</span>
                        <span className="text-xs text-gray-400 ml-1">/{item.unit}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 ml-2">
                      <Stepper
                        value={item.quantity}
                        onChange={(val) => handleUpdateQuantity(item.id, 'purchase', val)}
                        min={1}
                        style={{
                          '--border': '1px solid #e5e7eb',
                          '--border-inner': 'none',
                          '--height': '32px',
                          '--input-width': '48px',
                          '--input-background-color': '#f9fafb',
                        }}
                      />
                      <button
                        onClick={() => handleRemoveFromCart(item.id, 'purchase')}
                        className="text-red-500 p-2"
                      >
                        <BsTrash className="text-lg" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 底部结算栏 - 固定在底部 */}
          {cartItemsByType.purchase.length > 0 && (
            <div className="flex-shrink-0 bg-white border-t border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-600">合计</span>
                <span className="text-primary text-2xl font-bold">
                  ¥{purchaseCartTotalPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex gap-3">
                <Button
                  color="default"
                  fill="outline"
                  className="flex-1"
                  onClick={() => setPurchaseCartVisible(false)}
                >
                  继续购物
                </Button>
                <Button
                  color="primary"
                  className="flex-1"
                  onClick={() => {
                    Toast.show({
                      content: '结算功能开发中',
                    })
                  }}
                >
                  去结算
                </Button>
              </div>
            </div>
          )}
        </div>
      </Popup>

      {/* 租赁购物车抽屉 */}
      <Popup
        visible={rentalCartVisible}
        onMaskClick={() => setRentalCartVisible(false)}
        position="bottom"
        bodyStyle={{
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
          maxHeight: '80vh',
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div className="flex flex-col h-full">
          {/* 标题栏 */}
          <div className="flex items-center justify-between p-4 pb-3 border-b border-gray-200 flex-shrink-0">
            <h3 className="text-lg font-semibold text-gray-900">租赁购物车</h3>
            <button
              onClick={() => setRentalCartVisible(false)}
              className="text-gray-400 text-xl"
            >
              ×
            </button>
          </div>

          {/* 购物车内容 - 可滚动区域 */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartItemsByType.rental.length === 0 ? (
              <Empty
                className="py-20"
                imageStyle={{ width: 128 }}
                description="购物车是空的"
              />
            ) : (
              <div className="space-y-4">
                {cartItemsByType.rental.map((item) => (
                  <div
                    key={`rental-${item.id}`}
                    className="bg-gray-50 rounded-lg p-3"
                  >
                    {/* 商品信息和操作区域 */}
                    <div className="flex items-center mb-3">
                      <div className="text-4xl mr-3">{item.image}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {item.name}
                        </div>
                        <div className="text-primary font-bold mt-1">
                          <span className="text-xs">¥</span>
                          <span>{item.price.toLocaleString()}</span>
                          <span className="text-xs text-gray-400 ml-1">/{item.unit}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 ml-2">
                        <Stepper
                          value={item.quantity}
                          onChange={(val) => handleUpdateQuantity(item.id, 'rental', val)}
                          min={1}
                          style={{
                            '--border': '1px solid #e5e7eb',
                            '--border-inner': 'none',
                            '--height': '32px',
                            '--input-width': '48px',
                            '--input-background-color': '#f9fafb',
                          }}
                        />
                        <button
                          onClick={() => handleRemoveFromCart(item.id, 'rental')}
                          className="text-red-500 p-2"
                        >
                          <BsTrash className="text-lg" />
                        </button>
                      </div>
                    </div>
                    
                    {/* 租赁日期范围选择器 */}
                    {item.rentalStartDate && item.rentalEndDate && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <DateRangePicker
                          title="租赁日期"
                          startDate={item.rentalStartDate}
                          endDate={item.rentalEndDate}
                          onRangeChange={(startDate, endDate) => {
                            handleUpdateRentalDateRange(item.id, startDate, endDate)
                          }}
                          showToast={false}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 底部结算栏 - 固定在底部 */}
          {cartItemsByType.rental.length > 0 && (
            <div className="flex-shrink-0 bg-white border-t border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-600">合计</span>
                <span className="text-primary text-2xl font-bold">
                  ¥{rentalCartTotalPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex gap-3">
                <Button
                  color="default"
                  fill="outline"
                  className="flex-1"
                  onClick={() => setRentalCartVisible(false)}
                >
                  继续购物
                </Button>
                <Button
                  color="primary"
                  className="flex-1"
                  onClick={() => {
                    Toast.show({
                      content: '提交申请功能开发中',
                    })
                  }}
                >
                  提交申请
                </Button>
              </div>
            </div>
          )}
        </div>
      </Popup>
    </div>
  )
}

export default Mall
