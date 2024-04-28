import { getServerSession } from "next-auth";
import Card from "./Card";
import { Link, TextField } from "@mui/material";
import getUserProfile from "@/libs/getUserProfile";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function JobCatalog({
  allJobJson,
}: {
  allJobJson: Promise<JobJson>;
}) {
  const allJobJsonReady = await allJobJson;

  const session = await getServerSession(authOptions);
  if(!session || !session.user.token){
    alert('Please Login');
    redirect('/auth/login');
  }
  return (
    <>
    <div className="flex w-[100%] flex-row justify-between">
      <h1 className="order-first text-[35px] font-bold">Mycoursevilles|All Jobs</h1>
      <TextField
      className="order-last mt-[20px] w-[25%]"
      label = "Job Search"
      name = "jobSearch"
      id = "jobSearch"
      placeholder="Job Search"
      size = "small"
      InputProps={{
        style: {
          borderRadius: '10px'
        },
      }}
      />
    </div>
    <div className="flex flex-wrap gap-4">
      {allJobJsonReady.data.map((jobItem : JobItem) => (
          <Link
            key= {jobItem.id}
            href={`/job/${jobItem.id}`} 
            className = "block overflow-hidden rounded-lg bg-white shadow-lg hover:bg-gray-100">
          <Card jobName={jobItem.name} jobDescription = {jobItem.description} jobSalary = {jobItem.salary} companyName = {jobItem.companyname} hashtag = {jobItem.hashtag} />
        </Link>
        ))}
    </div>
    </>
  )
}