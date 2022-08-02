import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from "next/link";
import Layout, { siteTitle } from '../components/Layout';

import utilStyles from '../styles/utils.module.css';

import { getPostsData } from '../lib/post';

//SSG
export async function getStaticProps(){
  const allPostsData = getPostsData();
  console.log(allPostsData);
  return{
    props:{
      allPostsData,
    },
  };
}


export default function Home({allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Nextjs Develop blog</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2>ブログタイトル</h2>
        <div className={styles.grid}>
          {allPostsData.map(({id,title,date,thumbnail})=>(
             <article key ={id}>
             <Link href ={`/posts/${id}`}>
             <img src={thumbnail} className={styles.thumbnailImage} />
             </Link>
             <Link href ={`/posts/${id}`}>
               <a className={utilStyles.boldText}>{title}</a>        
             </Link>
             <br />
             <small className={utilStyles.lightText}>{date}</small>
           </article>  
          ))}
                 
        </div>
      </section>
    </Layout>

    
  );
}
