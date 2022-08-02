import Head from 'next/head';
import Layout from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/post";
import utilStyles from '../../styles/utils.module.css';

export async function getStaticPaths(){
  const paths = getAllPostIds();

  return{
    paths,
    fallback:false,//paths以外は404になる
  };
}

export async function getStaticProps({ params }){
  const postData = await getPostData(params.id);

  return{
    props:{
      postData,
    },
  };

}
//dangerouslySetInnerHTMLは他人から入力する場合サニタイズ忘れずに

export default function Post({postData}) {

  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingX1}>{postData.title}</h1>
        <div className={utilStyles.lightText}>{postData.date}</div>
        <div dangerouslySetInnerHTML={{__html: postData.blogContentHTML}}/>
      </article>
      

    </Layout>
  );
}