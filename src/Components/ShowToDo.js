import MaterialTable from "@material-table/core"
import { TextField,Grid,Button, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, Select, InputLabel,MenuItem} from "@mui/material"
import { useState } from "react"
import {useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/material/styles';
import Swal from "sweetalert2"
import { editTask, removeTask } from "../store/slices/TodoSlice"


export const ShowToDo=()=>{

    var data = useSelector((state)=>{
        return state.todolist
    })
    var toDoData = Object.values(data)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    
    const [taskId,setTaskId]=useState('');
    const [taskName,setTaskName]=useState('');
    const [assignDate,setAssignDate]=useState('');
    const [finishDate,setFinishDate]=useState('');
    const [assignTo,setAssignTo]=useState('');
    const [picture,setPicture]=useState('');
    const [status,setStatus]=useState('');
    const [refresh,setRefresh]=useState(false)
    const [open,setOpen]=useState(false);



    var body = {taskid: taskId, taskname: taskName, assigndate: assignDate, finishdate: finishDate, assignto: assignTo, picture: picture, status: status}


    const handleSubmit=()=>{
        dispatch(editTask([taskId,body]))
    }

    const handlePicture=(event)=>{
        setPicture(URL.createObjectURL(event.target.files[0]))
    }


    function handleDialog(rowData){
        setOpen(true)
        setTaskId(rowData.taskid)
        setTaskName(rowData.taskname)
        setAssignDate(rowData.assigndate)
        setFinishDate(rowData.finishdate)
        setAssignTo(rowData.assignto)
        setPicture(rowData.picture)
        setStatus(rowData.status)
    }
    const handleDelete=(rowData)=>{
        Swal.fire({
            title: "Do you want to delete this todo item?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `Don't delete`
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              dispatch(removeTask([taskId,body]))
              Swal.fire("Deleted!", "", "success");
              
            } 
            else if (result.isDenied) {
              Swal.fire("Your Record is Saved", "", "info");
            }
            setRefresh(!refresh)
          });
          
    }

    function handleClose(){
        setOpen(false)
    }

    const handleAssignDate=(date)=>{
        const date1 = new Date(date)
        let day = date1.getDay()
        let newDate = date1.getDate()
        let month = date1.getMonth()
        let year = date1.getFullYear()
        
        const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
        const months = ['Jan','Feb', 'Mar', 'Apr', 'May', 'June', 'July','Aug','Sep','Oct','Nov','Dec']
        
        setAssignDate(`${days[day]}, ${newDate} ${months[month]} ${year}`)
        
    }

    const handleFinishDate=(date)=>{
        const date1 = new Date(date)
        let day = date1.getDay()
        let newDate = date1.getDate()
        let month = date1.getMonth()
        let year = date1.getFullYear()
        
        const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
        const months = ['Jan','Feb', 'Mar', 'Apr', 'May', 'June', 'July','Aug','Sep','Oct','Nov','Dec']
        
        setFinishDate(`${days[day]}, ${newDate} ${months[month]} ${year}`)
        
    }

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 4,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        width: 1,
      });

      

    const EditToDoDialog=()=>{
        return(<Dialog 
        open={open}
        onClose={handleClose}
        >
            <DialogTitle>
                Edit Todo
            </DialogTitle>
            <DialogContent>
            <div style={{width:500, height:'auto',padding:10,border:'2px solid black'}}>
            <Grid container spacing={2}>
                <Grid item xs={12} style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                    <h1>TODO-LIST</h1>
                    <h2>Edit Task</h2>
                </Grid>
                <Grid item xs={6}>
                    <TextField value={taskId} onChange={(e)=>setTaskId(e.target.value)}  label="Task Id" fullWidth />
                </Grid>
                <Grid item xs={6} >
                    <TextField value={taskName} onChange={(e)=>setTaskName(e.target.value)}  label="Task Name" fullWidth />
                </Grid>
                <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker label="Assign Date"   onChange={handleAssignDate} />
                    </DemoContainer>
                </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker label="Finish Date"  onChange={handleFinishDate}/>
                        </DemoContainer>
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                    <TextField value={assignTo} onChange={(e)=>setAssignTo(e.target.value)}  label="Assign To" fullWidth />
                </Grid>
                <Grid item xs={6} style={{display:'flex',alignItems:'center',justifyItems:'center'}}>
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    fullWidth
                    >
                    Upload Picture
                    <VisuallyHiddenInput type="file" accept="images/*" onChange={(event)=>handlePicture(event)} />
                    </Button>
                </Grid>
                <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-autowidth-label">Status</InputLabel>
                        <Select
                            label="Status"
                            value={status}
                            onChange={(e)=>setStatus(e.target.value)}
                        >
                            <MenuItem value="Not Completed">Not Completed</MenuItem>
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                </FormControl>
                </Grid>
            </Grid>
            
        </div>
        </DialogContent>
                <DialogActions>
                <Button onClick={handleSubmit}>Edit Data</Button>
                <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            
        </Dialog>)
    }

    function ShowAllTodoItems() {
        return (
          <MaterialTable
            title="TODO LIST"
            columns={[
              { title: 'Task Id', field: 'taskid' },
              { title: 'Task Name', field: 'taskname' },
              { title: 'Assign Date', field: 'assigndate' },
              { title: 'Finish Date', field: 'finishdate' },
              { title: 'Assign To', field: 'assignto' },
              { title: 'Picture', field: 'picture',render:(rowData)=><><img src={`${rowData.picture}`}  style={{width:60,height:60,borderRadius:30}}/></> },
              { title: 'Status', field: 'status' },
            ]} 
            data={toDoData}       
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Task',
                onClick: (event, rowData) => handleDialog(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete Task',
                onClick: (event, rowData) => handleDelete(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add New Task',
                isFreeAction: true,
                onClick: (event) => navigate('/todo')
              },
              
            ]}
          />
        )
      }
    return(
    <div style={{width:'100%',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{width:'auto',height:'auto'}}>
            {ShowAllTodoItems()}
            {EditToDoDialog()}
        </div>
    </div>)
}