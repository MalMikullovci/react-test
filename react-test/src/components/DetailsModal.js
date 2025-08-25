import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Row,
  Col,
  Button,
  Typography,
  Space,
} from "antd";
import { InfoCircleFilled } from "@ant-design/icons";
const { Title, Text } = Typography;
const { TextArea } = Input;

const CustomModal = ({ visible, onCancel, onSave, rowData }) => {
  const [form] = Form.useForm();
  const [isInfoChecked, setIsInfoChecked] = useState(false);

  // Populate form when rowData changes
  useEffect(() => {
    if (rowData) {
      form.setFieldsValue({
        item: rowData.item,
        quantity: rowData.quantity,
        description: rowData.description,
        notes: rowData.notes,
      });
      setIsInfoChecked(rowData.infoChecked || false);
    }
  }, [rowData, form]);

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        onSave({ ...rowData, ...values, infoChecked: isInfoChecked });
        form.resetFields();
        setIsInfoChecked(false);
      })
      .catch((info) => {
        // This catch block prevents the "AggregateError" in tests
        console.log("Form validation failed:", info);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsInfoChecked(false);
    onCancel();
  };

  const inputStyle = {
    background: "#F5F5F5",
    borderRadius: 4,
    border: "1px solid #d9d9d9",
  };

  return (
    <Modal
      open={visible}
      onCancel={handleCancel}
      footer={null}
      centered
      width={600}
      maskClosable={false}
      style={{ borderRadius: 8 }}
    >
      <Title level={4} style={{ marginBottom: 16 }}>
        Edit Item
      </Title>

      <Space style={{ marginBottom: 16 }}>
        <InfoCircleFilled style={{ color: "#1264A3" }} />
        <Text>
          Informative piece of text that can be used regarding this modal.
        </Text>
      </Space>

      <Form layout="vertical" form={form}>
        {/* Item Section */}
        <div style={{ marginBottom: 24 }}>
          <Text strong style={{ display: "block", marginBottom: 8 }}>
            Item
          </Text>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="item"
                label="Item Name"
                rules={[
                  { required: true, message: "Please enter the item name" },
                ]}
              >
                <Input placeholder="Type item name" style={inputStyle} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="quantity" label="Quantity">
                <Input placeholder="Type quantity" style={inputStyle} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="description" label="Description">
            <TextArea
              rows={4}
              placeholder="Type the description..."
              style={{ ...inputStyle, marginTop: 8 }}
            />
          </Form.Item>
        </div>

        {/* Notes Section */}
        <div style={{ marginBottom: 32 }}>
          <Text strong style={{ display: "block", marginBottom: 8 }}>
            Notes
          </Text>
          <Form.Item name="notes">
            <TextArea
              placeholder="Type a note..."
              rows={4}
              style={inputStyle}
            />
          </Form.Item>
        </div>

        {/* Buttons */}
        <Row justify="end" gutter={16}>
          <Col>
            <Button
              type="primary"
              onClick={handleSave}
              style={{ background: "#71CF48", borderColor: "#71CF48" }}
            >
              Save Changes
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default CustomModal;