import React, {useState} from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { ruRU } from "@mui/material/locale";

const isWeekend = (date) => {
    const day = date.day();

    return day === 0 || day === 6;
};

export default function StaticDatePickerLandscape() {
    const [value, setValue] = useState(dayjs(new Date()));

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ruRU}>
            <StaticDatePicker
                orientation="landscape"
                openTo="day"
                value={value}
                // shouldDisableDate={isWeekend}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}