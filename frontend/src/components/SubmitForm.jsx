import React, { useContext } from 'react'
import axios from 'axios';
import moment from 'moment';
import { InboxOutlined } from '@ant-design/icons';
import { Form, Input, Select, Checkbox, Button, Upload, message, InputNumber, DatePicker, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import 'antd/dist/antd.css';
import { authContext } from '../providers/Authprovider'

const { Dragger } = Upload;

const dateFormat = 'YYYY/MM/DD';

const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  // onChange(info) {
  //   const { status } = info.file;
  //   if (status !== 'uploading') {
  //     console.log(info.file, info.fileList);
  //   }
  //   if (status === 'done') {
  //     message.success(`${info.file.name} file uploaded successfully.`);
  //   } else if (status !== 'error') {
  //     message.error(`${info.file.name} file upload failed.`);
  //   }
  // },
  // onDrop(e) {
  //   console.log('Dropped files', e.dataTransfer.files);
  // },
};

function onChange(value) {
  console.log('changed', value);
}

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};



const SubmitForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { user } = useContext(authContext);

  const onFinish = (values) => {
    const url = "http://localhost:3001/report-pet"
    const payload = {
      ...values,
       user_id: user.id,
      image: 'https://i.ytimg.com/vi/D6QO5X8N5mI/maxresdefault.jpg'

    }

    // console.log('Received values of form: ', payload);
    axios.post(url, payload)
      .then(res => {
        if (res.status === 200) {
        navigate(`/confirmation/${res.data.id}`, { replace: true });
        }
      })
      .catch(err => { console.log(err) })

  };

  return (

    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >

      <Form.Item >
        <Dragger {...props} >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
            band files
          </p>
        </Dragger>
      </Form.Item>

      <Form.Item
            name= "status"
            label='Status'
            rules={[
              {
                required: true,
                message: 'Please select a status',
              },
            ]}
          >
            <Select style={{ width: 150 }}allowClear name= "status" placeholder="Select status">
                <Option value="lost">Lost</Option>
          <Option value="found">Found/Stray</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="last_seen_date"
        label="Last Seen"
        rules={[
          {
            required: true,
            message: 'Please select a date',
          },
        ]}
      >
        <DatePicker defaultValue={moment('2022-01-01', dateFormat)} format={dateFormat} />
      </Form.Item>

      <Form.Item
        name="cat_name"
        label="Cat's Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input style={{ width: '50%' }} placeholder="Name"/>
      </Form.Item>

      <Form.Item
        name="gender"
        label="Gender"
        rules={[
          {
            required: true,
            message: 'Please select gender',
          },
        ]}
      >
        <Select placeholder="Select your gender" style={{ width: '50%' }}>
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select >
      </Form.Item>

      <Form.Item
        name="age"
        label="Age (in months)"
        label-r
      >
        <InputNumber min={0} max={240} defaultValue={0} onChange={onChange} />
      </Form.Item>

      <Form.Item label="Address">
        <Input.Group compact>
        <Form.Item
            name='last_seen_address'
            noStyle
            rules={[{
              required: true,
              message: 'Please select a street'
            }]}
          >
            <Input style={{ width: '35%' }} placeholder="Input Street" />
          </Form.Item>
          <Form.Item
            name='province'
            noStyle
            rules={[{
              required: true,
              message: 'Please select a province'
            }]}
          >
            <Select placeholder="Select province">
              <Option value="Alberta">Alberta</Option>
              <Option value="British Columbia">British Columbia</Option>
              <Option value="Manitoba">Manitoba</Option>
              <Option value="New Brunswick">New Brunswick</Option>
              <Option value="Newfoundland and Labrador">Newfoundland and Labrador</Option>
              <Option value="Northwest Territories">Northwest Territories</Option>
              <Option value="Nova Scotia">Nova Scotia</Option>
              <Option value="Nunavut">Nunavut</Option>
              <Option value="Ontario">Ontario</Option>
              <Option value="Prince Edward Island">Prince Edward Island</Option>
              <Option value="Quebec">Quebec</Option>
              <Option value="Saskatchewan">Saskatchewan</Option>
              <Option value="Yukon">Yukon</Option>
            </Select>
          </Form.Item>
          
        </Input.Group>
      </Form.Item>

      <Row > 
        {/* <Col span={12}> */}
          <Form.Item
            name="last_seen_city"
            label="City"

            rules={[
              {
                required: true,
                message: 'Please enter a city'
              },
            ]}
          >
            <Input style={{ width: '100%' }} placeholder="City" />
          </Form.Item>
          {/* </Col> */}
          {/* <Col span={12}> */}
          <Form.Item
            name="last_seen_postal_code"
            label="Postal Code"

            rules={[
              {
                required: true,
                message: 'Please input a postal code'
              },
            ]}
          >
            <Input style={{ width: '50%' }} placeholder="Postal Code" />
          </Form.Item>
          {/* </Col> */}
      </Row>


      <Form.Item
        name="description"
        label="Description"
      // rules={[
      //   {
      //     required: true,
      //     message: 'Please input Description',
      //   },
      // ]}
      >
        <Input.TextArea showCount maxLength={250} style={{ width: '50%' }} />
      </Form.Item>


      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="/">agreement</a>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SubmitForm;
