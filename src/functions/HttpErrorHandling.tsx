type Response = {
  code: number;
  message: string;
};

export const ErrorHandling = (response: Response) => {
  switch (response.code) {
    case 401:
    case 500:
      alert(response.message);
      return false;

    case 201:
    case 404:
      return response.message;

    default:
      return true;
  }
};
