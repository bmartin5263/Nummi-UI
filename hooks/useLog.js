function useLog(clazz) {
  return (message) => console.log("[" + clazz + "] " + message);
}

export default useLog;