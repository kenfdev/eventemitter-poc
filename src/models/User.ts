import { v4 as uuid } from 'uuid';

interface UserProps {
  username: string;
  email: string;
}

export class User {
  private readonly _id: string;
  private readonly _username: string;
  private readonly _email: string;
  constructor({ username, email }: UserProps, id?: string) {
    this._username = username;
    this._email = email;

    this._id = id ? id : uuid();
  }

  get id() {
    return this._id;
  }

  get username() {
    return this._username;
  }

  get email() {
    return this._email;
  }
}
