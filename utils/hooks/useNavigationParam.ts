import { useRoute } from "@react-navigation/native";

import { useMemo } from "react";

const useNavigationParam = <T>() => {
  const route = useRoute();
  const params = useMemo(() => route.params, []);

  return params as T;
};

export default useNavigationParam;
