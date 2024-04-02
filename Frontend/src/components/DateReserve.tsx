'use client';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Select, MenuItem } from '@mui/material';
import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

export default function DateReserve() {
  //const [reserveDate, setReserveDate] = useState(null);
  // const [location, setLocation] = useState('001');
  const [dateTime, setDateTime] = useState(dayjs('2022-05-10T15:30'));

  return (
    <div className="flex w-fit flex-row justify-center space-x-5 space-y-2 rounded-lg px-10 py-5">
      {/* <Select variant="standard" value={location} name="company" id="company" 
            className="py-6 h-[2em] w-[200px]" 
            onChange={ (e)=>setLocation(e.target.value)}>
                <MenuItem value="001">Company 1</MenuItem>
                <MenuItem value="002">Company 2</MenuItem>
                <MenuItem value="003">Company 3</MenuItem>
            </Select> */}

      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className="bg-white" value={reserveDate} onChange={ (value)=>setReserveDate(value) }/>
            </LocalizationProvider> */}

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label="Date Time picker"
          defaultValue={dateTime}
          value={dateTime}
          onChange={(newValue) => {
            newValue ? setDateTime(newValue) : setDateTime(dateTime);
          }}
        />
      </LocalizationProvider>
    </div>
  );
}
