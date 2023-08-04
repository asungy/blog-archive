import Date from "../../components/date";
import Head from "next/head";
import Layout from "../../components/layout";
import utilStyles from "../../styles/utils.module.css";
import { getPostIds, getPostData } from "../../lib/posts";

export default function Post({ post_data }) {
  return (
    <Layout>
      <Head>
        <title>{post_data.title}</title>
      </Head>

      <article>
        <h1 className={utilStyles.headingXl}>{post_data.title}</h1>
        <div className={utilStyles.lightText}>
          <Date date_string={post_data.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post_data.content_html }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post_data = await getPostData(params.id);
  return {
    props: {
      post_data,
    },
  };
}
