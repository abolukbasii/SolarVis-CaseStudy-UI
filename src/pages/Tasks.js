import {React, useState, useEffect} from "react"
import { Table, Input, Space, Spin, Tag, Popconfirm, notification, Form, DatePicker, Modal, Select, Button } from "antd"
import { PlusOutlined } from '@ant-design/icons';
import { TaskService } from "../Service/TaskService";
import TasksTable from "../components/TasksTable";
import AdminTasksTable from "../components/AdminTasksTable";
import { UserService } from "../Service/UserService";
import { useForm } from "antd/es/form/Form";
import CreateTaskForm from "../components/CreateTaskForm";
import SuperAdminEditTask from "../components/SuperAdminEditTask";


const Tasks = ({isSidebarCollapsed}) =>{

    const taskService = new TaskService()
    const userService = new UserService()
    const [tasks, setTasks] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isModalVisible, setModalVisible] = useState(false);
    const [userRole, setUserRole] = useState()
    const [users, setUsers] = useState([])
    const [form2] = useForm()
    const [editForm] = useForm()
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editTask, setEditTask] = useState(null);

    const showEditModal = (record) => {
        setEditTask(record);
        setIsEditModalVisible(true);
    };
    const fetchTasks = async () => {
        try {
          const res = await taskService.getAllTasks();
          if (res.success) {
            setTasks(res.tasks)
            setUsers(res.users)
            setUserRole(res.userRole)
            setIsLoading(false)
          }
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
    };


    const showModal = () => {

        setModalVisible(true);
    };

    const handleDelete = async (taskId) => {
        try {
          const res = await taskService.deleteTask({"task_id": taskId});
          if (res.success) {
            notification.success({
                message: 'Success!',
                description: 'Task deleted successfully!',
              });
              fetchTasks()
          }
        } catch (error) {
            notification.error({
                message: 'Error!',
                description: error.response.data.detail,
              });
        }
      };


    useEffect(()=> {
        fetchTasks()
    },[])

    const handleCancel = () => {
        setModalVisible(false); 
        form2.resetFields()
        
    };

    const getFormValues = () => {
        const values = form2.getFieldsValue();
        if(values.assignedTo && values.detail && values.dueDate && values.status){
            const response = taskService.superAdminCreateTask(values);
            response.then(res => {
                if (res.success) {
                    notification.success({
                        message: 'Success!',
                        description: 'Task created successfully!',
                    });
                }
                setModalVisible(false)
                form2.resetFields()
                fetchTasks()
            })
        }
        else{
          notification.error({
              message: 'Error',
              description: 'Please fill all the required fields!',
            });
        }
        
      };
    const handleUpdateTask = async() =>{

        const values = editForm.getFieldsValue();
        
        if(values.assigned_to && values.detail && values.due_date && values.status){
            
            const task_id = editTask.id
            let data = { ...values, task_id }
            const response = taskService.superAdminUpdateTask(data);
            response.then(res => {
                if (res.success) {
                    notification.success({
                         message: 'Success!',
                        description: 'Task updated successfully!',
                    });
                }
                setIsEditModalVisible(false);
                editForm.resetFields()
                fetchTasks()
            })
        }
        else{
          notification.error({
              message: 'Error',
              description: 'Please fill all the required fields!',
            });
        }
        
    };

        

    
    return(
        <div className= {isSidebarCollapsed ? "container-collapsed" : "container"}>
            <div style={{height: "40px", display: "flex", alignItems: "center"}}>
                <h2 style={{margin: 0 }}>Tasks</h2>
                {userRole=="superadmin" && <div style={{ marginLeft: "auto", marginRight: "1em" }}>
                <Button
                    disabled={isLoading}
                    type="primary"
                    onClick={showModal}
                    style={{background: '#1890ff', borderColor: '#1890ff' }}
                    >
                    <PlusOutlined style={{ color: 'white' }} /> Create Task
                </Button>
                </div>}
            </div>
            <AdminTasksTable 
                tasks={tasks} isLoading={isLoading} userRole={userRole} users={users}
                handleDelete={handleDelete} showEditModal={showEditModal}
                >
                </AdminTasksTable>
                <CreateTaskForm isModalVisible = {isModalVisible} getFormValues = {getFormValues} 
                    handleCancel={handleCancel} form={form2} users={users} userRole={userRole}>
                </CreateTaskForm>
                <SuperAdminEditTask
                    isModalVisible={isEditModalVisible}
                    handleCancel={() => {; setEditTask(null); setIsEditModalVisible(false)}}
                    getFormValues={handleUpdateTask}
                    initialTask={editTask}
                    form={editForm}
                    users={users}
                    >
                </SuperAdminEditTask>
        </div>
    )


}

export default Tasks