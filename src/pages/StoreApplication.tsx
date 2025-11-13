// 扩店申请表页面：包含填写申请表和我的申请两个tab页
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, NavBar, Toast, Tabs, Tag, Input } from 'antd-mobile'
import { ImageUploader, ImageUploadItem } from 'antd-mobile'
import { BsFileEarmarkPdf, BsImage, BsHeadset } from 'react-icons/bs'

// 文件上传组件：支持pdf、jpg、png
const FileUploader: React.FC<{
  value?: ImageUploadItem[]
  onChange?: (files: ImageUploadItem[]) => void
  maxCount?: number
  label?: string
}> = ({ value = [], onChange, maxCount = 1, label }) => {
  const handleUpload = async (file: File): Promise<ImageUploadItem> => {
    // 验证文件类型
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
    if (!validTypes.includes(file.type)) {
      Toast.show({
        icon: 'fail',
        content: '仅支持上传 PDF、JPG、PNG 格式文件',
      })
      throw new Error('Invalid file type')
    }

    // 验证文件大小（10MB）
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      Toast.show({
        icon: 'fail',
        content: '文件大小不能超过 10MB',
      })
      throw new Error('File too large')
    }

    // 模拟上传，实际应该调用上传接口
    return new Promise((resolve) => {
      setTimeout(() => {
        const url = URL.createObjectURL(file)
        resolve({
          url,
          key: Date.now().toString(),
          extra: { name: file.name, type: file.type, size: file.size },
        })
      }, 500)
    })
  }

  const getFileIcon = (item: ImageUploadItem) => {
    const fileType = item.extra?.type || ''
    if (fileType === 'application/pdf') {
      return <BsFileEarmarkPdf className="text-red-500 text-2xl" />
    }
    return <BsImage className="text-blue-500 text-2xl" />
  }

  return (
    <div className="mb-4">
      {label && <div className="text-sm font-medium mb-2 text-gray-700">{label}</div>}
      <ImageUploader
        value={value}
        onChange={onChange}
        upload={handleUpload}
        maxCount={maxCount}
        accept="image/jpeg,image/jpg,image/png,application/pdf"
        showUpload={value.length < maxCount}
        renderItem={(originNode, file) => {
          const isPdf = file.extra?.type === 'application/pdf'
          if (isPdf) {
            return (
              <div className="relative w-full h-full">
                <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded border border-gray-200">
                  <div className="text-center p-2">
                    {getFileIcon(file)}
                    <div className="text-xs text-gray-600 mt-1 truncate max-w-[60px]">
                      {file.extra?.name || '文件'}
                    </div>
                  </div>
                </div>
              </div>
            )
          }
          return originNode
        }}
      />
      <div className="text-xs text-gray-400 mt-1">支持 PDF、JPG、PNG 格式，单个文件不超过 10MB</div>
    </div>
  )
}

const StoreApplication: React.FC = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [activeKey, setActiveKey] = useState('form')
  const [form] = Form.useForm()

  // 模拟申请列表数据
  const [applications] = useState([
    {
      id: '1',
      projectName: '某商圈分店',
      applyTime: '2024-01-20 14:30:00',
      status: '进行中',
      currentStep: 1, // 当前步骤：1-填写申请表，2-项目审核，3-签订合同，4-提供授权服务
    },
  ])

  // 流程步骤定义
  const processSteps = [
    {
      key: 1,
      title: '填写《加盟商项目申请表》',
      action: '填写项目基本信息',
    },
    {
      key: 2,
      title: '总部【项目审核】',
      action: '审核项目评估结果',
    },
    {
      key: 3,
      title: '签订《扩店授权合同》',
      action: '缴纳授权费，获得新门店授权',
    },
    {
      key: 4,
      title: '提供授权服务',
      action: '总部提供新门店运营支持',
    },
  ]

  // 项目评估标准数据（只展示，不填写）
  const evaluationItems = [
    {
      id: 1,
      name: '项目体量',
      standard: 'D. 20万㎡以上大型城市综合体',
      totalScore: 10,
      score: 9,
    },
    {
      id: 2,
      name: '周边人口',
      standard: 'D. 100-200万',
      totalScore: 15,
      score: 13.5,
    },
    {
      id: 3,
      name: '项目客流',
      standard: 'D. 2500-3000万/年',
      totalScore: 15,
      score: 13.5,
    },
    {
      id: 4,
      name: '交通状况',
      standard: 'D. 有地铁,停车位1500+',
      totalScore: 10,
      score: 9,
    },
    {
      id: 5,
      name: '项目位置',
      standard: 'D. 新区核心位置,目的地性质',
      totalScore: 15,
      score: 13.5,
    },
    {
      id: 6,
      name: '项目定位',
      standard: 'E. 购物中心,家庭消费为主,体验业态丰富',
      totalScore: 10,
      score: 10,
    },
    {
      id: 7,
      name: '竞争环境',
      standard: 'C. 儿童业态规划合理,竞争良性,无户外游乐竞争,很少有价格战',
      totalScore: 15,
      score: 10.5,
    },
    {
      id: 8,
      name: '项目运营商',
      standard: 'A. 本地开发商,运营水平一般',
      totalScore: 10,
      score: 4,
    },
  ]

  // 计算总分
  const totalScore = evaluationItems.reduce((sum, item) => sum + item.totalScore, 0)

  const onFinish = async (values: any) => {
    console.log('提交的表单数据:', values)
    setLoading(true)
    // 模拟提交申请
    setTimeout(() => {
      setLoading(false)
      Toast.show({
        icon: 'success',
        content: '扩店申请提交成功，我们将尽快与您联系',
      })
      // 提交成功后切换到我的申请tab
      setActiveKey('list')
      // 可以在这里添加新申请到列表
    }, 1000)
  }

  // 获取申请状态颜色
  const getStatusColor = (status: string) => {
    const colorMap: { [key: string]: 'success' | 'primary' | 'warning' | 'danger' | 'default' } = {
      '已通过': 'success',
      '进行中': 'warning',
      '已拒绝': 'danger',
    }
    return colorMap[status] || 'default'
  }

  return (
    <div className="page-container page-with-fixed-navbar">
      <NavBar 
        onBack={() => navigate(-1)}
        className="bg-white"
      >
        扩店申请
      </NavBar>

      <Tabs activeKey={activeKey} onChange={setActiveKey}>
        {/* 填写申请表tab */}
        <Tabs.Tab title="填写申请表" key="form">
          <div className="p-0">
            <div className="bg-white rounded-lg p-4">
              <h2 className="text-xl text-gray-600 font-semibold mb-4 text-center">城市乐园《加盟商项目申请表》</h2>
              <Form
                form={form}
                onFinish={onFinish}
                footer={
                  <Button 
                    block 
                    type="submit" 
                    color="primary" 
                    size="large"
                    loading={loading}
                    className="mt-2"
                    style={{
                      '--background-color': '#FF6B35',
                      '--border-radius': '8px',
                    }}
                  >
                    提交申请
                  </Button>
                }
              >
                {/* 项目信息 */}
                <div className="text-lg font-semibold mb-3 mt-4 text-gray-800">项目信息</div>
                
                <Form.Item
                  name="projectName"
                  label="项目名称"
                  rules={[{ required: true, message: '请输入项目名称' }]}
                >
                  <Input placeholder="请输入项目名称" />
                </Form.Item>

                <Form.Item
                  name="city"
                  label="所在城市"
                  rules={[{ required: true, message: '请输入所在城市' }]}
                >
                  <Input placeholder="请输入所在城市" />
                </Form.Item>

                <Form.Item
                  name="address"
                  label="详细地址"
                  rules={[{ required: true, message: '请输入详细地址' }]}
                >
                  <Input placeholder="请输入详细地址" />
                </Form.Item>

                <Form.Item
                  name="projectNature"
                  label="项目性质"
                  rules={[{ required: true, message: '请输入项目性质' }]}
                >
                  <Input placeholder="请输入项目性质" />
                </Form.Item>

                <Form.Item
                  name="projectArea"
                  label="项目面积"
                  rules={[{ required: true, message: '请输入项目面积' }]}
                >
                  <Input placeholder="请输入项目面积（平方米）" type="number" />
                </Form.Item>

                <Form.Item
                  name="projectRenderings"
                  label="项目效果图"
                  rules={[{ required: true, message: '请上传项目效果图' }]}
                  valuePropName="value"
                  getValueFromEvent={(e) => e}
                >
                  <FileUploader maxCount={5} />
                </Form.Item>

                {/* 项目评估 */}
                <div className="text-lg font-semibold mb-3 mt-4 text-gray-800">项目评估标准</div>
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-300">
                          <th className="text-left py-2 px-2 font-semibold text-gray-700">评估项</th>
                          <th className="text-left py-2 px-2 font-semibold text-gray-700">标准选择</th>
                          <th className="text-center py-2 px-2 font-semibold text-gray-700">权重总分</th>
                        </tr>
                      </thead>
                      <tbody>
                        {evaluationItems.map((item) => (
                          <tr key={item.id} className="border-b border-gray-200">
                            <td className="py-2 px-2 text-gray-800">{item.name}</td>
                            <td className="py-2 px-2 text-gray-600 text-xs">{item.standard}</td>
                            <td className="py-2 px-2 text-center text-gray-700">{item.totalScore}</td>
                          </tr>
                        ))}
                        <tr className="border-t-2 border-gray-400 font-semibold">
                          <td colSpan={2} className="py-2 px-2 text-gray-800">合计</td>
                          <td className="py-2 px-2 text-center text-gray-700">{totalScore}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-3 text-xs text-gray-500">
                    注：项目评估由总部根据提交的项目信息进行评分，以上为参考标准
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </Tabs.Tab>

        {/* 我的申请tab */}
        <Tabs.Tab title="我的申请" key="list">
          <div className="page-content">
            {applications.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                暂无申请记录
              </div>
            ) : (
              <div className="space-y-4">
                {applications.map(application => (
                  <div key={application.id} className="bg-white rounded-lg p-4 mb-4">
                    {/* 申请基本信息 */}
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                      <div>
                        <div className="text-xl font-semibold text-gray-900 mb-1">
                          {application.projectName}
                        </div>
                        <div className="text-base text-gray-500">
                          {application.applyTime}
                        </div>
                      </div>
                      <Tag color={getStatusColor(application.status)} fill='outline'>
                        {application.status}
                      </Tag>
                    </div>

                    {/* 时间线流程 */}
                    <div className="relative">
                      {processSteps.map((step, index) => {
                        const isCompleted = step.key < application.currentStep
                        const isCurrent = step.key === application.currentStep

                        return (
                          <div key={step.key} className="relative pb-6 last:pb-0">
                            {/* 连接线 */}
                            {index < processSteps.length - 1 && (
                              <div
                                className={`absolute left-4 top-8 w-0.5 h-full ${
                                  isCompleted ? 'bg-green-500' : 'bg-gray-200'
                                }`}
                                style={{ height: 'calc(100% - 16px)' }}
                              />
                            )}

                            {/* 节点圆圈 */}
                            <div className="flex items-start">
                              <div
                                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                                  isCompleted
                                    ? 'bg-green-500 border-green-500'
                                    : isCurrent
                                    ? 'bg-blue-500 border-blue-500'
                                    : 'bg-white border-gray-300'
                                }`}
                              >
                                {isCompleted ? (
                                  <span className="text-white text-xs">✓</span>
                                ) : isCurrent ? (
                                  <span className="text-white text-xs">●</span>
                                ) : (
                                  <span className="text-gray-400 text-xs">○</span>
                                )}
                              </div>

                              {/* 步骤内容 */}
                              <div className="ml-3 flex-1">
                                <div
                                  className={`text-lg font-medium mb-1 ${
                                    isCompleted
                                      ? 'text-green-600'
                                      : isCurrent
                                      ? 'text-blue-600'
                                      : 'text-gray-400'
                                  }`}
                                >
                                  {step.title}
                                </div>
                                {step.action && (
                                  <div className="text-sm text-gray-500 mb-2">
                                    {step.action}
                                  </div>
                                )}
                                {isCurrent && (
                                  <div className="text-sm text-blue-500 font-medium">
                                    审核中...
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 联系客服提示 */}
            <div className="mt-6 mb-4 flex flex-col items-center justify-center py-4">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <BsHeadset className="text-xl" />
                <span className="text-sm">如有疑问，请联系客服</span>
              </div>
              <div className="text-base text-primary">
                客服电话：400-XXX-XXXX
              </div>
            </div>
          </div>
        </Tabs.Tab>
      </Tabs>
    </div>
  )
}

export default StoreApplication

