import {TextField,Grid, Button,InputLabel,MenuItem,FormControl,Select} from "@mui/material"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import {useNavigate} from "react-router-dom"
import {useDispatch} from 'react-redux'
import { addTask } from "../store/slices/TodoSlice";



export default function Todo(){

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [taskId,setTaskId]=useState('');
    const [taskName,setTaskName]=useState('');
    const [assignDate,setAssignDate]=useState('');
    const [finishDate,setFinishDate]=useState('');
    const [assignTo,setAssignTo]=useState('');
    const [picture,setPicture]=useState('');
    const [status,setStatus]=useState('');


    var body = {taskid: taskId, taskname: taskName, assigndate: assignDate, finishdate: finishDate, assignto: assignTo, picture: picture, status: status}

    const handleSubmit=()=>{
        dispatch(addTask([taskId,body]))
    }

    const handlePicture=(event)=>{
        setPicture(URL.createObjectURL(event.target.files[0]))
    }

    const handleShow=()=>{
        navigate('/showtodo')
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

    return(
    <div style={{width:'100%',height:'100vh',display:'flex',alignItems:'center',flexDirection:'column',marginTop:50}}>
        <div style={{width:500, height:'auto',padding:10,border:'2px solid black'}}>
            <Grid container spacing={2}>
                <Grid item xs={12} style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                    <h1>TODO-LIST</h1>
                    <h2>Add Task</h2>
                </Grid>
                <Grid item xs={6}>
                    <TextField onChange={(e)=>setTaskId(e.target.value)}  label="Task Id" fullWidth />
                </Grid>
                <Grid item xs={6} >
                    <TextField onChange={(e)=>setTaskName(e.target.value)}  label="Task Name" fullWidth />
                </Grid>
                <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker label="Assign Date"  onChange={handleAssignDate} />
                    </DemoContainer>
                </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker label="Finish Date" onChange={handleFinishDate}/>
                        </DemoContainer>
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                    <TextField onChange={(e)=>setAssignTo(e.target.value)}  label="Assign To" fullWidth />
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
                            onChange={(e)=>setStatus(e.target.value)}
                        >
                            <MenuItem value="Not Completed">Not Completed</MenuItem>
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                </FormControl>
                </Grid>
                <Grid item xs={12} >
                    <Button variant="contained" fullWidth onClick={handleSubmit} style={{marginBottom:15}}>Add Task</Button>
                    <Button variant="contained" fullWidth onClick={handleShow}>Show Tasks</Button>
                </Grid>
            </Grid>
            
        </div>
    </div>)
}