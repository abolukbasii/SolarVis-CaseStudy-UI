import { Button } from "antd/es/radio"
import '../App.css'
import { useEffect, useState } from "react"
import { TaskService } from "../Service/TaskService"
import {notification, Form} from "antd"
import { PlusOutlined } from '@ant-design/icons';
import TasksTable from "../components/TasksTable"
import CreateTaskForm from "../components/CreateTaskForm"
import EditTask from "../components/EditTask"
const Dashboard = ({isSidebarCollapsed}) =>{
  
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [editTask, setEditTask] = useState(null);
  const showModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
      setModalVisible(false);
  };

  const handleDelete = async (taskId) => {
    try {
      const res = await taskService.deleteTask({"task_id": taskId});
      if (res.success) {
        notification.success({
            message: 'Success!',
            description: 'Task deleted successfully!',
          });
          fetchData()
      }
    } catch (error) {
        notification.error({
            message: 'Error!',
            description: error.response.data.detail,
          });
    }
  };

  const getFormValues = () => {
    const values = form.getFieldsValue();
    if(values.detail && values.dueDate && values.status){
      const response = taskService.userCreateTask(values);
      response.then(res => {
          if (res.success) {
              notification.success({
                  message: 'Success!',
                  description: 'Task created successfully!',
              });
          }
          setModalVisible(false);
          fetchData()
      })
    }
    else{
      notification.error({
          message: 'Error',
          description: 'Please fill all the required fields!',
        });
    }
    
  };
    
  const taskService = new TaskService
  const [tasks, setTasks] = useState([])
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalVisible, setModalVisible] = useState(false);
    
    
  const fetchData = async () => {
    try {
      const res = await taskService.getUserTasks();
      setIsLoading(false)
      if (res.success) {
        setTasks(res.tasks)
        setUsers(res.users)
      }
    } catch (error) {
      console.error('Error fetching user tasks:', error);
    }
  };

    useEffect(()=>{
        fetchData()
    },[])

    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    
    const showEditModal = (record) => {
      setEditTask(record);
      setIsEditModalVisible(true);
    };
      
    const handleUpdateTask = async() =>{

      const values = editForm.getFieldsValue();
      
      if(values.detail && values.due_date && values.status){
          
          const task_id = editTask.id
          let data = { ...values, task_id }
          const response = taskService.updateTask(data);
          response.then(res => {
              if (res.success) {
                  notification.success({
                       message: 'Success!',
                      description: 'Task updated successfully!',
                  });
              }
              setIsEditModalVisible(false);
              editForm.resetFields()
              fetchData()
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
            <h2 style={{margin: 0 }}>Your Tasks</h2>
              <div style={{ marginLeft: "auto", marginRight: "1em" }}>
              <Button
                    type="primary"
                    onClick={showModal}
                    style={{background: '#1890ff', borderColor: '#1890ff' }}
                    >
                    <PlusOutlined style={{ color: 'white' }} /> Create Task
                </Button>
              </div>
          </div>
          <TasksTable 
            tasks={tasks} users={users} isLoading={isLoading}
            handleDelete={handleDelete} showEditModal={showEditModal}
          >
          </TasksTable>
          <CreateTaskForm isModalVisible = {isModalVisible} getFormValues = {getFormValues} 
          handleCancel={handleCancel} form={form}>
          </CreateTaskForm>
          <EditTask
            isModalVisible={isEditModalVisible}
            handleCancel={() => {; setEditTask(null); setIsEditModalVisible(false)}}
            getFormValues={handleUpdateTask}
            initialTask={editTask}
            form={editForm}
            users={users}
            >
          </EditTask>
        </div>
        
    )

}

export default Dashboard