import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchTaskListInfo} from "../store/TaskListSlice";
import {Button, Col, Row, Spinner} from "react-bootstrap";
import TaskCard from "../components/TaskCard";
import {fetchStatusesInfo} from "../store/middlewares/AppMeddlewares";
import {fetchTaskListStatusesInfo} from "../store/TaskListSlice";
import  store from "../store/store"
import {Modal} from "@mui/material";
import Box from "@mui/material/Box";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import {createAction_setTaskList} from "../store/actionCreators/AppActionCreators";
import {useHistory} from "react-router";


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

function TaskListPage() {

    const userStatus = useSelector(state => state.cached_data.App.userAuthorized)

    const loadingStatus = useSelector(state => state.ui.TaskListPage.loadingStatus)

    const taskList = useSelector(state => state.cached_data.App.taskList)

    const history = useHistory()

    const statuses = useSelector(state => state.cached_data.App.statuses)
    const [status, setStatus] = useState(3)
    const [newValue, setNewValue] = useState(new Date())
    const [CompValue, setCompValue] = useState()
    const [DeadlineValue, setDeadlineValue] = useState(new Date())
    const [TextFieldValue, setTextFieldValue] = useState('')
    const [open, setOpen] = useState(false);
    const [DescTextFieldValue, setDescTextFieldValue] = useState('')


    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(fetchTaskListStatusesInfo())

    }, [])

    return (
        <>
            {!userStatus ? <div style={{textAlign: "center", fontSize: "xx-large", fontWeight: 200, color: 'blue'}}>Пожалуйста авторизуйтесь! :)</div>:
                <>
                    {loadingStatus ? <div className={"hide-while-loading-page"}><Spinner animation={"border"}/></div> :
                        <>
                            {/*Форма для добавления новых тасков*/}
                            <Button onClick={event => {
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
                                        <Button onClick={(event) => {
                                            event.preventDefault()
                                            const data_to_send = {
                                                "status": status,
                                                "task": TextFieldValue,
                                                "creation_date": new Date().toISOString().split('T')[0],
                                                "completion_date": new Date().toISOString().split('T')[0],
                                                "deadline": new Date(DeadlineValue).toISOString().split('T')[0],
                                                "desc": DescTextFieldValue
                                            }
                                            // setOpen(false)
                                            // history.push('/tasks')
                                            fetch(`http://192.168.184.184:8000/POSTtasks/`,{
                                                method: 'POST',
                                                headers:{
                                                    'Content-Type':'application/json'
                                                },
                                                body: JSON.stringify(data_to_send)
                                            })
                                                .then((response) => {
                                                    console.log(response)
                                                    console.log(data_to_send)
                                                    fetch(`http://192.168.184.184:8000/POSTtasks?name=${data_to_send.task}`, {
                                                        method: "GET"
                                                    })
                                                        .then(response => {
                                                            console.log(response.json())
                                                        })

                                                })
                                                .catch((reason) => {
                                                    console.log(reason)
                                                    console.log(data_to_send)
                                                })
                                            setOpen(false)
                                            history.push('/tasks')
                                        }
                                        }>Применить</Button>
                                    </div>
                                </Box>
                            </Modal>
                            {taskList.length === 0 ? undefined:
                                <>
                                    <div style={{textAlign: "center",
                                        fontSize: "xx-large",
                                        fontWeight: 300,
                                        color: "blue"}}>Список задач:</div>
                                    <Row xs={1} md={2} sm={1} lg={3} className="grid"
                                         style={{justifyContent: "center"}}>
                                        {taskList.map((elem, index) => {
                                            return (
                                                <Col key={index}>
                                                    <TaskCard {...elem}/>
                                                </Col>
                                            )
                                        })}
                                    </Row>
                                </>
                            }
                        </>
                    }
                </>
            }
        </>
    )
}

export default TaskListPage