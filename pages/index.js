import AppLayout from "../components/AppLayout";

import { retrieveBook } from "../store/slice/book-slice";

import { wrapper } from "../store";
import { useSelector } from "react-redux";
import axios from "axios";
import { useContext, useEffect } from "react";


const Home = (props) => {
  
  return (
    <AppLayout>
      <h1>여기는 Index페이지 입니다.</h1>
      {/* <div>{ pageProps && pageProps.books && pageProps.books[0] && pageProps.books[0].title }</div> */}
    </AppLayout>
  )
}
export const getServerSideProps = wrapper.getServerSideProps( store => async ({ req, res }) => {
  await store.dispatch(retrieveBook({ query: 'react' }));
});


export default Home;
