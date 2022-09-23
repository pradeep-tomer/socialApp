export interface registrationType {
  email: string;
  password: string;
  fullName: string;
  confirmPass: string;
}

export interface loginType {
  email: string;
  password: string;
}

export interface postItem {
  post: [
    {
      count: number;
      description: string;
      likes: Array<string>;
      postId: string;
      time: string;
      uid: string;
      url: string;
    },
  ];
}

export interface userNameType {
  id: string;
  name: string;
}
