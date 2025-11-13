# DateRangePicker 组件使用说明

## 组件介绍

日期范围选择器组件，提供开始日期和结束日期的选择功能，样式美观，适配移动端。

## 组件特性

- ✅ 响应式设计，适配移动端
- ✅ 支持自定义标题
- ✅ 自动格式化日期显示（YYYY-MM-DD）
- ✅ 开始日期不能晚于结束日期
- ✅ 结束日期不能早于开始日期
- ✅ 提供单个日期变化和范围变化回调

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | string | '分析时段' | 选择器标题 |
| startDate | Date | new Date() | 初始开始日期 |
| endDate | Date | new Date() | 初始结束日期 |
| onStartDateChange | (date: Date) => void | - | 开始日期变化回调 |
| onEndDateChange | (date: Date) => void | - | 结束日期变化回调 |
| onRangeChange | (startDate: Date, endDate: Date) => void | - | 日期范围变化回调 |

## 使用示例

### 基础用法

```tsx
import DateRangePicker from '../components/DateRangePicker'

function MyComponent() {
  return (
    <DateRangePicker />
  )
}
```

### 自定义标题

```tsx
<DateRangePicker title="统计时段" />
```

### 监听日期变化

```tsx
const handleDateRangeChange = (startDate: Date, endDate: Date) => {
  console.log('选择的日期范围:', startDate, endDate)
  // 根据日期范围加载数据
  loadData(startDate, endDate)
}

<DateRangePicker
  title="分析时段"
  onRangeChange={handleDateRangeChange}
/>
```

### 设置初始日期

```tsx
const [startDate] = useState(new Date('2025-01-01'))
const [endDate] = useState(new Date('2025-01-31'))

<DateRangePicker
  startDate={startDate}
  endDate={endDate}
  onRangeChange={handleDateRangeChange}
/>
```

## 样式说明

- 组件使用 Tailwind CSS 样式
- 白色背景，圆角卡片设计
- 日期输入框有悬停和点击效果
- 使用时钟图标和分隔符图标

## 依赖

- antd-mobile: DatePicker 组件
- react-icons: 图标库

## 注意事项

1. 确保项目已安装 `antd-mobile` 和 `react-icons`
2. 日期格式为：YYYY-MM-DD
3. 开始日期不能大于结束日期
4. 组件会自动处理日期的约束关系

