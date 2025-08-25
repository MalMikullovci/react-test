import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Row,
  Col,
  Button,
  Typography,
  Space,
} from "antd";
import {
  InfoCircleFilled,
  CloseOutlined,
  CheckOutlined, // Import the Check icon
} from "@ant-design/icons";
import { ArrowLeftOutlined } from "@ant-design/icons";
import CancelButton from "../components/CancelButton";
import SaveButton from "../components/SaveButton";
const { Title, Text } = Typography;
const { Option } = Select;

// colors for categories (adjusted to better match screenshot)
const categoryMeta = {
  "Sidewalk Shed": { color: "#67AA3C" },
  Scaffold: { color: "#EFD652" },
  Shoring: { color: "#9640BE" },
};
const statusMeta = {
  Completed: {
    color: "#7AC14D",
    hoverColor: "#7AC14D",
    closedColor: "#7AC14D",
  },
  "In Progress": {
    color: "#B3D99B",
    hoverColor: "#B3D99B",
    closedColor: "#B3D99B",
  },
  "On Hold": {
    color: "#ECDE7C",
    hoverColor: "#ECDE7C",
    closedColor: "#ECDE7C",
  },
};

const StatusLabel = ({ status, isSelected = false }) => {
  const meta = statusMeta[status];
  return (
    <Space
      className="status-label"
      style={{
        "--dot-color": isSelected ? meta?.closedColor : "#fff",
        "--dot-hover": meta?.hoverColor,
      }}
    >
      <span className="status-dot" />
      <span style={{ color: isSelected ? "black" : "inherit" }}>{status}</span>
    </Space>
  );
};

const JobsiteModal = ({ visible, onCancel, onSave, form: externalForm }) => {
  const [internalForm] = Form.useForm();
  const form = externalForm || internalForm;
  // Set the initial state to all categories selected to match the image
  const [selectedCategories, setSelectedCategories] = useState([]);
  const currentStatus = Form.useWatch("status", form);
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    form.validateFields().then((values) => {
      onSave({ ...values, category: selectedCategories });
      form.resetFields();
      setSelectedCategories([]);
    });
  };
  useEffect(() => {
    // This ensures the selected status is properly styled when dropdown is closed
    if (currentStatus) {
      const meta = statusMeta[currentStatus];
      if (meta) {
        document.documentElement.style.setProperty(
          "--status-color",
          meta.closedColor
        );
      }
    }
  }, [currentStatus]);
  const handleCancel = () => {
    form.resetFields();
    setSelectedCategories([]);
    onCancel();
  };

  // style grey background inputs
  const inputStyle = {
    background: "#F5F5F5",
    borderRadius: 4,
    height: 38, // Adjusted height
    border: "1px solid #d9d9d9",
  };

  return (
    <Modal
      open={visible}
      onCancel={handleCancel}
      footer={null}
      centered
      width={868}
      maskClosable={false}
    >
      <Title level={4}>Title</Title>

      <Space style={{ marginBottom: 16 }}>
        <InfoCircleFilled style={{ color: "#1264A3" }} />
        <Text>
          Informative piece of text that can be used regarding this modal.
        </Text>
      </Space>

      <Form layout="vertical" form={form}>
        {/* Name */}
        <Form.Item name="name" label="Name">
          <Input placeholder="Type the jobsite's name" style={inputStyle} />
        </Form.Item>

        <Row gutter={16}>
          {/* Category */}
          <Col span={16}>
            <Form.Item label="Category Included">
              <Select
                data-testid="category-select-0" // ✅ Add this line
                mode="multiple"
                open={open}
                onDropdownVisibleChange={setOpen}
                placeholder={
                  selectedCategories.length === Object.keys(categoryMeta).length
                    ? "All of them selected"
                    : "Select"
                }
                style={inputStyle}
                value={selectedCategories}
                onChange={(values) => {
                  setSelectedCategories(values);
                  setOpen(false); // force close after select
                }}
                tagRender={() => null}
                optionRender={(option) => {
                  const isSelected = selectedCategories.includes(option.value);
                  const meta = categoryMeta[option.value];
                  const color = meta?.color || "#ccc";

                  return (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "6px 10px",
                        borderRadius: 6,
                        background: isSelected ? color : "#fff",
                        fontWeight: isSelected ? 600 : 400,
                        color: isSelected ? "#fff" : "#000",
                      }}
                    >
                      <div>{option.label}</div>
                      {isSelected && (
                        <CheckOutlined
                          style={{ fontSize: 14, color: "#fff" }}
                        />
                      )}
                    </div>
                  );
                }}
              >
                {Object.keys(categoryMeta).map((cat) => (
                  <Option key={cat} value={cat}>
                    {cat}
                  </Option>
                ))}
              </Select>

              {/* This section for pills below is what the second image shows. 
                 It's a separate UI choice from the first image.
                 I'm keeping it here as it matches the second screenshot.
               */}
              <div
                style={{
                  marginTop: 8,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                {selectedCategories.map((cat) => (
                  <div
                    key={cat}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "2px 6px",
                      borderRadius: 16,
                      fontSize: 13,
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: categoryMeta[cat].color,
                        marginRight: 6,
                      }}
                    />
                    {cat}
                    <span
                      onClick={() =>
                        setSelectedCategories((prev) =>
                          prev.filter((c) => c !== cat)
                        )
                      }
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#E53935",
                        color: "#fff",
                        width: 14,
                        height: 14,
                        borderRadius: 4,
                        marginLeft: 6,
                        cursor: "pointer",
                      }}
                    >
                      <CloseOutlined style={{ fontSize: 10 }} />
                    </span>
                  </div>
                ))}
              </div>
            </Form.Item>
          </Col>

          {/* Status */}
          <Col span={8}>
            <Form.Item name="status" label="Status">
              <Select
                placeholder="Select one"
                style={inputStyle}
                dropdownClassName="status-dropdown-menu"
                optionRender={(option) => {
                  const isSelected = currentStatus === option.value;
                  const meta = statusMeta[option.value];

                  return (
                    <div
                      className={`status-option ${
                        isSelected ? "selected" : ""
                      }`}
                      style={{
                        "--hover-color": meta?.hoverColor,
                        "--selected-color": meta?.closedColor, // <-- inject closedColor here
                      }}
                    >
                      <StatusLabel
                        status={option.value}
                        isSelected={isSelected}
                      />
                    </div>
                  );
                }}
              >
                {Object.keys(statusMeta).map((status) => (
                  <Option key={status} value={status}>
                    <StatusLabel
                      status={status}
                      isSelected={currentStatus === status}
                    />
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* Buttons */}
        <Row justify="end" gutter={16}>
          <Col>
            <CancelButton onClick={handleCancel} />
          </Col>
          <Col>
            <SaveButton onClick={handleSave} />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default JobsiteModal;
