export const exists = (bookAPIId) => {
    if (bookAPIId) {
        try {
            const response = axios.get(`http://localhost:9090/books/query`, {
                params: {
                  bookAPIId
                },
            });

            const { exists } = response.data;
            if (exists) return true;

        } catch (error) {
            console.error("Fail to search:", error);
        }
    }
    return false;
  };
  