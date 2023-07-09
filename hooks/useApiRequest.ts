import { AxiosResponse } from "axios";
import { useState } from "react";
import { or } from "../util/utils";
import { assert, assertNotNull } from "../util/assert";

export type ApiRequestProps = {
  request: () => any;
  send: (data: any) => Promise<AxiosResponse<any, any>>;
  onSuccess: (res: AxiosResponse<any, any>) => void;
  onFailure: (res: AxiosResponse<any, any>) => void;
}

export type ApiRequest = {
  sent: boolean 
  send: () => void;
}

function useApiRequest(props: ApiRequestProps): ApiRequest {
  const request = or(props.request, () => null);
  const send = assertNotNull(props.send, "send");
  const onSuccess = or(props.onSuccess, () => {});
  const onFailure = or(props.onFailure, () => {});
  
  const [sent, setSent] = useState(false);

  const doSend = async () => {
    const data = request();
    setSent(true);
    try {
      const res = await send(data);
      setSent(false);
      onSuccess(res);
    }
    catch (error) {
      setSent(false);
      const res = error.response;
      onFailure(res);
    }
  }

  return {
    sent: sent,
    send: () => doSend()
  };
}

export default useApiRequest;