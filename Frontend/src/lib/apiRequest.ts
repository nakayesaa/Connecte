export const apiRequest = async (url: string, options: RequestInit) => {
  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  const data = await response.json().catch(()=>({}));
  if(!response.ok){
    throw new Error(data.message || "Request failed");
  }
  return data
};