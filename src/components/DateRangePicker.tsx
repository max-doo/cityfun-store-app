// 日期范围选择器组件
import React, { useRef, useState, useEffect } from 'react'
import { DatePicker, Toast } from 'antd-mobile'
import { BsClock } from 'react-icons/bs'

interface DateRangePickerProps {
  title?: string
  startDate?: Date
  endDate?: Date
  onStartDateChange?: (date: Date) => void
  onEndDateChange?: (date: Date) => void
  onRangeChange?: (startDate: Date, endDate: Date) => void
  showToast?: boolean // 是否显示 Toast 提示
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  title = '分析时段',
  startDate: initialStartDate,
  endDate: initialEndDate,
  onStartDateChange,
  onEndDateChange,
  onRangeChange,
  showToast = true,
}) => {
  // 让开始日期默认为当前日期的7天前
  const getDefaultStartDate = () => {
    const d = new Date()
    d.setDate(d.getDate() - 6)
    return d
  }

  const [startDate, setStartDate] = useState<Date>(initialStartDate || getDefaultStartDate())
  const [endDate, setEndDate] = useState<Date>(initialEndDate || new Date())
  const [startVisible, setStartVisible] = useState(false)
  const [endVisible, setEndVisible] = useState(false)

  // 同步外部传入的日期变化（受控模式支持）
  useEffect(() => {
    if (initialStartDate) {
      const initialTime = initialStartDate.getTime()
      const currentTime = startDate.getTime()
      if (initialTime !== currentTime) {
        setStartDate(initialStartDate)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialStartDate?.getTime()])

  useEffect(() => {
    if (initialEndDate) {
      const initialTime = initialEndDate.getTime()
      const currentTime = endDate.getTime()
      if (initialTime !== currentTime) {
        setEndDate(initialEndDate)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialEndDate?.getTime()])

  const formatDate = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const showDateRangeToast = (start: Date, end: Date) => {
    if (showToast) {
      Toast.show({
        content: (
          <div className="text-center">
            <div className="text-lg font-medium mb-1">已选择时间段</div>
            <div className="text-lg">{start.toLocaleDateString()} - {end.toLocaleDateString()}</div>
          </div>
        ),
        duration: 1500,
      })
    }
  }

  const handleStartDateConfirm = (value: Date) => {
    setStartDate(value)
    if (onStartDateChange) {
      onStartDateChange(value)
    }
    if (onRangeChange) {
      onRangeChange(value, endDate)
    }
    showDateRangeToast(value, endDate)
  }

  const handleEndDateConfirm = (value: Date) => {
    setEndDate(value)
    if (onEndDateChange) {
      onEndDateChange(value)
    }
    if (onRangeChange) {
      onRangeChange(startDate, value)
    }
    showDateRangeToast(startDate, value)
  }

  const containerRef = useRef<HTMLDivElement | null>(null)

  return (
    <div ref={containerRef} className="date-range-picker-container rounded-xl max-w-[480px] mx-auto">
      <div className="flex items-center gap-3">
        {/* 标题 */}
        <div className="text-gray-700 text-sm whitespace-nowrap flex items-center gap-1">
         <BsClock className="text-gray-400 text-sm" />
          {title}
        </div>

        {/* 开始日期 */}
        <button
          onClick={() => setStartVisible(true)}
          className="flex-1 flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200 transition-colors hover:border-blue-400 active:bg-gray-100"
        >
          <span className="text-sm text-gray-700 text-center w-full">{formatDate(startDate)}</span>
        </button>

        {/* 分隔符 */}
        <div className="text-gray-400">至</div>

        {/* 结束日期 */}
        <button
          onClick={() => setEndVisible(true)}
          className="flex-1 flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200 transition-colors hover:border-blue-400 active:bg-gray-100"
        >
          <span className="text-sm text-gray-700 text-center w-full">{formatDate(endDate)}</span>
        </button>
      </div>

      {/* 开始日期选择器 */}
      <DatePicker
        title="选择开始日期"
        visible={startVisible}
        onClose={() => setStartVisible(false)}
        value={startDate}
        onConfirm={handleStartDateConfirm}
        max={endDate}
        className="custom-date-picker"
      />

      {/* 结束日期选择器 */}
      <DatePicker
        title="选择结束日期"
        visible={endVisible}
        onClose={() => setEndVisible(false)}
        value={endDate}
        onConfirm={handleEndDateConfirm}
        min={startDate}
        className="custom-date-picker"
      />
    </div>
  )
}

export default DateRangePicker

