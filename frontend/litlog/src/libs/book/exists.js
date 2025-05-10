import axios from "axios";

export const exists = async (bookApiId) => {
    if (bookApiId) {
        try {
            const response = await axios.get(`http://localhost:9090/books/query`, {
                params: {
                    bookApiId
                },
            });

            const exists = response.data; // response.data가 Boolean 값이므로 구조 분해 불필요
            return exists;

        } catch (error) {
            console.error("Fail to search:", error);
        }
    }
    return false;
};
  