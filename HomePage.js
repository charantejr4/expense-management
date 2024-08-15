import React, { useState,useEffect } from 'react';
import { Modal, Form, Input, Select, message, Table } from 'antd';
import Layout from '../components/layout/Layout';
import axios from 'axios';
import Spinner from '../components/layout/Spinner';

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading,setloading]=useState(false);
  const [AllTransaction,setAllTransactions]=useState([])

  //table data
  const columns=[
    {
      title:'Date',
      dataIndex:'date'
    },
    {
      title:"Amount",
      dataIndex:'amount'
    },
    {
      title:"Type",
      dataIndex:'type'
    },
    {
      title:"Category",
      dataIndex:'category'
    },
    {
      title:"References",
      dataIndex:'reference'
    },
    {
      title:"Actions",
    },

  ]
//getall transactions
const getAllTransaction=async()=>{
  try {
    const user=JSON.parse(localStorage.getItem('user'));
    setloading(true);
    const res = await axios.post('/transactions/get-transaction',{userid: user._id});
    setloading(false);
    setAllTransactions(res.data);
    console.log(res.data);
  } catch (error) {
    console.log(error);
    message.error("Tech Issue With Transaction");
  }
};

  useEffect(()=>{
    getAllTransaction();
  }, [])

  const handleSubmit = async(values) => {
    try {
      const user=JSON.parse(localStorage.getItem('user'));
      setloading(true);
      await axios.post('/transactions/add-transaction',{...values, userid:user._id});
      setloading(false);
      message.success('Transaction Added Successfully');
      setShowModal(false);
    } catch (error) {
      setloading(false);
      message.error('Failed to add the transaction');
    }
  };

  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters">
        <div>range filters</div>
        <div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>Add New</button>
        </div>
      </div>
      <div className="content">
        <Table columns={columns} dataSource={AllTransaction} />
      </div>
      <Modal
        title="Add Transaction"
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Amount" name="amount">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movies">Movie</Select.Option>
              <Select.Option value="bills">Bill</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="tax">Tax</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Reference" name="reference">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">SAVE</button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
 