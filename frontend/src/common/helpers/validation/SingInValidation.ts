export const SingInValidation = {
  email: (val: string) => (!val ? "Email is required" : null),
  password: (val: string) => (!val ? "Password is required" : null),
};
