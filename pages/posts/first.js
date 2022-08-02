import Head from "next/dist/shared/lib/head";
import Link from "next/dist/client/link";

export default function First() {
  return (
    <div>
      <Head>
        <title>最初の投稿</title>
      </Head>
      <h1>最初の投稿</h1>
      <p>Linkタグはリロードせず、ページを高速に表示する</p>
      <p>globals.css→共通要素のCSS</p>
      <p>layout.module.css→レイアウトの骨格部分のCSS</p>
      <p>utils.module.css→デザインに対するCSS</p>

      <Link href="/"><a>ホームへ戻る</a></Link>
    </div>
  );
}