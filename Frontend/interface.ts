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
  date: Date;
}
interface SessionJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: SessionItem[];
}
