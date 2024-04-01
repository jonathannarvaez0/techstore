let key: string = "sessionId";

export const StoreSession = (sessionId: string) => {
  localStorage.setItem(key, sessionId);
};

export const RemoveSession = () => {
  localStorage.removeItem(key);
};

export const CheckSessionIfExisting = () => {
  if (localStorage.getItem(key)) return true;
  return false;
};

export const GetSessionValue = () => {
  return localStorage.getItem(key);
};
