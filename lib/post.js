import path from "path";
import fs from "fs";

//メタデータを取得するためのライブラリ
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

//パスを取得 process.cwd()は現在のcurrentディレクトリ
const postsDirectory = path.join(process.cwd(),"posts");

//mdファイルのデータを取り出す
export function getPostsData(){

  //ディレクトリの中にあるファイル名を配列で取得
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName)=>{
    //パスからファイル名を取得
    const id = fileName.replace(/\.md$/,"");

    //マークダウンファイルを文字列として読み取る
    const fullPath = path.join(postsDirectory,fileName);
    //フルパスのデータを文字列で取得
    const fileContents = fs.readFileSync(fullPath,"utf8");
    //メタデータを解析
    const matterResult = matter(fileContents);

    //idとデータを返す
    return{
      id,
      ...matterResult.data,
    };
  });
  return allPostsData;

}

//getStaticPath(外部ページへ遷移する際も静的ページを生成できる関数)でreturn で使うpathを取得
//パスを取得するためのファイル名の一覧をオブジェクトで返す関数
export function getAllPostIds(){

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName)=>{
    return {
      params:{
        id:fileName.replace(/\.md$/,""),

      },
    };
  });
  /*
  [
    {
      param:{
        id:"ssg-ssr"
      }
    },
    {
      param:{
        id:"next-react"
      }
    },
  ]
  */
}

//idに基づいてブログ投稿データを返す
export async function getPostData(id){
  //マークダウンファイルを文字列として読み取る
  const fullPath = path.join(postsDirectory,`${id}.md`);
  //フルパスのデータを文字列で取得
  const fileContent = fs.readFileSync(fullPath,"utf8");
  const matterResult = matter(fileContent);

  const blogContent = await remark().use(html).process(matterResult.content);

  const blogContentHTML = blogContent.toString();
  return{
    id,
    blogContentHTML,
    ...matterResult.data,
  };

}