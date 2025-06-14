export interface IUser {
  id: number;
  name: string;
  username?: string;
  email: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: number;
      lng: number;
    };
  };
  phone?: string;
  website: string;
  company: {
    name: string;
    catchPrase?: string;
    bs?: string;
  };
}

export interface ICreateUser {
  id: number;
  name: string;
  email: string;
  website: string;
  company: {
    name: string;
  };
}
