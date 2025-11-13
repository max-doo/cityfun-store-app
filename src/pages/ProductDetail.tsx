// 商品详情页：展示商品的详细信息
import React, { useState, useMemo } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { Stepper, Button, Toast } from 'antd-mobile'
import { BsChevronLeft, BsShop, BsBox, BsShield, BsTruck } from 'react-icons/bs'
import { purchaseProducts, rentalProducts } from '../mock/data'

const ProductDetail: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const type = searchParams.get('type') || 'purchase' // purchase or rental
  
  const [quantity, setQuantity] = useState(1)

  // 根据 ID 和类型查找商品
  const product = useMemo(() => {
    const products = type === 'purchase' ? purchaseProducts : rentalProducts
    return products.find(p => p.id === Number(id))
  }, [id, type])

  // 如果商品不存在，显示错误
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">😕</div>
          <div className="text-gray-600 mb-4">商品不存在</div>
          <Button color="primary" onClick={() => navigate('/mall')}>
            返回商城
          </Button>
        </div>
      </div>
    )
  }

  // 计算总价
  const totalPrice = product.price * quantity

  // 加入购物车
  const handleAddToCart = () => {
    Toast.show({
      icon: 'success',
      content: `已加入购物车 ${quantity} ${product.unit}`,
    })
  }

  // 立即购买/租赁
  const handleBuyNow = () => {
    Toast.show({
      icon: 'success',
      content: type === 'purchase' ? '立即购买功能开发中' : '立即租赁功能开发中',
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* 顶部导航栏 */}
      <div className="fixed top-0 left-0 right-0 z-50 max-w-[480px] mx-auto bg-white h-[48px] flex items-center px-4 border-b border-gray-200">
        <BsChevronLeft 
          className="text-2xl text-gray-700 cursor-pointer" 
          onClick={() => navigate(-1)}
        />
        <span className="text-lg font-medium text-gray-900 ml-3">商品详情</span>
      </div>

      {/* 内容区域 */}
      <div className="pt-[48px]">
        {/* 商品主图 */}
        <div className="bg-white">
          <div className="h-80 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
            <div className="text-9xl">{product.image}</div>
          </div>
        </div>

        {/* 商品信息 */}
        <div className="bg-white mt-2 p-4">
          <div className="text-xl font-bold text-gray-900 mb-2">
            {product.name}
          </div>
          <div className="text-sm text-gray-500 mb-4 leading-relaxed">
            {product.desc}
          </div>
          
          {/* 价格 */}
          <div className="flex items-baseline mb-4">
            <span className="text-primary text-3xl font-bold">
              ¥{product.price.toLocaleString()}
            </span>
            <span className="text-gray-400 text-sm ml-2">/ {product.unit}</span>
          </div>

          {/* 标签信息 */}
          <div className="flex flex-wrap gap-2">
            <div className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
              {product.category}
            </div>
            {type === 'purchase' ? (
              <>
                <div className="px-3 py-1 bg-green-50 text-green-600 text-xs rounded-full">
                  库存充足
                </div>
                <div className="px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                  已售 {'sales' in product ? product.sales : 0}
                </div>
              </>
            ) : (
              <>
                <div className="px-3 py-1 bg-green-50 text-green-600 text-xs rounded-full">
                  可租 {product.stock}
                </div>
                <div className="px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                  租赁次数 {'orders' in product ? product.orders : 0}
                </div>
              </>
            )}
          </div>
        </div>

        {/* 服务保障 */}
        <div className="bg-white mt-2 p-4">
          <div className="text-base font-medium text-gray-900 mb-3">服务保障</div>
          <div className="space-y-3">
            <div className="flex items-center text-sm text-gray-600">
              <BsShield className="text-lg text-primary mr-2 flex-shrink-0" />
              <span>正品保证，假一赔十</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <BsTruck className="text-lg text-primary mr-2 flex-shrink-0" />
              <span>支持配送上门服务</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <BsShop className="text-lg text-primary mr-2 flex-shrink-0" />
              <span>专业售后团队，7x24小时服务</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <BsBox className="text-lg text-primary mr-2 flex-shrink-0" />
              <span>{type === 'purchase' ? '支持退换货服务' : '灵活租赁周期，按需选择'}</span>
            </div>
          </div>
        </div>

        {/* 商品详情 */}
        <div className="bg-white mt-2 p-4">
          <div className="text-base font-medium text-gray-900 mb-3">商品详情</div>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex">
              <span className="w-20 text-gray-400">商品名称</span>
              <span>{product.name}</span>
            </div>
            <div className="flex">
              <span className="w-20 text-gray-400">商品分类</span>
              <span>{product.category}</span>
            </div>
            <div className="flex">
              <span className="w-20 text-gray-400">计价单位</span>
              <span>{product.unit}</span>
            </div>
            {type === 'purchase' ? (
              <>
                <div className="flex">
                  <span className="w-20 text-gray-400">当前库存</span>
                  <span>{product.stock}</span>
                </div>
                <div className="flex">
                  <span className="w-20 text-gray-400">累计销量</span>
                  <span>{'sales' in product ? product.sales : 0}</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex">
                  <span className="w-20 text-gray-400">可租数量</span>
                  <span>{product.stock}</span>
                </div>
                <div className="flex">
                  <span className="w-20 text-gray-400">租赁次数</span>
                  <span>{'orders' in product ? product.orders : 0}</span>
                </div>
              </>
            )}
            <div className="flex">
              <span className="w-20 text-gray-400">商品描述</span>
              <span className="flex-1">{product.desc}</span>
            </div>
          </div>
        </div>

        {/* 推荐商品 */}
        <div className="bg-white mt-2 p-4">
          <div className="text-base font-medium text-gray-900 mb-3">
            {type === 'purchase' ? '相关推荐' : '热门租赁'}
          </div>
          <div className="text-sm text-gray-400 text-center py-8">
            更多推荐商品敬请期待
          </div>
        </div>
      </div>

      {/* 底部操作栏 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 max-w-[480px] mx-auto bg-white border-t border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-3">数量</span>
            <Stepper
              value={quantity}
              onChange={setQuantity}
              min={1}
              max={product.stock}
              style={{
                '--border': '1px solid #e5e7eb',
                '--border-inner': 'none',
                '--height': '32px',
                '--input-width': '48px',
                '--input-background-color': '#f9fafb',
              }}
            />
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400">合计</div>
            <div className="text-primary text-xl font-bold">
              ¥{totalPrice.toLocaleString()}
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button
            color="default"
            fill="outline"
            className="flex-1"
            onClick={handleAddToCart}
          >
            加入购物车
          </Button>
          <Button
            color="primary"
            className="flex-1"
            onClick={handleBuyNow}
          >
            {type === 'purchase' ? '立即购买' : '立即租赁'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail



