import { Button } from "antd/es/radio"
import '../App.css'
import { Table, Input, Space, Spin, Tag, Popconfirm, notification, Form, DatePicker, Modal, Select, Tooltip } from "antd"
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import moment from 'moment';

const TasksTable = (props) => {
    const {tasks, users, isLoading, handleDelete, showEditModal} = props;
    
    const columns = [
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>,
            sorter: (a, b) => moment(a.created_at).unix() - moment(b.created_at).unix(),
        },
        {
            title: 'Updated At',
            dataIndex: 'updated_at',
            key: 'updated_at',
            render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>,
            sorter: (a, b) => moment(a.updated_at).unix() - moment(b.updated_at).unix(),
        },
        {
          title: 'Assigned By',
          dataIndex: 'assign_user_name',
          key: 'assign_user_name',
          filters: users.map(user => ({
            text: `${user.first_name} ${user.last_name}`,
            value: user.id
          })),
          onFilter: (value, record) => record.asigned_by === value,
          sorter: (a, b) => a.asigned_by.localeCompare(b.asigned_by),
        },
        {
          title: 'Due Date',
          dataIndex: 'due_date',
          key: 'due_date',
          filters: Array.from(new Set(tasks.map(task => moment(task.due_date).format('YYYY-MM-DD')))).map(date => ({
            text: date !== 'Invalid date' ? moment(date).format('YYYY-MM-DD') : 'N/A',
            value: date !== 'Invalid date' ? date : '',
          })),
          filterMultiple: false,
          onFilter: (value, record) => moment(record.due_date).format('YYYY-MM-DD') === value,
          render: (text, record) => {
            const dueDate = moment(text);
            const isBeforeNow = dueDate.isBefore(moment(), 'day');
            
            return (
              <span>
                <div>{moment(text).format('YYYY-MM-DD')}</div>
                {record.status !== 'COMPLETED' && isBeforeNow && <Tag color="red">Overdue</Tag>}
              </span>
            );
          },
          sorter: (a, b) => moment(a.due_date).unix() - moment(b.due_date).unix(),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            filters: [
              { text: <Tag color="orange">NOT_STARTED</Tag>, value: 'NOT_STARTED' },
              { text: <Tag color="blue">IN_PROGRESS</Tag>, value: 'IN_PROGRESS' },
              { text: <Tag color="green">COMPLETED</Tag>, value: 'COMPLETED' }
            ],
            onFilter: (value, record) => record.status === value,
            sorter: (a, b) => a.status.localeCompare(b.status),
            render: (status) => {
              let color = '';
              switch (status) {
                case 'NOT_STARTED':
                  color = 'orange';
                  break;
                case 'IN_PROGRESS':
                  color = 'blue';
                  break;
                case 'COMPLETED':
                  color = 'green';
                  break;
                default:
                  break;
              }
              return <Tag color={color}>{status}</Tag>;
            },
          },
          
        {
          title: 'Detail',
          dataIndex: 'detail',
          key: 'detail',
          sorter: (a, b) => a.detail.localeCompare(b.detail),
        },
        {
          title: 'Actions',
          key: 'actions',
          align: 'center',
          render: (text, record) => (
            <Space size="small">
              <Popconfirm
                title="Are you sure you want to delete this task?"
                onConfirm={() => handleDelete(record.id)}
                okText="Yes"
                cancelText="No"
              >
                <Tooltip title="Delete">
                  <Button style={{ background: '#ff4d4f', borderColor: '#ff4d4f', marginRight: 8 }}>
                    <DeleteOutlined style={{ color: 'white' }} />
                  </Button>
                </Tooltip>
              </Popconfirm>
              <Tooltip title="Edit">
                <Button style={{ background: '#34ced9', borderColor: '#34ced9', marginRight: 8 }} onClick={() => showEditModal(record)}>
                    <EditOutlined style={{ color: 'white' }} />
                </Button>
              </Tooltip>
              
            </Space>
          ),
        },
          
      ];

      return(
        <div>
            {isLoading ? (
            <Spin tip="Loading...">
                <Table
                dataSource={[]}
                columns={columns.map(column => ({ ...column, align: 'center' }))}
                pagination={false}
                scroll={{y: "calc(100vh - 180px)"}}
            />
            </Spin>
            ) : (
            <Table
                dataSource={tasks}
                columns={columns.map(column => ({ ...column, align: 'center' }))}
                pagination={false}
                scroll={{y: "calc(100vh - 180px)"}}
            />)}
            
        </div>
        
      )
}
export default TasksTable