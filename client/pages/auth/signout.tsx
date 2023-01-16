/* eslint-disable react-hooks/exhaustive-deps */
import Router from "next/router";
import { useCallback, useEffect, useMemo } from "react";
import useRequest from "../../hooks/useRequest";

const Signout = () => {
  const [requestFn, errorsArr] = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: useCallback(() => Router.push("/"), []),
  });

  useEffect(() => {
    requestFn();
  }, []);

  return <div>Signing you out...</div>;
};

export default Signout;
