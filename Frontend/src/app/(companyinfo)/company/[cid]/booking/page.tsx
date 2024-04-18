'use client';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { FormEvent, FormEventHandler, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import createBooking from '@/libs/createBooking';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';

type FormDataSession = {
  company: string;
  date: string;
};

const fetcher = async ([url, token]: [string, string]): Promise<any> => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error('Failed to fetch data');
  return response.json();
};

export default function Booking({ params }: { params: { cid: string } }) {
  const [dateTime, setDateTime] = useState(dayjs('2022-05-10T15:30'));
  const [formData, setFormData] = useState<FormDataSession>({
    company: '',
    date: '',
  });
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileUpload = (files: File[]) => {
    if (files.length > 0) {
      setSelectedFileName(files[0].name);
      setSelectedFile(files[0]);
    }
  };

  const handleFileDelete = () => {
    setSelectedFileName(null);
    setSelectedFile(null);
  };

  const router = useRouter();
  const { data: session } = useSession();

  if (!session || !session.user.token) {
    return <p> Please Login to see the Company</p>;
  }

  // eslint-disable-next-line
  const { data: companyDetail, error: companyError } = useSWR(
    session?.user.token
      ? [
          `https://modlangtum-api.vercel.app/company/${params.cid}`,
          session.user.token,
        ]
      : null,
    fetcher
  );
  // const { data: userProfile, error: profileError } = useSWR(
  //   session?.user.token ? ['https://modlangtum-api.vercel.app/auth/me', session.user.token] : null, fetcher
  // );

  if (companyError) return <div>Failed to load data</div>;
  if (!companyDetail) return <div>Loading...</div>;

  // console.log(dateTime.toJSON());
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formData.company = companyDetail.data._id;
    formData.date = dateTime.toJSON();
    const { company, date } = formData;

    try {
      const response = await createBooking({
        company,
        date,
        token: session.user.token,
      });
      if (!response.success) {
        throw new Error('Failed to create booking');
      }
      alert('Booking created');
      router.push('/session');
    } catch (error) {
      // console.error('An unexpected error happened:', error);
      alert(
        "you can't reserve more than 3 booking, pleases delete one of your booking first"
      );
      router.push('/company');
    }
  };

  return (
    <main className="mx-20 my-28 rounded-3xl border p-14 shadow-inner">
      <h1 className="text-[30px] font-bold">{companyDetail.data.name}</h1>
      <div className="my-12 flex flex-row">
        <Image
          src={companyDetail.data.picture}
          alt="Company Image"
          width={0}
          height={0}
          sizes="100vw"
          className="h-fit w-[30%]"
        />
        <form onSubmit={handleSubmit} className="px-[3em] text-left">
          <div className="text-md mt-[15px] w-fit space-y-2 text-left text-black">
            Available Date
            <div className="flex w-fit flex-row justify-center space-x-5 space-y-2 rounded-lg px-10 py-5">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Date Time picker"
                  name="date"
                  defaultValue={dateTime}
                  value={dateTime}
                  onChange={(newValue) => {
                    newValue ? setDateTime(newValue) : null;
                  }}
                  minDate={dayjs('2022-05-10T')}
                  maxDate={dayjs('2022-05-13T23:59')}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div className="px-10-py-10 mb-3 flex w-screen space-x-5 text-center">
            <p className="text-md mt-2 w-fit text-left text-black">
              Upload Resume
            </p>
            <div className="relative">
              <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files)}
              />
              <label
                htmlFor="fileInput"
                className="cursor-pointer rounded-2xl bg-gray-200 px-10 py-2"
              >
                {selectedFileName ? selectedFileName : 'Upload File'}
              </label>
              <label
                className="ml-4 justify-center bg-white text-center text-3xl text-red-500"
                onClick={handleFileDelete}
              >
                {selectedFileName ? '-' : ''}
              </label>
            </div>
          </div>

          <button
            className="mt-2 inline h-[3em] w-[40vw] rounded-3xl bg-indigo-600 px-3 py-2 text-white shadow-sm hover:bg-indigo-800"
            type="submit"
            name="bookvaccine"
            id="bookvaccine"
            value="Book Vaccine"
          >
            Confirm
          </button>
        </form>
      </div>
    </main>
  );
}
