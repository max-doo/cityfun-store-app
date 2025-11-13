// 开店申请表页面：包含填写申请表和我的申请两个tab页
import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, NavBar, Toast, Tabs, Tag, Input, Radio, DatePicker, TextArea } from 'antd-mobile'
import { ImageUploader, ImageUploadItem } from 'antd-mobile'
import { DatePickerRef } from 'antd-mobile/es/components/date-picker'
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

const Application: React.FC = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [activeKey, setActiveKey] = useState('form')
  const [form] = Form.useForm()
  const [applicantType, setApplicantType] = useState<'enterprise' | 'individual'>('enterprise')
  const datePickerRef = useRef<DatePickerRef>(null)

  // 模拟申请列表数据
  const [applications] = useState([
    {
      id: '1',
      storeName: '城市乐园加盟店申请',
      applicantName: '张三',
      applyTime: '2024-01-15 10:30:00',
      status: '进行中',
      currentStep: 1, // 当前步骤：1-资质审核，2-项目审核，3-签订合同，4-提供授权服务
    },
  ])

  // 流程步骤定义
  const processSteps = [
    {
      key: 1,
      title: '加盟商【资质审核】',
      action: '填写《加盟商资质申请表》',
    },
    {
      key: 2,
      title: '加盟商【项目审核】',
      action: '填写《加盟项目申请表》',
    },
    {
      key: 3,
      title: '签订《品牌授权合同》',
      action: '缴纳6万元授权费，获得3个月授权保护',
    },
    {
      key: 4,
      title: '提供授权服务',
      action: '',
    },
  ]

  const onFinish = async (values: any) => {
    console.log('提交的表单数据:', values)
    setLoading(true)
    // 模拟提交申请
    setTimeout(() => {
      setLoading(false)
      Toast.show({
        icon: 'success',
        content: '申请提交成功，我们将尽快与您联系',
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
        开店申请
      </NavBar>

      <Tabs activeKey={activeKey} onChange={setActiveKey}>
        {/* 填写申请表tab */}
        <Tabs.Tab title="填写申请表" key="form">
          <div className="p-0">
            <div className="bg-white rounded-lg p-4">
              <h2 className="text-xl text-gray-600 font-semibold mb-4 text-center">城市乐园《加盟商资质申请表》</h2>
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
                {/* 申请类型选择 */}
                <div className="text-lg font-semibold mb-3 mt-4 text-gray-800">申请类型</div>
                <Form.Item
                  name="applicantType"
                  initialValue="enterprise"
                >
                  <div className="application-radio-group">
                    <Radio.Group
                      value={applicantType}
                      onChange={(val) => {
                        const newType = val as 'enterprise' | 'individual'
                        setApplicantType(newType)
                        // 切换类型时重置表单（保留申请类型）
                        form.resetFields()
                        form.setFieldsValue({ applicantType: newType })
                      }}
                    >
                      <Radio value="enterprise">企业(法人)</Radio>
                      <Radio value="individual">个人(自然人)</Radio>
                    </Radio.Group>
                  </div>
                </Form.Item>

                {/* 企业版表单 */}
                {applicantType === 'enterprise' && (
                  <>
                    <div className="text-lg font-semibold mb-3 mt-4 text-gray-800">基本信息</div>
                    
                    <Form.Item
                      name="creditCode"
                      label="统一社会信用代码"
                      rules={[{ required: true, message: '请输入统一社会信用代码' }]}
                    >
                      <Input placeholder="请输入统一社会信用代码" />
                    </Form.Item>

                    <Form.Item
                      name="establishDate"
                      label="注册成立时间"
                      rules={[{ required: true, message: '请选择注册成立时间' }]}
                      trigger="onConfirm"
                      onClick={(_e, ref: any) => {
                        ref.current?.open()
                      }}
                    >
                      <DatePicker 
                        ref={datePickerRef}
                        precision="month"
                      >
                        {(value) => value ? `${value.getFullYear()}年${value.getMonth() + 1}月` : '请选择'}
                      </DatePicker>
                    </Form.Item>

                    <Form.Item
                      name="businessScope"
                      label="营业执照经营范围"
                      rules={[{ required: true, message: '请输入营业执照经营范围' }]}
                    >
                      <TextArea
                        placeholder="请输入营业执照经营范围"
                        rows={3}
                        showCount
                        maxLength={500}
                      />
                    </Form.Item>

                    <Form.Item
                      name="legalRepresentative"
                      label="法定代表人姓名"
                      rules={[{ required: true, message: '请输入法定代表人姓名' }]}
                    >
                      <Input placeholder="请输入法定代表人姓名" />
                    </Form.Item>

                    <Form.Item
                      name="legalIdCard"
                      label="身份证号"
                      rules={[
                        { required: true, message: '请输入身份证号' },
                        { pattern: /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/, message: '请输入正确的身份证号' }
                      ]}
                    >
                      <Input placeholder="请输入身份证号" />
                    </Form.Item>

                    <Form.Item
                      name="registerAddress"
                      label="企业注册地址"
                      rules={[{ required: true, message: '请输入企业注册地址' }]}
                    >
                      <Input placeholder="请输入企业注册地址" />
                    </Form.Item>

                    <Form.Item
                      name="contactPhone"
                      label="联系电话"
                      rules={[
                        { required: true, message: '请输入联系电话' },
                        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }
                      ]}
                    >
                      <Input placeholder="请输入联系电话" type="tel" />
                    </Form.Item>

                    <Form.Item
                      name="email"
                      label="电子邮箱"
                      rules={[
                        { required: true, message: '请输入电子邮箱' },
                        { type: 'email', message: '请输入正确的邮箱地址' }
                      ]}
                    >
                      <Input placeholder="请输入电子邮箱" type="email" />
                    </Form.Item>

                    <div className="text-lg font-semibold mb-3 mt-4 text-gray-800">经营能力</div>

                    <Form.Item
                      name="industryExperience"
                      label="相关行业经营经验"
                      rules={[{ required: true, message: '请输入相关行业经营经验' }]}
                    >
                      <Input placeholder="如：文旅/游乐/商业综合体" />
                    </Form.Item>

                    <Form.Item
                      name="experienceYears"
                      label="从业年数"
                      rules={[{ required: true, message: '请输入从业年数' }]}
                    >
                      <Input placeholder="请输入年数" type="number" />
                    </Form.Item>

                    <Form.Item
                      name="teamSize"
                      label="核心管理团队人数"
                      rules={[{ required: true, message: '请输入核心管理团队人数' }]}
                    >
                      <Input placeholder="请输入人数" type="number" />
                    </Form.Item>

                    <Form.Item
                      name="teamMembers"
                      label="团队成员信息"
                    >
                      <TextArea
                        placeholder="请输入团队成员姓名及从业年限"
                        rows={3}
                        showCount
                        maxLength={500}
                      />
                    </Form.Item>

                    <Form.Item
                      name="pastProjects"
                      label="过往代表性项目"
                      extra=""
                    >
                      <TextArea
                        placeholder="请输入过往代表性项目详情（名称/合作方/周期/业绩）"
                        rows={4}
                        showCount
                        maxLength={1000}
                      />
                    </Form.Item>

                    <Form.Item
                      name="marketResources"
                      label="区域市场资源"
                    >
                      <TextArea
                        placeholder="请输入区域市场资源（如：与主管部门合作、流量渠道等）"
                        rows={4}
                        showCount
                        maxLength={1000}
                      />
                    </Form.Item>
                  </>
                )}

                {/* 个人版表单 */}
                {applicantType === 'individual' && (
                  <>
                    <div className="text-lg font-semibold mb-3 mt-4 text-gray-800">基本信息</div>
                    
                    <Form.Item
                      name="name"
                      label="姓名"
                      rules={[{ required: true, message: '请输入姓名' }]}
                    >
                      <Input placeholder="请输入姓名" />
                    </Form.Item>

                    <Form.Item
                      name="idCard"
                      label="身份证号"
                      rules={[
                        { required: true, message: '请输入身份证号' },
                        { pattern: /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/, message: '请输入正确的身份证号' }
                      ]}
                    >
                      <Input placeholder="请输入身份证号" />
                    </Form.Item>

                    <Form.Item
                      name="age"
                      label="年龄"
                      rules={[{ required: true, message: '请输入年龄' }]}
                    >
                      <Input placeholder="请输入年龄" type="number" />
                    </Form.Item>

                    <Form.Item
                      name="education"
                      label="学历"
                      extra=""
                      rules={[{ required: true, message: '请输入学历' }]}
                    >
                      <Input placeholder="高中及以上" />
                    </Form.Item>

                    <Form.Item
                      name="registeredAddress"
                      label="户籍地址"
                      rules={[{ required: true, message: '请输入户籍地址' }]}
                    >
                      <Input placeholder="请输入户籍地址" />
                    </Form.Item>

                    <Form.Item
                      name="currentAddress"
                      label="现居住地"
                      rules={[{ required: true, message: '请输入现居住地' }]}
                    >
                      <Input placeholder="请输入现居住地" />
                    </Form.Item>

                    <Form.Item
                      name="contactPhone"
                      label="联系电话"
                      rules={[
                        { required: true, message: '请输入联系电话' },
                        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }
                      ]}
                    >
                      <Input placeholder="请输入联系电话" type="tel" />
                    </Form.Item>

                    <Form.Item
                      name="email"
                      label="电子邮箱"
                      rules={[
                        { required: true, message: '请输入电子邮箱' },
                        { type: 'email', message: '请输入正确的邮箱地址' }
                      ]}
                    >
                      <Input placeholder="请输入电子邮箱" type="email" />
                    </Form.Item>

                    <div className="text-lg font-semibold mb-3 mt-4 text-gray-800">经营能力</div>

                    <Form.Item
                      name="workExperience"
                      label="相关从业经验"
                      extra="服务/零售行业等"
                      rules={[{ required: true, message: '请输入相关从业经验' }]}
                    >
                      <Input placeholder="请输入从业年数" type="number" />
                    </Form.Item>

                    <Form.Item
                      name="teamSize"
                      label="拟组建运营团队人数"
                      rules={[{ required: true, message: '请输入拟组建运营团队人数' }]}
                    >
                      <Input placeholder="请输入人数" type="number" />
                    </Form.Item>

                    <Form.Item
                      name="teamMembers"
                      label="团队成员信息"
                      extra="附团队成员意向姓名及分工"
                    >
                      <TextArea
                        placeholder="请输入团队成员意向姓名及分工"
                        rows={3}
                        showCount
                        maxLength={500}
                      />
                    </Form.Item>

                    <Form.Item
                      name="pastCases"
                      label="过往经营案例"
                      extra="如个体户/合作项目：名称/周期/成果"
                    >
                      <TextArea
                        placeholder="请输入过往经营案例"
                        rows={4}
                        showCount
                        maxLength={1000}
                      />
                    </Form.Item>

                    <Form.Item
                      name="localResources"
                      label="当地资源"
                      extra="客户/人脉/渠道等"
                    >
                      <TextArea
                        placeholder="请输入当地资源"
                        rows={4}
                        showCount
                        maxLength={1000}
                      />
                    </Form.Item>
                  </>
                )}

                {/* 信用状况声明 */}
                <div className="text-lg font-semibold mb-3 mt-4 text-gray-800">信用状况声明</div>
                <div className="bg-gray-50 p-3 rounded mb-3 text-base text-gray-700 leading-relaxed">
                  {applicantType === 'enterprise' ? (
                    <>
                      <div>本企业及法定代表人承诺：</div>
                      <div>1.无失信被执行人记录、无重大债务纠纷；</div>
                      <div>2.近3年内无被监管部门处罚的服务问题记录；</div>
                      <div>3.无拖欠员工工资、供应商货款等不良记录。</div>
                    </>
                  ) : (
                    <>
                      <div>本人承诺：</div>
                      <div>1.无失信被执行人记录、无重大债务纠纷；</div>
                      <div>2.无拖欠员工工资、供应商货款等不良记录。</div>
                    </>
                  )}
                </div>
                <Form.Item
                  name="creditSignature"
                  label="电子签名"
                  rules={[{ required: true, message: '请上传电子签名' }]}
                  valuePropName="value"
                  getValueFromEvent={(e) => e}
                >
                  <FileUploader maxCount={1} label="" />
                </Form.Item>

                {/* 合作意识声明 */}
                <div className="text-lg font-semibold mb-3 mt-4 text-gray-800">合作意识声明</div>
                <div className="bg-gray-50 p-3 rounded mb-3 text-base text-gray-700 leading-relaxed space-y-2">
                  <div>1. 认同城市乐园品牌理念、运营模式及管理标准，接受总部统一培训指导。</div>
                  <div>2. 承诺遵守加盟协议，不擅自变更品牌标识/经营内容。</div>
                  <div>3. 配合总部市场推广、品牌维护工作。</div>
                </div>

                {/* 附件清单 */}
                <div className="text-lg font-semibold mb-3 mt-4 text-gray-800">附件清单</div>
                
                <Form.Item
                  name="businessLicense"
                  label="营业执照副本复印件"
                  rules={[{ required: true, message: '请上传营业执照副本复印件' }]}
                  valuePropName="value"
                  getValueFromEvent={(e) => e}
                >
                  <FileUploader maxCount={1} />
                </Form.Item>

                <Form.Item
                  name="idCardCopy"
                  label="法定代表人身份证复印件"
                  rules={[{ required: true, message: '请上传法定代表人身份证复印件' }]}
                  valuePropName="value"
                  getValueFromEvent={(e) => e}
                >
                  <FileUploader maxCount={1} />
                </Form.Item>

                <Form.Item
                  name="teamResumes"
                  label="团队成员简历"
                  valuePropName="value"
                  getValueFromEvent={(e) => e}
                >
                  <FileUploader maxCount={5} />
                </Form.Item>
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
                          {application.storeName}
                        </div>
                        <div className="text-base text-gray-600 mb-1">
                          申请人：{application.applicantName}
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

export default Application

