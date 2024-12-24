const useAnimeApi = () => {

    const getAnime = async () => {
        try {
            const response = await fetch('http://localhost:3000/getRandomAnime', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
   
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return {
        getAnime
    }
}

export default useAnimeApi;