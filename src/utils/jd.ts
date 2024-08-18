interface loginForm {
  email: string | null;
  username: string | null;
  password: string;
}

export function jd(args: { account: string; password: string } | any) {
  let res: loginForm = {
    email: null,
    username: null,
    password: args.password,
  };
  if (args.account.includes("@") && args.account.includes(".com")) {
    res.email = args.account;
    return res;
  }
  res.username = args.account;
  return res;
}
