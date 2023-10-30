/* eslint-disable @typescript-eslint/no-explicit-any */
export type LoginPayload = {
    contactFormat: string;
    password: string;
  };

  export enum AuthQueryKeys {
    PRIVILEGE =  'privilege',
	USER_BY_ID = 'user_by_id',
	USERS = 'users'
  }

  export enum UserPrivileges {
	CLIENT = 'Client',
	MANAGER = 'Manager',
	BARBER = 'Barber',
	ADMIN = 'Admin'
}

export interface IUser {
	id: string;
	name: string;
	contact: string;
	email: string;
	age: number;
	gender: number;
	cpf: string;
	privilege?: UserPrivileges;
	created_at: Date;
	manager: boolean | any;
	config: {
		theme: string
	}
}

export type UserContextType = {
    user: IUser | null;
    insertUser: (user: IUser | null) => void;
  };

  export type ContextProps = {
    children: any
  }

  export type UserPayload = {
	name: string
	email: string
	age: string | number
	cpf?:string
	id: string
  }

  export type CreateUserPayload = {
	contact:string
	name:string
	password:string
  }