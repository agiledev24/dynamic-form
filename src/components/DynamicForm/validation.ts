const isEmailPattern = /^\w+(['+.-]\w+)*@\w+([.-]\w+)*\.\w+([.-]\w+)*$/;
const isPhonePattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

const emailValidate = (value: string) => {
  if (!isEmailPattern.test(value)) {
    return "Invalid email";
  }
  return undefined;
};

const phoneValidate = (value: string) => {
  if (!isPhonePattern.test(value)) {
    return "Invalid phone";
  }
  return undefined;
};

export const validations = {
  email: {
    maxLength: 60,
    validate: emailValidate,
  },
  phone: {
    validate: phoneValidate,
  },
};
