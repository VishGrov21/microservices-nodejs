import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useState } from "react";

export interface ErrorObj {
  field: string;
  message: string;
}

export type ErrorArr = ErrorObj[];
export type AxiosErrorData = {
  errors: ErrorArr;
};

export interface UseRequestI {
  url: string;
  method: "post" | "get" | "patch" | "delete" | "put";
  body: { [key: string]: any };
  onSuccess?: (data: AxiosResponse) => void;
}

const useRequest = ({ url, method, body, onSuccess }: UseRequestI): [() => Promise<any>, ErrorArr] => {
  const [errorsArr, setErrorsArr] = useState<ErrorArr>([]);

  const doRequest = async () => {
    try {
      setErrorsArr([]);
      const response = await axios[method](url, body);
      if (onSuccess) {
        onSuccess(response.data);
      }
      return response?.data;
    } catch (error) {
      const typedErr = error as AxiosError;
      const data = typedErr.response?.data as AxiosErrorData;
      setErrorsArr(data.errors);
    }
  };
  return [doRequest, errorsArr];
};

export default useRequest;
