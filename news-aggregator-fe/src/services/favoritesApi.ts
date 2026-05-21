import api from "./api";

export const addFavoriteApi = async (article: any) => {
  const token = localStorage.getItem("token");

  const response = await api.post(
    "/favorites/",
    {
      title: article.title,
      description: article.description,
      url: article.url,
      image: article.image,
      source: article.source.name,
      published_at: article.publishedAt,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const removeFavoriteApi = async (url: string) => {
  const token = localStorage.getItem("token");

  const response = await api.delete("/favorites/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      url,
    },
  });

  return response.data;
};

export const getFavoritesApi = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/favorites/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};