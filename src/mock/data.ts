// 模拟数据：用于原型演示

// 门店列表数据
export const stores = [
  { id: 1, name: '上海徐汇万科广场店', code: 'SH001' },
  { id: 2, name: '北京朝阳大悦城店', code: 'BJ001' },
  { id: 3, name: '深圳南山海岸城店', code: 'SZ001' },
  { id: 4, name: '成都高新银泰中心店', code: 'CD001' },
]

// 消息通知数据
export const notifications = [
  { id: 1, title: '系统通知', content: '您的门店月度运营报告已生成，点击查看详情', time: '2小时前' },
  { id: 2, title: '活动提醒', content: '双十一促销活动即将开始，请提前做好准备', time: '5小时前' },
  { id: 3, title: '库存预警', content: '小黄鸭玩偶库存不足，建议及时补货', time: '1天前' },
]

// 营收数据
export const revenueData = {
  today: {
    revenue: 1680,
    orders: 89,
    members: 156,
    trend: '+12.5%'
  },
  week: {
    revenue: 98420,
    orders: 567,
    members: 892,
    trend: '+8.3%'
  },
  month: {
    revenue: 456780,
    orders: 2341,
    members: 3567,
    trend: '+15.7%'
  }
}

// 会员数据
export const memberData = {
  total: 1956,
  new: 234,
  active: 340,
}

// 游玩分析数据
export const playData = {
  totalPlays: 1234,
  ticketVerified: 1189,
  projects: [
    { name: '小黄鸭旋转木马', plays: 456, capacity: 500, rate: '91%' },
    { name: '海盗船', plays: 378, capacity: 400, rate: '94%' },
    { name: '欢乐蹦床', plays: 289, capacity: 300, rate: '96%' },
    { name: '淘气堡', plays: 111, capacity: 200, rate: '55%' },
  ]
}

// 销售订单数据（来源：员工分销、用户分销、小程序购买）
export const salesOrders = [
  { 
    id: 'O20231106001', 
    type: '门票订单', 
    amount: 198, 
    status: '已核销', 
    time: '2023-11-06 14:30',
    customer: '张三',
    source: { type: 'employee', name: '王经理' } // 员工分销
  },
  { 
    id: 'O20231106002', 
    type: '套餐订单', 
    amount: 398, 
    status: '已核销', 
    time: '2023-11-06 13:45',
    customer: '李四',
    source: { type: 'user', name: '刘用户' } // 用户分销
  },
  { 
    id: 'O20231106003', 
    type: '商品订单', 
    amount: 158, 
    status: '待发货', 
    time: '2023-11-06 12:20',
    customer: '王五',
    source: { type: 'miniprogram' } // 小程序购买
  },
  { 
    id: 'O20231105007', 
    type: '商品订单', 
    amount: 128, 
    status: '待发货', 
    time: '2023-11-05 18:20',
    customer: '吴九',
    source: { type: 'miniprogram' } // 小程序购买
  },
  { 
    id: 'O20231105008', 
    type: '门票订单', 
    amount: 198, 
    status: '已核销', 
    time: '2023-11-05 17:15',
    customer: '郑十',
    source: { type: 'employee', name: '张主管' } // 员工分销
  },
  { 
    id: 'O20231105009', 
    type: '套餐订单', 
    amount: 698, 
    status: '已核销', 
    time: '2023-11-05 16:45',
    customer: '钱一',
    source: { type: 'user', name: '陈分销' } // 用户分销
  },
  { 
    id: 'O20231105010', 
    type: '门票订单', 
    amount: 99, 
    status: '已取消', 
    time: '2023-11-05 15:30',
    customer: '陈二',
    source: { type: 'miniprogram' } // 小程序购买
  },
  { 
    id: 'O20231105011', 
    type: '商品订单', 
    amount: 268, 
    status: '待发货', 
    time: '2023-11-05 14:50',
    customer: '林三',
    source: { type: 'miniprogram' } // 小程序购买（默认）
  },
  { 
    id: 'O20231105012', 
    type: '门票订单', 
    amount: 198, 
    status: '待使用', 
    time: '2023-11-05 13:25',
    customer: '杨四',
    source: { type: 'miniprogram' } // 小程序购买（默认）
  },
  { 
    id: 'O20231104013', 
    type: '套餐订单', 
    amount: 888, 
    status: '已核销', 
    time: '2023-11-04 16:40',
    customer: '黄五',
    source: { type: 'employee', name: '李经理' } // 员工分销
  },
  { 
    id: 'O20231104014', 
    type: '门票订单', 
    amount: 398, 
    status: '已核销', 
    time: '2023-11-04 15:20',
    customer: '刘六',
    source: { type: 'user', name: '王分销' } // 用户分销
  },
  { 
    id: 'O20231104015', 
    type: '商品订单', 
    amount: 88, 
    status: '待发货', 
    time: '2023-11-04 14:10',
    customer: '何七',
    source: { type: 'miniprogram' } // 小程序购买
  },
  { 
    id: 'O20231104016', 
    type: '门票订单', 
    amount: 99, 
    status: '已核销', 
    time: '2023-11-04 12:30',
    customer: '许八',
    source: { type: 'miniprogram' } // 小程序购买
  },
  { 
    id: 'O20231104017', 
    type: '套餐订单', 
    amount: 498, 
    status: '已核销', 
    time: '2023-11-04 11:15',
    customer: '冯九',
    source: { type: 'employee', name: '赵主管' } // 员工分销
  },
  { 
    id: 'O20231103018', 
    type: '门票订单', 
    amount: 198, 
    status: '已取消', 
    time: '2023-11-03 17:50',
    customer: '胡十',
    source: { type: 'miniprogram' } // 小程序购买
  },
  { 
    id: 'O20231103019', 
    type: '商品订单', 
    amount: 328, 
    status: '待发货', 
    time: '2023-11-03 16:35',
    customer: '高一',
    source: { type: 'miniprogram' } // 小程序购买
  },
  { 
    id: 'O20231103020', 
    type: '门票订单', 
    amount: 298, 
    status: '已核销', 
    time: '2023-11-03 15:20',
    customer: '梁二',
    source: { type: 'user', name: '周分销' } // 用户分销
  },
]

// 核销订单数据（来源：抖音、美团、携程）
export const verificationOrders = [
  { 
    id: 'O20231106004', 
    type: '门票订单', 
    amount: 99, 
    status: '已核销', 
    time: '2023-11-06 11:15',
    customer: '赵六',
    source: { type: 'douyin' } // 核销订单-抖音
  },
  { 
    id: 'O20231106005', 
    type: '套餐订单', 
    amount: 588, 
    status: '已核销', 
    time: '2023-11-06 10:45',
    customer: '孙七',
    source: { type: 'meituan' } // 核销订单-美团
  },
  { 
    id: 'O20231106006', 
    type: '门票订单', 
    amount: 298, 
    status: '已核销', 
    time: '2023-11-06 09:30',
    customer: '周八',
    source: { type: 'ctrip' } // 核销订单-携程
  },
  { 
    id: 'V20231105001', 
    type: '门票订单', 
    amount: 198, 
    status: '已核销', 
    time: '2023-11-05 16:20',
    customer: '吴一',
    source: { type: 'douyin' } // 核销订单-抖音
  },
  { 
    id: 'V20231105002', 
    type: '套餐订单', 
    amount: 398, 
    status: '已核销', 
    time: '2023-11-05 15:10',
    customer: '郑二',
    source: { type: 'meituan' } // 核销订单-美团
  },
  { 
    id: 'V20231104001', 
    type: '门票订单', 
    amount: 128, 
    status: '已核销', 
    time: '2023-11-04 18:30',
    customer: '王三',
    source: { type: 'ctrip' } // 核销订单-携程
  },
  { 
    id: 'V20231104002', 
    type: '套餐订单', 
    amount: 588, 
    status: '已核销', 
    time: '2023-11-04 17:15',
    customer: '李四',
    source: { type: 'douyin' } // 核销订单-抖音
  },
  { 
    id: 'V20231103001', 
    type: '门票订单', 
    amount: 298, 
    status: '已核销', 
    time: '2023-11-03 19:20',
    customer: '张五',
    source: { type: 'meituan' } // 核销订单-美团
  },
  { 
    id: 'V20231103002', 
    type: '套餐订单', 
    amount: 698, 
    status: '已核销', 
    time: '2023-11-03 18:45',
    customer: '刘六',
    source: { type: 'ctrip' } // 核销订单-携程
  },
]

// 合并所有订单（保持向后兼容）
export const orders = [...salesOrders, ...verificationOrders]

// 门票数据
export const tickets = [
  { id: 1, name: '儿童单人票', price: 99, stock: 500, sales: 1234 },
  { id: 2, name: '成人单人票', price: 129, stock: 300, sales: 567 },
  { id: 3, name: '亲子双人票', price: 198, stock: 200, sales: 890 },
  { id: 4, name: '家庭三人票', price: 268, stock: 150, sales: 456 },
]

// 套餐数据
export const packages = [
  { id: 1, name: '欢乐亲子套餐', price: 398, includes: '2大1小门票+小黄鸭玩偶', sales: 234 },
  { id: 2, name: '生日派对套餐', price: 888, includes: '场地+装饰+蛋糕+10人门票', sales: 67 },
  { id: 3, name: '团建专享套餐', price: 1888, includes: '场地包场+团建活动+20人门票', sales: 23 },
]

// 会员列表数据
export const members = [
  { id: 1, name: '张女士', phone: '138****1234', level: '储值会员', balance: 1280, points: 3560 },
  { id: 2, name: '李先生', phone: '139****5678', level: '普通会员', balance: 580, points: 1200 },
  { id: 3, name: '王女士', phone: '186****9012', level: '储值会员', balance: 2360, points: 6780 },
  { id: 4, name: '赵先生', phone: '137****3456', level: '普通会员', balance: 120, points: 450 },
  { id: 5, name: '刘女士', phone: '135****7890', level: '储值会员', balance: 1890, points: 4200 },
  { id: 6, name: '陈先生', phone: '136****2345', level: '普通会员', balance: 230, points: 560 },
]

// 会员触达记录数据
export const memberReachRecords = [
  { 
    id: 1, 
    memberName: '张女士', 
    memberPhone: '138****1234',
    reachType: '短信推送', 
    content: '双十一活动优惠券已发放，快来领取吧！', 
    status: '已发送', 
    time: '2023-11-06 14:30',
    result: '已查看'
  },
  { 
    id: 2, 
    memberName: '李先生', 
    memberPhone: '139****5678',
    reachType: '微信推送', 
    content: '您的会员积分即将过期，请及时使用', 
    status: '已发送', 
    time: '2023-11-06 10:15',
    result: '已查看'
  },
  { 
    id: 3, 
    memberName: '王女士', 
    memberPhone: '186****9012',
    reachType: '短信推送', 
    content: '生日祝福：祝您生日快乐，专属优惠已到账', 
    status: '已发送', 
    time: '2023-11-05 09:00',
    result: '已查看'
  },
  { 
    id: 4, 
    memberName: '赵先生', 
    memberPhone: '137****3456',
    reachType: '微信推送', 
    content: '新活动上线：周末亲子套餐限时优惠', 
    status: '已发送', 
    time: '2023-11-04 16:20',
    result: '未查看'
  },
  { 
    id: 5, 
    memberName: '刘女士', 
    memberPhone: '135****7890',
    reachType: '短信推送', 
    content: '储值余额不足提醒，建议及时充值', 
    status: '已发送', 
    time: '2023-11-03 11:45',
    result: '已查看'
  },
  { 
    id: 6, 
    memberName: '陈先生', 
    memberPhone: '136****2345',
    reachType: '微信推送', 
    content: '会员等级升级通知：恭喜您升级为银牌会员', 
    status: '已发送', 
    time: '2023-11-02 14:30',
    result: '已查看'
  },
]

// 会员设置数据
export const memberSettings = [
  { 
    id: 1, 
    level: '储值会员', 
    upgradeCondition: '累计消费满10000元', 
    benefits: '9折优惠、生日特权、专属客服',
    pointsRate: 1.5,
    discount: 0.9
  },
  { 
    id: 2, 
    level: '黄金会员', 
    upgradeCondition: '累计消费满5000元', 
    benefits: '9.5折优惠、积分翻倍',
    pointsRate: 1.2,
    discount: 0.95
  },
  { 
    id: 3, 
    level: '银牌会员', 
    upgradeCondition: '累计消费满2000元', 
    benefits: '9.8折优惠、生日优惠',
    pointsRate: 1.1,
    discount: 0.98
  },
  { 
    id: 4, 
    level: '普通会员', 
    upgradeCondition: '注册即可', 
    benefits: '积分奖励',
    pointsRate: 1.0,
    discount: 1.0
  },
]

// 会员标签设置数据
export const memberTagSettings = [
  { tag: '亲子家庭', count: 2571, ratio: 60.0, avgPrice: 328 },
  { tag: '年轻情侣', count: 900, ratio: 21.0, avgPrice: 256 },
  { tag: '学生群体', count: 487, ratio: 11.4, avgPrice: 168 },
  { tag: '其它人群', count: 325, ratio: 7.6, avgPrice: 198 },
]

// 会员消费记录数据
export const memberConsumptionRecords = [
  { 
    id: 1, 
    memberName: '张女士', 
    memberPhone: '138****1234',
    orderId: 'O20231106001', 
    type: '门票订单', 
    amount: 198, 
    paymentMethod: '余额支付',
    time: '2023-11-06 14:30',
    points: 297
  },
  { 
    id: 2, 
    memberName: '李先生', 
    memberPhone: '139****5678',
    orderId: 'O20231106002', 
    type: '套餐订单', 
    amount: 398, 
    paymentMethod: '微信支付',
    time: '2023-11-06 13:45',
    points: 477
  },
  { 
    id: 3, 
    memberName: '王女士', 
    memberPhone: '186****9012',
    orderId: 'O20231106003', 
    type: '商品订单', 
    amount: 158, 
    paymentMethod: '余额支付',
    time: '2023-11-06 12:20',
    points: 237
  },
  { 
    id: 4, 
    memberName: '赵先生', 
    memberPhone: '137****3456',
    orderId: 'O20231105007', 
    type: '门票订单', 
    amount: 99, 
    paymentMethod: '支付宝',
    time: '2023-11-05 18:20',
    points: 99
  },
  { 
    id: 5, 
    memberName: '刘女士', 
    memberPhone: '135****7890',
    orderId: 'O20231105008', 
    type: '套餐订单', 
    amount: 698, 
    paymentMethod: '余额支付',
    time: '2023-11-05 17:15',
    points: 1047
  },
  { 
    id: 6, 
    memberName: '陈先生', 
    memberPhone: '136****2345',
    orderId: 'O20231104013', 
    type: '门票订单', 
    amount: 198, 
    paymentMethod: '微信支付',
    time: '2023-11-04 16:40',
    points: 217
  },
  { 
    id: 7, 
    memberName: '周女士', 
    memberPhone: '137****6789',
    orderId: 'O20231104014', 
    type: '商品订单', 
    amount: 88, 
    paymentMethod: '余额支付',
    time: '2023-11-04 15:20',
    points: 132
  },
  { 
    id: 8, 
    memberName: '吴先生', 
    memberPhone: '138****0123',
    orderId: 'O20231103018', 
    type: '门票订单', 
    amount: 298, 
    paymentMethod: '支付宝',
    time: '2023-11-03 15:20',
    points: 298
  },
]

// 商品数据
export const products = [
  { id: 1, name: 'B.Duck小黄鸭玩偶', category: '玩具', price: 88, stock: 156, sales: 890 },
  { id: 2, name: '小黄鸭水杯', category: '日用品', price: 35, stock: 234, sales: 567 },
  { id: 3, name: '乐园纪念T恤', category: '服装', price: 68, stock: 89, sales: 234 },
  { id: 4, name: '儿童防晒帽', category: '服装', price: 45, stock: 123, sales: 345 },
]

// 库存记录数据
export const stockRecords = [
  { 
    id: 1, 
    productName: 'B.Duck小黄鸭玩偶', 
    productId: 1,
    type: '入库', 
    quantity: 200, 
    beforeStock: 56, 
    afterStock: 256,
    operator: '张经理',
    time: '2023-11-06 14:30',
    remark: '采购补货'
  },
  { 
    id: 2, 
    productName: '小黄鸭水杯', 
    productId: 2,
    type: '出库', 
    quantity: 50, 
    beforeStock: 284, 
    afterStock: 234,
    operator: '李员工',
    time: '2023-11-06 13:45',
    remark: '销售出库'
  },
  { 
    id: 3, 
    productName: '乐园纪念T恤', 
    productId: 3,
    type: '入库', 
    quantity: 100, 
    beforeStock: 89, 
    afterStock: 189,
    operator: '王主管',
    time: '2023-11-05 16:20',
    remark: '新货入库'
  },
  { 
    id: 4, 
    productName: '儿童防晒帽', 
    productId: 4,
    type: '出库', 
    quantity: 20, 
    beforeStock: 143, 
    afterStock: 123,
    operator: '赵员工',
    time: '2023-11-05 15:10',
    remark: '销售出库'
  },
  { 
    id: 5, 
    productName: 'B.Duck小黄鸭玩偶', 
    productId: 1,
    type: '出库', 
    quantity: 100, 
    beforeStock: 256, 
    afterStock: 156,
    operator: '张经理',
    time: '2023-11-04 18:30',
    remark: '销售出库'
  },
  { 
    id: 6, 
    productName: '小黄鸭水杯', 
    productId: 2,
    type: '入库', 
    quantity: 300, 
    beforeStock: 234, 
    afterStock: 534,
    operator: '李员工',
    time: '2023-11-04 17:15',
    remark: '采购补货'
  },
  { 
    id: 7, 
    productName: '乐园纪念T恤', 
    productId: 3,
    type: '出库', 
    quantity: 10, 
    beforeStock: 189, 
    afterStock: 179,
    operator: '王主管',
    time: '2023-11-03 19:20',
    remark: '销售出库'
  },
  { 
    id: 8, 
    productName: '儿童防晒帽', 
    productId: 4,
    type: '入库', 
    quantity: 50, 
    beforeStock: 123, 
    afterStock: 173,
    operator: '赵员工',
    time: '2023-11-03 18:45',
    remark: '采购补货'
  },
]

// 商品设置数据
export const productSettings = [
  { 
    id: 1, 
    category: '玩具', 
    lowStockThreshold: 50, 
    autoOrder: true,
    supplier: 'B.Duck官方',
    purchasePrice: 60,
    salesPrice: 88,
    profitMargin: 31.8
  },
  { 
    id: 2, 
    category: '日用品', 
    lowStockThreshold: 100, 
    autoOrder: false,
    supplier: '日用品供应商A',
    purchasePrice: 25,
    salesPrice: 35,
    profitMargin: 28.6
  },
  { 
    id: 3, 
    category: '服装', 
    lowStockThreshold: 30, 
    autoOrder: true,
    supplier: '服装供应商B',
    purchasePrice: 45,
    salesPrice: 68,
    profitMargin: 33.8
  },
  { 
    id: 4, 
    category: '食品', 
    lowStockThreshold: 80, 
    autoOrder: true,
    supplier: '食品供应商C',
    purchasePrice: 30,
    salesPrice: 45,
    profitMargin: 33.3
  },
]

// 游乐项目数据
export const projects = [
  { id: 1, name: '小黄鸭旋转木马', status: '运营中', capacity: 24, waitTime: '5分钟' },
  { id: 2, name: '海盗船', status: '运营中', capacity: 30, waitTime: '10分钟' },
  { id: 3, name: '欢乐蹦床', status: '运营中', capacity: 20, waitTime: '0分钟' },
  { id: 4, name: '淘气堡', status: '维护中', capacity: 50, waitTime: '-' },
]

// 分销数据
export const distribution = {
  staff: { count: 23, sales: 45678, commission: 4567 },
  user: { count: 156, sales: 123456, commission: 12345 },
  channel: { count: 8, sales: 234567, commission: 23456 }
}

// 优惠券数据
export const coupons = [
  { id: 1, name: '新人专享券', type: '满减券', value: '满100减20', stock: 1000, used: 456 },
  { id: 2, name: '周末特惠券', type: '折扣券', value: '8.8折', stock: 500, used: 234 },
  { id: 3, name: '生日特权券', type: '免费券', value: '免费玩1次', stock: 200, used: 89 },
]

// 用户信息
export const userInfo = {
  name: '张经理',
  phone: '13888641234',
  password: '123456',
  avatar: '/src/img/avatar.png',
  level: '金牌加盟商',
  storeCount: 3,
  balance: 12900,
  points: 35600
}

// 融资推荐数据
export const financingOptions = [
  { 
    id: 1, 
    title: '设备采购分期', 
    desc: '0首付，月供低至3000元', 
    image: '/src/img/banner.png'
  },
  { 
    id: 2, 
    title: '经营贷款', 
    desc: '最高100万额度，利率低至4.5%', 
    image: '/src/img/banner2.png'
  },
  { 
    id: 3, 
    title: '供应链金融', 
    desc: '灵活周转，随借随还', 
    image: '/src/img/banner.png'
  },
]

// 学院课程数据
export const courses = [
  { id: 1, title: '新店开业运营指南', duration: '2小时', students: 1234, rating: 4.8 },
  { id: 2, title: '会员营销实战技巧', duration: '1.5小时', students: 890, rating: 4.9 },
  { id: 3, title: '活动策划与执行', duration: '3小时', students: 567, rating: 4.7 },
]

// 营收分析数据
export const revenueAnalysis = {
  summary: {
    today: { revenue: 18680, orders: 89, avgOrder: 210 },
    yesterday: { revenue: 16520, orders: 78, avgOrder: 212 },
    week: { revenue: 124500, orders: 567, avgOrder: 220 },
    month: { revenue: 486780, orders: 2341, avgOrder: 208 },
  },
  dailyTrend: [
    { date: '11-04', employeeDistribution: 9200, userDistribution: 1800, thirdParty: 5800, orders: 78 },
    { date: '11-05', employeeDistribution: 10100, userDistribution: 2100, thirdParty: 6000, orders: 85 },
    { date: '11-06', employeeDistribution: 9500, userDistribution: 1700, thirdParty: 6300, orders: 82 },
    { date: '11-07', employeeDistribution: 11200, userDistribution: 2400, thirdParty: 6200, orders: 93 },
    { date: '11-08', employeeDistribution: 8800, userDistribution: 1600, thirdParty: 5800, orders: 76 },
    { date: '11-09', employeeDistribution: 9800, userDistribution: 2000, thirdParty: 6100, orders: 84 },
    { date: '11-10', employeeDistribution: 10200, userDistribution: 2180, thirdParty: 6300, orders: 89 },
  ],
  categoryRevenue: [
    { category: '门票', revenue: 286340, ratio: 58.8 },
    { category: '套餐', revenue: 121680, ratio: 25.0 },
    { category: '商品', revenue: 58420, ratio: 12.0 },
    { category: '其他', revenue: 20340, ratio: 4.2 },
  ]
}

// 会员分析数据
export const memberAnalysis = {
  summary: {
    total: 5678,
    storedValueMembers: 2341,
    storedValue: 456780,
    todayVisit: 189,
    newToday: 23,
    weeklyActive: 3892,
    newWeek: 156,
    newMonth: 689,
    activeRate: 68.5,
  },
  levelDistribution: [
    { level: '储值会员', count: 456, ratio: 8.0 },
    { level: '黄金会员', count: 1234, ratio: 21.7 },
    { level: '银牌会员', count: 2345, ratio: 41.3 },
    { level: '普通会员', count: 1643, ratio: 29.0 },
  ],
  // 用户画像标签分布
  userProfileTags: [
    { tag: '亲子家庭', count: 2571, ratio: 60.0, avgPrice: 328 },
    { tag: '年轻情侣', count: 900, ratio: 21.0, avgPrice: 256 },
    { tag: '学生群体', count: 487, ratio: 11.4, avgPrice: 168 },
    { tag: '其它人群', count: 325, ratio: 7.6, avgPrice: 198 },
  ],
  // 到店人数趋势
  dailyVisitors: [
    { date: '11-04', normalMembers: 78, storedValueMembers: 95, walkIn: 16 },
    { date: '11-05', normalMembers: 82, storedValueMembers: 103, walkIn: 18 },
    { date: '11-06', normalMembers: 75, storedValueMembers: 98, walkIn: 14 },
    { date: '11-07', normalMembers: 88, storedValueMembers: 110, walkIn: 21 },
    { date: '11-08', normalMembers: 71, storedValueMembers: 89, walkIn: 13 },
    { date: '11-09', normalMembers: 79, storedValueMembers: 96, walkIn: 17 },
    { date: '11-10', normalMembers: 85, storedValueMembers: 101, walkIn: 19 },
  ],
  dailyNewMembers: [
    { date: '11-04', normalMembers: 12, storedValueMembers: 6 },
    { date: '11-05', normalMembers: 16, storedValueMembers: 9 },
    { date: '11-06', normalMembers: 14, storedValueMembers: 8 },
    { date: '11-07', normalMembers: 18, storedValueMembers: 10 },
    { date: '11-08', normalMembers: 11, storedValueMembers: 8 },
    { date: '11-09', normalMembers: 13, storedValueMembers: 8 },
    { date: '11-10', normalMembers: 14, storedValueMembers: 9 },
  ],
  consumptionRanking: [
    { name: '张女士', phone: '138****1234', consumption: 12680 },
    { name: '李先生', phone: '139****5678', consumption: 9850 },
    { name: '王女士', phone: '186****9012', consumption: 8920 },
    { name: '赵先生', phone: '137****3456', consumption: 7560 },
    { name: '刘女士', phone: '135****7890', consumption: 6340 },
  ]
}

// 游玩分析数据
export const playAnalysis = {
  summary: {
    totalPlays: 2341,
    ticketVerified: 2189,
    avgDuration: 2.5,
    satisfaction: 4.8,
  },
  projectPopularity: [
    { name: '小黄鸭旋转木马', plays: 856, capacity: 1000, rate: 85.6, verification: 856 },
    { name: '海盗船', plays: 678, capacity: 800, rate: 84.8, verification: 678 },
    { name: '欢乐蹦床', plays: 489, capacity: 600, rate: 81.5, verification: 412 },
    { name: '淘气堡', plays: 318, capacity: 500, rate: 63.6, verification: 265 },
  ],
  hourlyDistribution: [
    { hour: '09:00', visitors: 45 },
    { hour: '10:00', visitors: 128 },
    { hour: '11:00', visitors: 186 },
    { hour: '12:00', visitors: 156 },
    { hour: '13:00', visitors: 142 },
    { hour: '14:00', visitors: 268 },
    { hour: '15:00', visitors: 324 },
    { hour: '16:00', visitors: 298 },
    { hour: '17:00', visitors: 245 },
    { hour: '18:00', visitors: 189 },
    { hour: '19:00', visitors: 134 },
    { hour: '20:00', visitors: 67 },
  ],
  peakPeriods: [
    { period: '周末', avgVisitors: 3456, ratio: 65.2 },
    { period: '工作日', avgVisitors: 1845, ratio: 34.8 },
  ]
}

// 库存分析数据
export const inventoryAnalysis = {
  summary: {
    totalProducts: 156,
    lowStock: 12,
    outOfStock: 3,
    totalValue: 245680,
  },
  categoryStock: [
    { category: '玩具', count: 45, value: 98560, ratio: 40.1 },
    { category: '服装', count: 38, value: 56780, ratio: 23.1 },
    { category: '日用品', count: 42, value: 45680, ratio: 18.6 },
    { category: '食品', count: 31, value: 44660, ratio: 18.2 },
  ],
  lowStockProducts: [
    { name: 'B.Duck小黄鸭玩偶', current: 8, min: 20, status: '库存预警' },
    { name: '乐园纪念T恤', current: 12, min: 30, status: '库存预警' },
    { name: '儿童防晒帽', current: 5, min: 20, status: '库存紧张' },
    { name: '小黄鸭水杯', current: 0, min: 50, status: '缺货' },
    { name: '限量款徽章', current: 3, min: 10, status: '库存紧张' },
  ],
  topSelling: [
    { name: 'B.Duck小黄鸭玩偶', sales: 890, revenue: 78320 },
    { name: '小黄鸭水杯', sales: 567, revenue: 19845 },
    { name: '儿童防晒帽', sales: 345, revenue: 15525 },
    { name: '乐园纪念T恤', sales: 234, revenue: 15912 },
    { name: '限量款徽章', sales: 189, revenue: 9450 },
  ]
}

// 采购商品数据
export const purchaseProducts = [
  // 游乐设备
  { id: 1, name: '小黄鸭旋转木马', category: '游乐设备', price: 158000, unit: '台', image: '🎠', stock: 5, sales: 12, desc: '经典旋转木马，24座位，含安装调试' },
  { id: 2, name: '海盗船', category: '游乐设备', price: 268000, unit: '台', image: '🚢', stock: 3, sales: 8, desc: '大型海盗船设备，40座位，刺激好玩' },
  { id: 3, name: '欢乐蹦床', category: '游乐设备', price: 45000, unit: '套', image: '🤸', stock: 15, sales: 23, desc: '安全蹦床组合，适合3-12岁儿童' },
  { id: 4, name: '淘气堡组合', category: '游乐设备', price: 89000, unit: '套', image: '🏰', stock: 8, sales: 18, desc: '大型室内淘气堡，50平米标准配置' },
  
  // 运营物资
  { id: 5, name: '入场手环', category: '运营物资', price: 2.5, unit: '个', image: '🎫', stock: 10000, sales: 8500, desc: '一次性识别手环，多色可选' },
  { id: 6, name: '储物柜', category: '运营物资', price: 3800, unit: '组', image: '🗄️', stock: 20, sales: 15, desc: '12门电子储物柜，含管理系统' },
  { id: 7, name: '饮水机', category: '运营物资', price: 1200, unit: '台', image: '💧', stock: 30, sales: 28, desc: '商用冷热饮水机，304不锈钢' },
  { id: 8, name: '休息椅', category: '运营物资', price: 580, unit: '张', image: '🪑', stock: 50, sales: 45, desc: '等候区休息椅，舒适耐用' },
  
  // IP周边
  { id: 9, name: 'B.Duck小黄鸭玩偶(大)', category: 'IP周边', price: 168, unit: '个', image: '🦆', stock: 200, sales: 156, desc: '正版授权，50cm大号玩偶' },
  { id: 10, name: 'B.Duck小黄鸭玩偶(小)', category: 'IP周边', price: 68, unit: '个', image: '🦆', stock: 500, sales: 389, desc: '正版授权，20cm迷你玩偶' },
  { id: 11, name: '小黄鸭主题水杯', category: 'IP周边', price: 45, unit: '个', image: '🥤', stock: 300, sales: 267, desc: '双层保温杯，可爱造型' },
  { id: 12, name: '乐园纪念T恤', category: 'IP周边', price: 88, unit: '件', image: '👕', stock: 400, sales: 234, desc: '纯棉亲子款，多码可选' },
  
  // 清洁用品
  { id: 13, name: '消毒液(大桶)', category: '清洁用品', price: 120, unit: '桶', image: '🧴', stock: 80, sales: 67, desc: '5L装，环保无刺激' },
  { id: 14, name: '拖把套装', category: '清洁用品', price: 85, unit: '套', image: '🧹', stock: 60, sales: 45, desc: '旋转拖把+水桶组合' },
  { id: 15, name: '垃圾桶', category: '清洁用品', price: 180, unit: '个', image: '🗑️', stock: 40, sales: 38, desc: '分类垃圾桶，带盖防臭' },
  { id: 16, name: '一次性鞋套', category: '清洁用品', price: 0.5, unit: '个', image: '👟', stock: 5000, sales: 4200, desc: '加厚防滑鞋套' },
  
  // 安全防护
  { id: 17, name: '监控摄像头', category: '安全防护', price: 680, unit: '个', image: '📹', stock: 50, sales: 42, desc: '高清夜视摄像头，含安装' },
  { id: 18, name: '急救箱', category: '安全防护', price: 280, unit: '套', image: '🏥', stock: 30, sales: 28, desc: '标准急救包，齐全药品' },
  { id: 19, name: '灭火器', category: '安全防护', price: 180, unit: '个', image: '🧯', stock: 60, sales: 56, desc: '4kg干粉灭火器，含年检' },
  { id: 20, name: '防护栏', category: '安全防护', price: 120, unit: '米', image: '🚧', stock: 200, sales: 178, desc: '不锈钢防护栏，可伸缩' },
  
  // 装饰道具
  { id: 21, name: '主题气球套装', category: '装饰道具', price: 180, unit: '套', image: '🎈', stock: 100, sales: 89, desc: '100个装，多种颜色' },
  { id: 22, name: 'LED灯带', category: '装饰道具', price: 45, unit: '米', image: '💡', stock: 300, sales: 234, desc: '七彩灯带，遥控调节' },
  { id: 23, name: '生日派对布置套装', category: '装饰道具', price: 380, unit: '套', image: '🎂', stock: 50, sales: 42, desc: '含气球、拉旗、蛋糕架等' },
  { id: 24, name: '节日装饰挂件', category: '装饰道具', price: 280, unit: '套', image: '🎊', stock: 80, sales: 67, desc: '节日通用装饰，可重复使用' },
]

// 租赁商品数据
export const rentalProducts = [
  // 游乐设备
  { id: 101, name: '充气城堡', category: '游乐设备', price: 800, unit: '天', image: '🏰', stock: 8, orders: 45, desc: '大型充气城堡，适合户外活动，含充气泵' },
  { id: 102, name: '儿童电动车', category: '游乐设备', price: 200, unit: '天', image: '🚗', stock: 15, orders: 78, desc: '多款式电动车，2-6岁适用，含充电器' },
  { id: 103, name: '碰碰球套装', category: '游乐设备', price: 500, unit: '天', image: '⚽', stock: 10, orders: 34, desc: '10个碰碰球，含充气设备' },
  { id: 104, name: '小型蹦床', category: '游乐设备', price: 300, unit: '天', image: '🤸', stock: 12, orders: 56, desc: '便携式蹦床，快速安装' },
  { id: 105, name: '移动售货亭', category: '游乐设备', price: 600, unit: '天', image: '🏪', stock: 5, orders: 23, desc: '移动式售货亭，含展示架' },
  { id: 106, name: '移动音响设备', category: '游乐设备', price: 400, unit: '天', image: '🔊', stock: 8, orders: 38, desc: '专业音响系统，含无线麦克风' },
  { id: 107, name: '拍照打卡装置', category: '游乐设备', price: 350, unit: '天', image: '📸', stock: 10, orders: 42, desc: '网红打卡背景墙+道具' },
  { id: 108, name: '移动洗手台', category: '游乐设备', price: 180, unit: '天', image: '🚰', stock: 15, orders: 28, desc: '户外活动专用，含水箱' },
  { id: 110, name: 'IP主题展板', category: '游乐设备', price: 200, unit: '天', image: '🖼️', stock: 12, orders: 28, desc: '多款主题展板，含支架' },
  { id: 111, name: 'IP互动游戏道具', category: '游乐设备', price: 300, unit: '天', image: '🎮', stock: 8, orders: 19, desc: '互动游戏道具套装' },
  { id: 112, name: '主题服装套装', category: '游乐设备', price: 150, unit: '天', image: '👗', stock: 20, orders: 45, desc: '儿童主题服装，多款可选' },
  { id: 113, name: '高压清洗机', category: '游乐设备', price: 200, unit: '天', image: '💦', stock: 6, orders: 15, desc: '专业高压清洗设备' },
  { id: 114, name: '工业吸尘器', category: '游乐设备', price: 150, unit: '天', image: '🌪️', stock: 8, orders: 22, desc: '大功率工业吸尘器' },
  { id: 115, name: '地面打蜡机', category: '游乐设备', price: 180, unit: '天', image: '✨', stock: 4, orders: 8, desc: '地面清洁打蜡设备' },
  { id: 116, name: '消毒雾化机', category: '游乐设备', price: 220, unit: '天', image: '🧼', stock: 5, orders: 18, desc: '全场消毒雾化设备' },
  { id: 117, name: '临时监控系统', category: '游乐设备', price: 400, unit: '天', image: '📹', stock: 8, orders: 24, desc: '无线监控系统，4路摄像头' },
  { id: 118, name: '安保对讲机', category: '游乐设备', price: 80, unit: '天', image: '📻', stock: 20, orders: 42, desc: '5台对讲机套装' },
  { id: 119, name: '应急照明设备', category: '游乐设备', price: 150, unit: '天', image: '🔦', stock: 15, orders: 28, desc: '应急灯+照明灯组合' },
  { id: 120, name: '临时围栏', category: '游乐设备', price: 100, unit: '天', image: '🚧', stock: 50, orders: 67, desc: '20米围栏，快速安装' },
  { id: 121, name: '大型充气拱门', category: '游乐设备', price: 500, unit: '天', image: '🌈', stock: 6, orders: 28, desc: '开业活动专用，含充气泵' },
  { id: 122, name: '舞台灯光设备', category: '游乐设备', price: 800, unit: '天', image: '💡', stock: 4, orders: 15, desc: '专业舞台灯光，含操控台' },
  { id: 123, name: '节日主题装饰包', category: '游乐设备', price: 400, unit: '天', image: '🎄', stock: 10, orders: 34, desc: '节日全套装饰，多主题可选' },
  { id: 124, name: '红毯+栏杆', category: '游乐设备', price: 300, unit: '天', image: '🎪', stock: 8, orders: 22, desc: '储值会员通道装饰套装' },
  
  // 人偶服
  { id: 109, name: '大型IP人偶服装', category: '人偶服', price: 500, unit: '天', image: '🦆', stock: 6, orders: 34, desc: '小黄鸭人偶服，含头套' },
  { id: 125, name: '小黄鸭人偶服', category: '人偶服', price: 450, unit: '天', image: '🦆', stock: 8, orders: 28, desc: '经典小黄鸭造型，适合互动表演' },
  { id: 126, name: '卡通人偶服套装', category: '人偶服', price: 380, unit: '天', image: '🎭', stock: 10, orders: 22, desc: '多款卡通造型可选，含头套和服装' },
  { id: 127, name: '大型充气人偶', category: '人偶服', price: 600, unit: '天', image: '🎈', stock: 5, orders: 15, desc: '大型充气人偶，适合户外活动' },
]

// 采购订单数据
export const purchaseOrders = [
  { 
    id: 'P20231106001', 
    orderNo: 'PO20231106001',
    totalAmount: 158000, 
    status: '待发货', 
    createTime: '2023-11-06 14:30',
    items: [
      { name: '小黄鸭旋转木马', quantity: 1, price: 158000, unit: '台' }
    ]
  },
  { 
    id: 'P20231105002', 
    orderNo: 'PO20231105002',
    totalAmount: 456, 
    status: '已发货', 
    createTime: '2023-11-05 13:45',
    items: [
      { name: 'B.Duck小黄鸭玩偶(大)', quantity: 2, price: 168, unit: '个' },
      { name: '小黄鸭主题水杯', quantity: 2, price: 45, unit: '个' },
      { name: '乐园纪念T恤', quantity: 1, price: 88, unit: '件' }
    ]
  },
  { 
    id: 'P20231104003', 
    orderNo: 'PO20231104003',
    totalAmount: 1200, 
    status: '已完成', 
    createTime: '2023-11-04 12:20',
    items: [
      { name: '饮水机', quantity: 1, price: 1200, unit: '台' }
    ]
  },
  { 
    id: 'P20231103004', 
    orderNo: 'PO20231103004',
    totalAmount: 3800, 
    status: '待发货', 
    createTime: '2023-11-03 11:15',
    items: [
      { name: '储物柜', quantity: 1, price: 3800, unit: '组' }
    ]
  },
  { 
    id: 'P20231102005', 
    orderNo: 'PO20231102005',
    totalAmount: 680, 
    status: '已完成', 
    createTime: '2023-11-02 10:30',
    items: [
      { name: '监控摄像头', quantity: 1, price: 680, unit: '个' }
    ]
  },
]

// 租赁订单数据
export const rentalOrders = [
  { 
    id: 'R20231106001', 
    orderNo: 'RO20231106001',
    totalAmount: 800, 
    status: '租赁中', 
    createTime: '2023-11-06 15:30',
    startDate: '2023-11-06',
    endDate: '2023-11-08',
    days: 2,
    items: [
      { name: '充气城堡', quantity: 1, price: 800, unit: '天' }
    ]
  },
  { 
    id: 'R20231105002', 
    orderNo: 'RO20231105002',
    totalAmount: 500, 
    status: '已完成', 
    createTime: '2023-11-05 14:20',
    startDate: '2023-11-05',
    endDate: '2023-11-05',
    days: 1,
    items: [
      { name: '大型IP人偶服装', quantity: 1, price: 500, unit: '天' }
    ]
  },
  { 
    id: 'R20231104003', 
    orderNo: 'RO20231104003',
    totalAmount: 1200, 
    status: '租赁中', 
    createTime: '2023-11-04 13:15',
    startDate: '2023-11-04',
    endDate: '2023-11-07',
    days: 3,
    items: [
      { name: '儿童电动车', quantity: 2, price: 200, unit: '天' },
      { name: '移动音响设备', quantity: 1, price: 400, unit: '天' },
      { name: '拍照打卡装置', quantity: 1, price: 350, unit: '天' }
    ]
  },
  { 
    id: 'R20231103004', 
    orderNo: 'RO20231103004',
    totalAmount: 300, 
    status: '已完成', 
    createTime: '2023-11-03 12:00',
    startDate: '2023-11-03',
    endDate: '2023-11-03',
    days: 1,
    items: [
      { name: '小型蹦床', quantity: 1, price: 300, unit: '天' }
    ]
  },
  { 
    id: 'R20231102005', 
    orderNo: 'RO20231102005',
    totalAmount: 600, 
    status: '已取消', 
    createTime: '2023-11-02 11:30',
    startDate: '2023-11-02',
    endDate: '2023-11-04',
    days: 2,
    items: [
      { name: '移动售货亭', quantity: 1, price: 600, unit: '天' }
    ]
  },
]

