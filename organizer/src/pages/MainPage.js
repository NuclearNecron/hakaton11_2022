import React, {useEffect} from 'react'
import StaticDatePickerLandscape from "../components/MyCalendar";
import {Col, Row, Spinner} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import { fetchAllInfo } from "../store/middlewares/HomePageMiddleware";
import "../styles/HomePageStyles.css";
import MyList from "../components/MyList";
import Button from "@mui/material/Button";
import {useHistory} from "react-router";


function StartPage() {

    const userStatus = useSelector(state => state.cached_data.App.userAuthorized)
    const selected_date = useSelector(state => state.ui.HomePage.selectedDate)
    const selected_actions = useSelector(state => state.ui.HomePage.selectedDateActions)
    const loadingStatus = useSelector(state => state.ui.HomePage.loadingStatus)

    // пока загружаем все данные здесь

    const taskList = useSelector(state => state.cached_data.App.taskList)
    const events = useSelector(state => state.cached_data.App.events)
    const notes = useSelector(state => state.cached_data.App.notes)
    const bookmarks = useSelector(state => state.cached_data.App.bookmarks)

    const dispatch = useDispatch()

    const history = useHistory()

    useEffect(() => {

        // получаем данные
        dispatch(fetchAllInfo())

    }, [])

    return (
        <>
            {!userStatus ? <div style={{textAlign: "center", fontSize: "xx-large", fontWeight: 200, color: 'blue'}}>Пожалуйста авторизуйтесь! :)</div>:
                <>
                    <div className={"container"} style={{maxWidth: "100%", marginTop: '20px'}}>
                        {loadingStatus ? <div className={"hide-while-loading-page"}><Spinner animation={"border"}/></div>:
                            <>
                                <Row>
                                    <Col md={8} lg={6}>
                                        <StaticDatePickerLandscape selected_day_actions={selected_actions}
                                                                   calendar_value={selected_date}
                                                                   events={events} task_list={taskList}/>
                                    </Col>
                                    <Col>
                                        Что происходит в этот день:
                                    </Col>
                                </Row>
                                <Row md={3} sm={2} xs={1}>
                                    <Col>
                                        <div style={{fontSize: "larger", marginBottom: '5px', fontWeight: '400', color: 'blue'}}>Активные задачи:</div>
                                        <MyList props={taskList}/>
                                        <Button variant="contained"
                                                style={{alignItems: "center", marginTop: '5px'}}
                                                onClick={() => {
                                                        history.push('/tasks')
                                                    }
                                                }
                                        >
                                            Перейти к списку
                                        </Button>
                                    </Col>
                                    <Col>
                                        <div style={{fontSize: "larger", marginBottom: '5px', fontWeight: '400', color: 'blue'}}>Предстоящие события:</div>
                                        {/*<MyList props={events}/>*/}
                                        <Button variant="contained"
                                                style={{alignItems: "center", marginTop: '5px'}}
                                                onClick={() => {
                                                    history.push('/events')
                                                }
                                                }
                                        >
                                            Перейти к списку
                                        </Button>
                                    </Col>
                                    <Col>
                                        <div style={{fontSize: "larger", marginBottom: '5px', fontWeight: '400', color: 'blue'}}>Заметки:</div>
                                        {/*<MyList props={notes}/>*/}
                                        <Button variant="contained"
                                                style={{alignItems: "center", marginTop: '5px'}}
                                                onClick={() => {
                                                    history.push('/notes')
                                                }
                                                }
                                        >
                                            Перейти к списку
                                        </Button>
                                    </Col>
                                </Row>
                            </>
                        }
                    </div>
                </>
            }
        </>
    )
}

export default StartPage