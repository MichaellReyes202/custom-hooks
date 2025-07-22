import { useEffect, useState } from "react";

const localCache = {};

export const useFetch = (url) => {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    hasError: false,
    error: null,
  });

  useEffect(() => {
    getFetch();
  }, [url]);

  const setLoadingState = () => {
    setState({
      data: null,
      isLoading: true,
      hasError: false,
      error: null,
    });
  };

  const getFetch = async () => {
    setLoadingState();

    // verificar si la Data ya esta en el cache
    if (localCache[url]) {
      console.log("Usando cache");
      setState({
        data: localCache[url],
        isLoading: false,
        hasError: false,
        error: null,
      });
      return;
    }
    const resp = await fetch(url);

    // sleep
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (!resp.ok) {
      setState({
        data: null,
        isLoading: false,
        hasError: true,
        error: {
          code: resp.status,
          message: resp.statusText,
        },
      });
      return;
    }
    const data = await resp.json();
    console.log(data);
    setState({
      data: data,
      isLoading: false,
      hasError: false,
      error: null,
    });
    // manejo del cache
    localCache[url] = data;
  };
  console.log(JSON.stringify(state.data));
  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
  };
};
