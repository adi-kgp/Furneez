import Layout from '../components/_App/Layout';
import App from "next/app";
import {parseCookies} from 'nookies';
import {redirectUser} from '../utils/auth';
import baseUrl from '../utils/baseUrl';
import axios from 'axios';

class MyApp extends App {
  static async getInitialProps({Component, ctx}){

    const {token} = parseCookies(ctx);

    let pageProps = {};
    if (Component.getInitialProps){
      pageProps = await Component.getInitialProps(ctx);
    }
    if (!token){
      const isProtectedRoute = ctx.pathname === '/account' || ctx.pathname === '/create';
      if (isProtectedRoute){
        redirectUser(ctx, '/login');
      }
    } else {
      try {
        const payload = {headers: {Authorization: token}}
        const url = `${baseUrl}/api/account`;
        const response = await axios.get(url, payload);
        const user = response.data;
        pageProps.user = user;
      }catch(error){
        console.error('Error getting current user');
      }
    }
    return {pageProps} // es6 shorthand for creating property pageProps: pageProps
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout {...pageProps}>
        <Component {...pageProps}/>
      </Layout>
    );
  }
}

export default MyApp;
