'use client';
import { useState, useEffect, FormEvent } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import getSessionById from '@/libs/getSessionById';
import useSWR from 'swr';
import updateSessionById from '@/libs/updateSessionById';
import Image from 'next/image';

const fetcher = async ([key, token, session_id]: [string, string, string]) => {
  try {
    const res = await getSessionById(token, session_id);
    if (!res.data) throw new Error('No data returned');
    const data = Array.isArray(res.data) ? res.data[0] : res.data;
    return data;
  } catch (error) {
    console.error('Failed to fetch session:', error);
    throw error;
  }
};
function SessionEdit({
  token,
  session_id,
}: {
  token: string;
  session_id: string;
}) {
  const [dateTime, setDateTime] = useState(dayjs());
  const {
    data: session,
    isLoading,
    error,
  } = useSWR(
    token && session_id ? [`sessionKey`, token, session_id] : null,
    fetcher
  );
  if (error) {
    return <div className="ml-72">Failed to load session data.</div>;
  }
  if (isLoading || !session) {
    return <div className="ml-72">Loading session data...</div>;
  }

  const sessionDate = session && session.date ? dayjs(session.date) : dateTime;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await updateSessionById({
        token: token,
        session_id: session_id,
        date: dateTime.toISOString(),
      });
      if (!response.success) {
        throw new Error('Failed to update session');
      }
      alert('Session updated successfully');
      window.location.href = '/session';
    } catch (error) {
      console.error('Failed to update session:', error);
      alert('you need to reserve between 2022-05-10 and 2022-05-13');
    }
  };
  console.log(session);

  return (
    <div className="z-50 space-y-2 p-20 sm:ml-72">
      <div className="mb-10 flex items-center justify-between border-b-2">
        <div className="p-5 text-5xl">Edit Session</div>
      </div>
      <div className="flex flex-row flex-wrap overflow-hidden rounded-3xl border p-12 shadow-inner">
        <Image
          src={session.company.picture}
          alt="Company Image"
          width={0}
          height={0}
          sizes="100vw"
          className="min-w[100px] h-fit w-[300px]"
        />
        <div className="mx-[4%] w-[400px] items-start text-left">
          <div>
            <h2 className="text-lg font-medium">Session Details</h2>
            <p>Company: {session.company.name}</p>
            <p>Old Date: {new Date(session.date).toLocaleString()}</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="text-md mt-[15px] w-fit space-y-2 text-left text-black">
              Available Date
              <div className="flex w-full flex-row justify-center space-x-5 space-y-2 rounded-lg px-10 py-5">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Date Time picker"
                    name="date"
                    defaultValue={sessionDate}
                    value={sessionDate}
                    onChange={(newValue) => {
                      newValue ? setDateTime(newValue) : null;
                    }}
                    minDate={dayjs('2022-05-10T')}
                    maxDate={dayjs('2022-05-13T23:59')}
                  />
                </LocalizationProvider>
              </div>
            </div>

            <button
              className="mt-2 inline h-[3em] w-[30vw] min-w-[10vw] rounded-3xl bg-indigo-600 px-3 py-2 text-white shadow-sm hover:bg-indigo-800"
              type="submit"
            >
              Confirm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default SessionEdit;
