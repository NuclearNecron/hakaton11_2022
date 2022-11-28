import React, {useState} from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { useDispatch } from "react-redux";
import {
    createAction_setSelectedDate,
    createAction_setSelectedDateActions
} from "../store/actionCreators/HomePageActionCreators";
import {PickersDay} from "@mui/x-date-pickers";
import {Badge} from "@mui/material";


export default function StaticDatePickerLandscape({ calendar_value, selected_day_actions, events, task_list }) {

    const dispatch = useDispatch()

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
                orientation="landscape"
                openTo="day"
                showToolbar={true}
                value={calendar_value}
                onChange={(newValue) => {
                    dispatch(createAction_setSelectedDate(`${newValue.$d}`));
                    // fix compare
                    console.log(selected_day_actions)
                    dispatch(createAction_setSelectedDateActions(selected_day_actions.filter(elem => elem.deadline === `${newValue.$d}`)));
                    console.log(selected_day_actions)
                }}
                renderInput={(params) => <TextField {...params} />}
                renderDay={(day, _value, DayComponentProps) => {
                    console.log(day.$D)
                    // console.log(_value)
                    // console.log(DayComponentProps)
                    const is_shown = day.$d === 'Sun Dec 25 2022 00:00:00 GMT+0300 (Москва, стандартное время)'
                    return (
                        <Badge key={day.toString()} overlap={"rectangular"}
                               badgeContent={day.$D === 20  ? 'Ok Лщ' : undefined}>
                            <PickersDay {...DayComponentProps} />
                        </Badge>
                    )
                }}
            />
        </LocalizationProvider>
    );
}