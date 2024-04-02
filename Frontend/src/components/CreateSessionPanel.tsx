'use client';
import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function CreateSessionPanel() {
  const [company, setCompany] = React.useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setCompany(event.target.value);
  };

  return (
    <div className="z-50 space-y-2 p-20 sm:ml-72">
      <div className="mb-5 border-b-2 p-5 text-5xl">Create Session</div>
      <div className="flex h-full flex-col items-center bg-white px-3">
        <form className="mt-5">
          <div className="mb-3">
            <label className="mb-2 block flex flex-col text-sm font-medium text-gray-900">
              Company name
              <FormControl sx={{ m: 0, mt: 1, minWidth: 120 }}>
                <Select
                  value={company}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </label>
          </div>
          <div className="mb-3">
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Username
              <input
                type="text"
                id="phone"
                className="block w-full rounded-lg border border-gray-300 p-2.5 
                                            text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter username"
              />
            </label>
          </div>
          <div className="mb-3">
            <label className="mb-2 block flex flex-col text-sm font-medium text-gray-900">
              Date
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker className="bg-white" />
              </LocalizationProvider>
            </label>
          </div>
          <div className="mb-6 flex items-start">
            <label className="ms-2 flex flex-row text-sm font-medium text-gray-900 dark:text-gray-300">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="focus:ring-3 mr-2 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <div className="mt-1">
                I agree with the{' '}
                <a
                  href="#"
                  className="text-blue1 hover:underline dark:text-blue1"
                >
                  terms and conditions
                </a>
              </div>
            </label>
          </div>
          <div className="mb-6 flex items-start">
            <button
              name="submit"
              className="w-full rounded-3xl bg-blue-200 px-5 py-2.5 text-center 
                        text-sm font-medium text-white hover:bg-blue1"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
