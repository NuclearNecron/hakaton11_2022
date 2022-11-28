import {Button, Card} from "react-bootstrap";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createAction_setTaskList} from "../store/actionCreators/AppActionCreators";
import {Modal, Select} from "@mui/material";
import Box from "@mui/material/Box";
import Option from '@mui/joy/Option';
import TextField from "@mui/material/TextField";
import SelectUnstyled from "@mui/base/SelectUnstyled";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DatePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    disable: 'inline-block',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const TaskCard = (task) => {

    const statuses = useSelector(state => state.cached_data.App.statuses)
    const [status, setStatus] = useState(3)
    const [CompValue, setCompValue] = useState()
    const [DeadlineValue, setDeadlineValue] = useState(new Date())
    const [TextFieldValue, setTextFieldValue] = useState('')
    const [open, setOpen] = useState(false);
    const [DescTextFieldValue, setDescTextFieldValue] = useState('')


    const taskList = useSelector(state => state.cached_data.App.taskList)
    const dispatch = useDispatch()

    let color = '';
    if (task.task.status.status_name === 'ЗЗавершено') color = 'lightgreen'
    else if (task.task.status.status_name === '') color = 'lightcoral'
    else if (task.task.status.status_name === '') color = 'lightgoldenrodyellow'

    return <Card style={{backgroundColor: `${color}`}}>
        <Card.Body>
            <Card.Title>{task.task.task}</Card.Title>
            <div className={"task-info"}>
                <div className={"task-status"}>
                    Статус: {task.task.status.status_name}
                </div>
                <div className={"task_creation_date"}>
                    Дата создания: {task.task.creation_date}
                </div>
                <div className={"task_deadline"}>
                    Срок исполнения: {task.task.deadline}
                </div>
                {task.task.completion_date?
                    <div className={"task_completion_date"}>
                        Дата завершения: {task.task.completion_date}
                    </div>
                :undefined}
                <div className={"task_description"}>
                    Комментарий: {task.task.desc}
                </div>
                <div className={'task-interaction'}
                     style={{display: "flex", justifyContent: "space-around", marginTop: '10px'}}
                >
                    <Button id={task.task.id} onClick={event => {
                        event.preventDefault()
                        // открыть модальноe окно для редактирование
                        setOpen(true)
                    }
                    }>Изменить</Button>
                    <Modal
                        open={open}
                        onClose={() => {setOpen(false)}}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style} style={{gap: '10px', }}>
                            <div>
                                Задание: <input value={TextFieldValue} placeholder={''} onChange={(event => setTextFieldValue(event.target.value))}/>
                            </div>
                            <div>
                                Крайний срок выполнения: <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Basic example"
                                        value={DeadlineValue}
                                        onChange={(newValue) => {
                                            setDeadlineValue(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </div>
                            <div>
                                Дата сдачи: <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Basic example"
                                    value={CompValue}
                                    onChange={(newValue) => {
                                        setCompValue(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                            </div>
                            <div>
                                Комментарий: <input value={DescTextFieldValue} placeholder={''} onChange={(event => setDescTextFieldValue(event.target.value))}/>
                            </div>
                            <div>
                                Статус: <input value={status} onChange={(event => setStatus(event.target.value))}/>
                            </div>
                            <div>
                                <Button id={task.task.id} onClick={(event) => {
                                    event.preventDefault()
                                    const data_to_send = {
                                        "status": status,
                                        "task": TextFieldValue,
                                        "creation_date": new Date().toISOString().split('T')[0],
                                        "deadline": new Date(DeadlineValue).toISOString().split('T')[0],
                                        "desc": DescTextFieldValue
                                    }
                                    fetch(`http://192.168.184.184:8000/POSTtasks/${event.target.id - 0}/`,{
                                        method: 'PUT',
                                        headers:{
                                            'Content-Type':'application/json'
                                        },
                                        body: JSON.stringify(data_to_send)
                                    })
                                        .then((response) => {
                                            console.log(response)
                                            console.log(data_to_send)
                                        })
                                        .catch((reason) => {
                                            console.log(reason)
                                            console.log(data_to_send)
                                        })
                                }
                                }>Применить</Button>
                            </div>
                        </Box>
                    </Modal>
                    <Button id={task.task.id} onClick={event => {
                        event.preventDefault()
                        fetch(`http://192.168.184.184:8000/POSTtasks/${event.target.id - 0}/`, {
                            method: "DELETE"
                        })
                        dispatch(createAction_setTaskList(taskList.filter(elem => elem.task.id !== event.target.id - 0)))
                    }
                    }>Удалить</Button>
                </div>
            </div>
        </Card.Body>
    </Card>
}

export default TaskCard;
