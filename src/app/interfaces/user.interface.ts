export interface iUser {
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

export interface iCreateUser {
  id: number;
  name: string;
  email: string;
  website: string;
  company: {
    name: string;
  };
}

export interface iEditUser extends iCreateUser {
  id: number;
}
