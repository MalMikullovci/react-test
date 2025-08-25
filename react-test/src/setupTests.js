import "@testing-library/jest-dom";
import React from "react";

const mockValidateFields = jest.fn(() =>
  Promise.resolve({
    item: "Test Row",
    quantity: "10",
    description: "Test description",
    notes: "Test notes",
    jobsiteType: "Test Type",
    jobsiteStatus: "Test Status",
  })
);
const mockResetFields = jest.fn();
const mockSetFieldsValue = jest.fn();
const mockGetFieldsValue = jest.fn(() => ({}));

global.antdFormMocks = { mockValidateFields, mockResetFields, mockSetFieldsValue, mockGetFieldsValue };

jest.mock("antd", () => {
  const React = require("react");

  const fakeForm = {
    values: {},
    validateFields: global.antdFormMocks.mockValidateFields,
    resetFields: global.antdFormMocks.mockResetFields,
    setFieldsValue: global.antdFormMocks.mockSetFieldsValue,
    getFieldsValue: global.antdFormMocks.mockGetFieldsValue,
  };

  const useForm = () => [fakeForm];
  const useWatch = (name, form) => form?.values?.[name] || "";

  const Form = ({ children }) => <div>{children}</div>;
  Form.Item = ({ children }) => <div>{children}</div>;
  Form.useForm = useForm;
  Form.useWatch = useWatch;

  const Input = ({ allowClear, ...props }) => <input {...props} />;
  Input.TextArea = (props) => <textarea {...props} />;

  const Button = ({ children, onClick, ...props }) => (
    <button {...props} onClick={onClick}>{children}</button>
  );

  const Modal = ({ children, visible, open }) => {
    const isOpen = visible ?? open;
    return isOpen ? <div data-testid="modal">{children}</div> : null;
  };

  const Typography = {
    Title: ({ children }) => <h1>{children}</h1>,
    Text: ({ children }) => <span>{children}</span>,
  };

  const Row = ({ children }) => <div>{children}</div>;
  const Col = ({ children }) => <div>{children}</div>;
  const Space = ({ children }) => <div>{children}</div>;

  const Select = ({ children, value, onChange, "data-testid": dataTestId }) => (
    <div
      role="combobox"
      data-testid={dataTestId || "select"}
      data-value={value}
      onClick={() => onChange && onChange(value)}
    >
      {children}
    </div>
  );

  Select.Option = ({ children, value }) => (
    <div role="option" data-value={value}>
      {children}
    </div>
  );


const Table = ({ columns, dataSource, rowClassName }) => (
  <table>
    <thead>
      <tr>
        {columns?.map((c) => (
          <th key={c.key || c.dataIndex}>{c.title}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {dataSource?.map((row, index) => (
        <tr key={row.key} className={rowClassName ? rowClassName(row, index) : ""}>
          {columns?.map((c) => {
            const value = row[c.dataIndex];
            const content = c.render ? c.render(value, row, index) : value;
            return <td key={c.key || c.dataIndex}>{content}</td>;
          })}
        </tr>
      ))}
    </tbody>
  </table>
);

const Tag = ({ children, style }) => (
  <span style={style}>{children}</span>
);

  return { Form, Input, Button, Modal, Typography, Row, Col, Space, Select, Table ,Tag};
});

// Icons
jest.mock("@ant-design/icons", () => {
  const React = require("react");
  return new Proxy(
    {},
    {
      get: (_, prop) => (props) =>
        React.createElement("i", { "data-testid": `icon-${prop}`, ...props }),
    }
  );
});

// matchMedia mock
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// react-router-dom mock
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ children }) => <div>{children}</div>,
  Navigate: () => <div />,
  useNavigate: () => jest.fn(),
}));