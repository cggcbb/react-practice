import React from 'react'
import { Select, Input, Form, DatePicker, Button, Checkbox } from 'antd'
const FormItem = Form.Item
const Option = Select.Option
class FilterForm extends React.Component {
  // 查询点击事件
  handleFilterSubmit = () => {
    const params = this.props.form.getFieldsValue()
    this.props.filterSubmit(params)
  }
  handleFilterReset = () => {
    this.props.form.resetFields()
  }
  // 初始化baseForm
  initBaseForm = () => {
    const { getFieldDecorator } = this.props.form
    const { formConfig } = this.props
    const result = []
    if (formConfig && formConfig.length) {
      formConfig.forEach(item => {
        const { type, label, field, initailValue = '', placeholder = '', style, list, format } = item
        switch (type) {
          case 'INPUT':
            const input = 
              <FormItem label={label} key={field}>
                {
                  getFieldDecorator([field], {
                    initailValue
                  })(
                   <Input type="text" placeholder={placeholder}/>
                  )
                }
              </FormItem>
            result.push(input)
            break
          case 'SELECT':
            const select = 
              <FormItem label={label} key={field}>
                {
                  getFieldDecorator([field], {
                    initailValue
                  })(
                    <Select style={style} placeholder={placeholder}>
                      {this._getOptionList(list)}
                    </Select>
                  )
                }
              </FormItem>
            result.push(select)
            break
          case 'CHECKBOX':
            const checkbox = 
              <FormItem key={field}>
                {
                  getFieldDecorator([field], {
                    valuePropName: 'checked',
                    initailValue
                  })(
                    <Checkbox>
                      {label}
                    </Checkbox>
                  )
                }
              </FormItem>
            result.push(checkbox)
            break
          case 'DATEPICKER':
            const startTime = 
              <FormItem key={field[0]}>
                {
                  getFieldDecorator([field[0]])(
                    <DatePicker placeholder={placeholder[0]} format={format}></DatePicker>
                  )
                }
              </FormItem>
            const endTime = 
              <FormItem key={field[1]} label="~" colon={false}>
                {
                  getFieldDecorator([field[1]])(
                    <DatePicker placeholder={placeholder[1]} format={format} style={style}></DatePicker>
                  )
                }
              </FormItem>
            result.push(startTime)
            result.push(endTime)
            break
          default:
        }
      })
    }
    return result
  }
  render() {
    return (
      <section>
        <Form layout="inline">
          { this.initBaseForm() }
          <FormItem>
            <Button type="primary" onClick={this.handleFilterSubmit}>查询</Button>
            <Button onClick={this.handleFilterReset}>重置</Button>
          </FormItem>
        </Form>
      </section>
    )
  }
  _getOptionList = (data) => {
    if (!data) {
      return []
    }
    return data.map(item => {
      return <Option value={item.value} key={item.value}>{item.name}</Option>
    })
  }
}

export default Form.create({ name: 'FilterForm' })(FilterForm)