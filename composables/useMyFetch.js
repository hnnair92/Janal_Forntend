export const useMyFetch = (request, opts) => {
    const config = useRuntimeConfig()
  
    return useFetch(request, { baseURL: config.public.baseURL,
            server: true,
            headers: {
                "Content-Type": "application/json",
            },
    })
  }