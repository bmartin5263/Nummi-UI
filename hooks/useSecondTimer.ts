import { useEffect, useRef, useState } from "react";
import useLog from "./useLog";

const log = useLog("useSecondTimer")

function useSecondTimer(totalSeconds: number): number {
  const [seconds, setSeconds] = useState(totalSeconds);
  const timeoutHandle = useRef(null);

  const update = () => {
    log(seconds);
    const newSeconds = seconds - 1;
    setSeconds(newSeconds);
  }

  useEffect(() => {
    if (seconds > 0) {
      timeoutHandle.current = setTimeout(() => {
        update();
      }, 1000);
    }
    return () => {
      clearInterval(timeoutHandle.current)
    };
  }, [seconds]);

  return seconds;
}

export default useSecondTimer;