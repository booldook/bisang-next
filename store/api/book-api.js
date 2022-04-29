import axios from 'axios';

export const retrieveBookApi = async ({query, page = 1, size = 30}) => {
  const url = process.env.REACT_APP_BOOK_URL;
  const options = {
    params: { query , size, page },
    headers: {
      Authorization: 'KakaoAK ' + process.env.REACT_APP_KAKAO_KEY
    }
  }
  const response = await axios.get(url, options);
  return response;
}