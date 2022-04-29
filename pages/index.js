import AppLayout from "../components/AppLayout";

import { retrieveBook } from "../store/slice/book-slice";

import { wrapper } from "../store";
import { useSelector } from "react-redux";
import axios from "axios";
import { useContext, useEffect } from "react";


const Home = (props) => {
  console.log(props)
  return (
    <AppLayout>
      <h1>여기는 Index페이지 입니다.</h1>
      <div>{ props && props.books && props.books[0] && props.books[0].title }</div>
    </AppLayout>
  )
}
export const getServerSideProps = wrapper.getServerSideProps( store => async ({ req, res }) => {
  await store.dispatch(retrieveBook({ query: 'react' }));
  const book = store.getState().book;
  return {
    props: { books: book.books } 
  }
});


export default Home;
