import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, Tag, Select } from 'antd';
import moment from 'moment';

const { Option } = Select;

function TodoTable({ todos, addTodo, updateTodo, deleteTodo }) {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('Add Todo');
  const [form] = Form.useForm();
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [tableData, setTableData] = useState(todos);

  const handleModalCancel = () => {
    form.resetFields();
    setShowModal(false);
    setModalTitle('Add Todo');
    setEditingTodoId(null);
  };

  const handleAddTodoSubmit = values => {
    addTodo({
      ...values,
      key: Date.now(),
      created: moment().format(),
      status: 'OPEN',
    });
    form.resetFields();
    setShowModal(false);
    setTableData(prevTodos => [...prevTodos, { ...values, key: Date.now(), created: moment().format(), status: 'OPEN' }]);
  };

  const handleEditTodoSubmit = values => {
    updateTodo(editingTodoId, values);
    form.resetFields();
    setShowModal(false);
    setEditingTodoId(null);
    setTableData(prevTodos =>
      prevTodos.map(todo => {
        if (todo.key === editingTodoId) {
          return { ...todo, ...values };
        }
        return todo;
      })
    );
  };

  const handleTableDelete = id => {
    Modal.confirm({
      title: 'Are you sure you want to delete this todo?',
      onOk() {
        deleteTodo(id);
        setTableData(prevTodos => prevTodos.filter(todo => todo.key !== id));
      },
    });
  };

  const columns = [
    {
      title: 'Created',
      dataIndex: 'created',
      sorter: (a, b) => moment(a.created).unix() - moment(b.created).unix(),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: text => <span style={{ fontWeight: 'bold' }}>{text}</span>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      sorter: (a, b) => a.description.localeCompare(b.description),
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      sorter: (a, b) => moment(a.dueDate).unix() - moment(b.dueDate).unix(),
      render: text => (text ? moment(text).format('MMM DD, YYYY') : '-'),
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      render: tags => (
        <>
          {tags && tags.map(tag => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      ),
      filters: [
        { text: 'Important', value: 'Important' },
        { text: 'Urgent', value: 'Urgent' },
        { text: 'Personal', value: 'Personal' },
      ],
      onFilter: (value, record) => record.tags.includes(value),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: status => {
        let color;
        switch (status) {
          case 'OPEN':
            color = 'blue';
            break;
            case 'WORKING':
            color = 'orange';
            break;
            case 'DONE':
            color = 'green';
            break;
            case 'OVERDUE':
            color = 'red';
            break;
            default:
            color = 'gray';
            }
            return <Tag color={color}>{status}</Tag>;
            },
            filters: [
            { text: 'Open', value: 'OPEN' },
            { text: 'Working', value: 'WORKING' },
            { text: 'Done', value: 'DONE' },
            { text: 'Overdue', value: 'OVERDUE' },
            ],
            onFilter: (value, record) => record.status === value,
            },
            {
            title: 'Actions',
            dataIndex: 'actions',
            render: (_, record) => (
            <>
            <Button type="primary" style={{ marginRight: 8 }} onClick={() => {
            setModalTitle('Edit Todo');
            setEditingTodoId(record.key);
            form.setFieldsValue({ title: record.title, description: record.description, dueDate: record.dueDate, tags: record.tags });
            setShowModal(true);
            }}>
            Edit
            </Button>
            <Button type="danger" onClick={() => handleTableDelete(record.key)}>
            Delete
            </Button>
            </>
            ),
            },
            ];
            
            return (
            <>
            <div style={{ marginBottom: 16 }}>
            <Button type="primary" onClick={() => setShowModal(true)}>
            Add Todo
            </Button>
            <Input.Search placeholder="Search Todos" style={{ marginLeft: 16, width: 200 }} />
            </div>
            <Table dataSource={tableData} columns={columns} pagination={{ pageSize: 10 }} />
            
              {/* Add / Edit Todo Modal */}
              <Modal visible={showModal} title={modalTitle} onCancel={handleModalCancel} footer={null}>
                <Form layout="vertical" form={form} onFinish={editingTodoId ? handleEditTodoSubmit : handleAddTodoSubmit}>
                  <Form.Item name="title" rules={[{ required: true, max: 100, message: 'Title is required and should be less than 100 characters.' }]}>
                    <Input placeholder="Title" />
                  </Form.Item>
                  <Form.Item name="description" rules={[{ required: true, max: 1000, message: 'Description is required and should be less than 1000 characters.' }]}>
                    <Input.TextArea placeholder="Description" autoSize={{ minRows: 3, maxRows: 5 }} />
                  </Form.Item>
                  <Form.Item name="dueDate">
                    <DatePicker placeholder="Due Date" style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item name="tags">
                    <Select mode="tags" placeholder="Tags" style={{ width: '100%' }} >
                    <Option key="Important">Important</Option>
              <Option key="Urgent">Urgent</Option>
              <Option key="Personal">Personal</Option>
              </Select>
                  </Form.Item>
                  <Form.Item name="status" initialValue="OPEN">
                    <Select placeholder="Status">
                      <Option value="OPEN">Open</Option>
                      <Option value="WORKING">Working</Option>
                      <Option value="DONE">Done</Option>
                      <Option value="OVERDUE">Overdue</Option>
                    </Select>
                  </Form.Item>
                  <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
                    {editingTodoId ? 'Update' : 'Add'}
                  </Button>
                  <Button onClick={handleModalCancel}>Cancel</Button>
                </Form>
              </Modal>
            </>
            );
            }
            
            export default TodoTable;