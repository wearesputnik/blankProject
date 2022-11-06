export const userCredsValidator = (username: string, password: string) => {
  let result: any = {valid: false};
  const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  if (!username) result.username = 'Invalid username';
  if (!password) result.password = 'Invalid password';
  else result.valid = true;

  return result;
};

export const numberInput = (input: string) => {
  const re = /^\d+(\.\d+)*$/;
  const re1 = /^\d+(\,\d+)*$/;

  return re.test(input) || re1.test(input) || /^\d+[.,]{0,1}$/.test(input)
    ? input
    : '0';
};
