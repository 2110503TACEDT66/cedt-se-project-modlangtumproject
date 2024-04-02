import Image from 'next/image';
import getCompany from '@/libs/getCompany';
import Link from 'next/link';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export default async function CompanyDetailPage({
  params,
}: {
  params: { cid: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.token) {
    return <p> Please Login to see the Company</p>;
  }

  const companyDetail = await getCompany(session.user.token, params.cid);

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
        <div className="mx-32 text-left">
          <div className="mb-2 text-[18px] font-medium">
            Company Description
          </div>
          <div className="text-md mx-8 mb-3">{companyDetail.data.desc}</div>
          <div className="mb-2 text-[18px] font-medium">Website</div>
          <div className="text-md mx-8 mb-3">{companyDetail.data.website}</div>
          <div className="mb-2 text-[18px] font-medium">Address</div>
          <div className="text-md mx-8 mb-3">{companyDetail.data.address}</div>
          <div className="mb-2 text-[18px] font-medium">Telephone</div>
          <div className="text-md mx-8 mb-12">{companyDetail.data.tel}</div>
          <Link href={`/company/${params.cid}/booking`}>
            <button
              className="inline h-[3em] w-[40vw] rounded-3xl bg-indigo-600 px-3 py-2 text-white shadow-sm hover:bg-indigo-800"
              name="createSession"
              id="createSession"
              value="Create Session"
            >
              Create Session
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}

// export async function generateStaticParams() {
//     return [{cid:'001'}, {cid:'002'}, {cid:'003'}]
// }
