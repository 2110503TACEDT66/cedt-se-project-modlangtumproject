interface CompanyItem {
  _id: string;
  name: string;
  address: string;
  district: string;
  province: string;
  postalcode: string;
  tel: string;
  picture: string;
  __v: number;
  id: string;
}

interface CompanyJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: CompanyItem[];
}

interface SessionItem {
  _id: string;
  user: Object;
  company: Object;
  job: Object;
  date: Date;
}
interface SessionJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: SessionItem[];
}

interface JobItem {
  _id: string;
  name: string;
  desc: string;
  hashtag: string[];
  salary: string;
  company: Object;
}
interface JobJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: JobItem[];
}

interface ProfileItem {
  _id: string;
  id: string;
  name: string;
  email: string;
  role: string;
  profile: string;
}
