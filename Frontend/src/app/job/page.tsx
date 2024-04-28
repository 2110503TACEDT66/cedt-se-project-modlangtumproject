import JobCatalog from "@/components/JobCatalog";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import getAllJob from "@/libs/getAllJob";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Job(){
    const session = await getServerSession(authOptions);

    if(!session || !session.user.token) {
        return <p> Please Login to see the Job Position</p>;
    }
    const allJob = await getAllJob(session.user.token);

    return(
        <main className="">
            <div className="px-16 py-12 text-left">
                <Suspense
                fallback={
                    <p>
                        Loading ... <LinearProgress />
                    </p>
                }
            >
                <JobCatalog allJobJson={allJob} />
            </Suspense>
            </div>
        </main>
    );
}