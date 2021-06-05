export const manageError = (e, auth = console.error) => {
  if (this.isAuthFail(e)) auth(e);
  else console.error(e);
}

export const isAuthFail = (error) => {
  const message = error.message.toLowerCase();
  return (message.includes('jwt') === true || message.includes('401') === true);
}