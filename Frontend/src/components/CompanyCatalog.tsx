import { getServerSession } from 'next-auth';
import Card from './Card';
import { Link, TextField } from '@mui/material';
import getUserProfile from '@/libs/getUserProfile';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function CompanyCatalog({
  allCompanyJson,
}: {
  allCompanyJson: Promise<CompanyJson>;
}) {
  const allCompanyJsonReady = await allCompanyJson;

  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) {
    alert('Please Login');
    redirect('/auth/login');
  }

  return (
    <>
      <div className="flex w-[100%] flex-row justify-between">
        <h1 className="order-first text-[35px] font-bold">Company List</h1>
        <TextField
          className="order-last mt-[20px] w-[25%]"
          label="Company Name"
          name="companyName"
          id="companyName"
          placeholder="Company Name"
          size="small"
          InputProps={{
            style: {
              borderRadius: '10px',
            },
          }}
        />
      </div>
      <div className="grid grid-cols-1 gap-8 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {allCompanyJsonReady.data.map((companyItem: CompanyItem) => (
          <Link
            key={companyItem.id}
            href={`/company/${companyItem.id}`}
            className="block overflow-hidden rounded-lg bg-white shadow-lg hover:bg-gray-100"
          >
            <Card companyName={companyItem.name} imgSrc={companyItem.picture} />
          </Link>
        ))}
      </div>
    </>
  );
}
