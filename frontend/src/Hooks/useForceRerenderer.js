import { useState } from "react";

const useForceRerender = () => {
  const [, setValue] = useState(false);
  return () => setValue((value) => !value);
};

export default useForceRerender;
