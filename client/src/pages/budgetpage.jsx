import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Form, Input, message, Modal, Select, Table, DatePicker } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Budget from "../components/budget/budget";
import axios from "axios";
import Spinner from "../components/spinner";
import moment from "moment";
import Analytics from "../components/Analytics/Analytics";
const { RangePicker } = DatePicker;

const BudgetPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);
  
  // Table data
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined
            className="mx-2"
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];

  // Get all transactions
  var { currentUser} = useSelector((state) => state.user);
  
  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        setLoading(true);
        const res = await axios.post("/api/v1/budget/get-btransaction", {
          userid: currentUser._id,
          frequency,
          selectedDate,
          type,
        });
        setAllTransaction(res.data);
        setLoading(false);
      } catch (error) {
        message.error("Error fetching transactions");
      }
      
    };
    getAllTransactions();
  }, [frequency, selectedDate, type, currentUser._id]);

  // Delete handler
  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post("/api/v1/budget/delete-btransaction", {
        transactionId: record._id,
      });
      setLoading(false);
      message.success("Transaction Deleted!");
    } catch (error) {
      setLoading(false);
      console.error(error);
      message.error("Unable to delete");
    }
    window.location.reload(false);
  };

  // Form handling
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      if (editable) {
        await axios.post("/api/v1/budget/edit-btransaction", {
          payload: {
            ...values,
            userId: currentUser._id,
          },
          transactionId: editable._id,
        });
        setLoading(false);
        message.success("Transaction Updated Successfully");
      } else {
        await axios.post("/api/v1/budget/add-btransaction", {
          ...values,
          userid: currentUser._id,
        });
        setLoading(false);
        message.success("Transaction Added Successfully");
      }
      setShowModal(false);
      setEditable(null);
    } catch (error) {
      setLoading(false);
      message.error("Please fill all fields");
    }
    window.location.reload(false);
  };

  return (
    <div>
    <Budget />
      {loading && <Spinner />}
      <div className="filters">
        <div>
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(value) => setFrequency(value)}>
            <Select.Option value="-7">Next 1 Week</Select.Option>
            <Select.Option value="-30">Next 1 Month</Select.Option>
            <Select.Option value="-365">Next 1 Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(value) => setSelectedDate(value)}
            />
          )}
        </div>
        <div className="filter-tab ">
          <h6>Select Type</h6>
          <Select value={type} onChange={(value) => setType(value)}>
            <Select.Option value="all">ALL</Select.Option>
            <Select.Option value="income">INCOME</Select.Option>
            <Select.Option value="expense">EXPENSE</Select.Option>
          </Select>
        </div>
        
        <div>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Add Transaction
          </button>
        </div>
      </div>
      <div className="content">
        {viewData === "table" ? (
          <Table columns={columns} dataSource={allTransaction} />
        ) : (
          <Analytics allTransaction={allTransaction} />
        )}
      </div>
      <Modal
        title={editable ? "Edit Transaction" : "Add Transaction"}
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={editable}
        >
          <Form.Item label="Amount" name="amount" rules={[{ required: true }]}>
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Type" name="type" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="tax">TAX</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item label="Reference" name="reference">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[{ required: true }]}>
            <Input type="text" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default BudgetPage;
