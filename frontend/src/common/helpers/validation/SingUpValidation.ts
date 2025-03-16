export const SingUpValidation = {
  email: (val: string) => {
    if (!val) {
      return "Email is required";
    }
    if (!/^\S+@\S+$/.test(val)) {
      return "Invalid email";
    }
    return null;
  },
  password: (val: string) => {
    if (!val) {
      return "Password is required";
    }
    if (val.length < 8) {
      return "Password should be at least 8 characters";
    }
    if (!/[a-z]/.test(val)) {
      return "Password should contain at least one lowercase letter";
    }
    if (!/[0-9]/.test(val)) {
      return "Password should contain at least one number";
    }
    return null;
  },
  name: (val: string) => (!val ? "Name is required" : null),
  terms: (val: boolean) => (!val ? "You must accept terms and conditions" : null),
};
