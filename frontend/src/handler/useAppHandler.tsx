import { useEffect, useState } from "react";
import useAnimeApi from "../api/useAnimeAPI";
import { AnimeResponse } from "../type/AnimeResponse";

const useAppHandler = () => {
    const { getAnime } = useAnimeApi();
    const[ anime, setAnime ] = useState<AnimeResponse>();

    const fetchAnime = async (genreList: String[]) => {
        const response = await getAnime(genreList);
        if (response) setAnime(response);
        console.log("anime", response);
    }

    return {
        anime,
        fetchAnime
    }
};

export default useAppHandler;