import Date from "../components/date";
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import Link from "next/link";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";

export async function getStaticProps() {
  const posts_data = getSortedPostsData();
  return {
    props: {
      posts_data,
    },
  };
}

export default function Home({ posts_data }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <p>Hello world</p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Posts</h2>
        <ul className={utilStyles.list}>
          {posts_data.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date date_string={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
