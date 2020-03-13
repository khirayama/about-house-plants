import * as React from 'react';
import css from 'styled-jsx/css';

import { config as siteConfig } from '../config';
import { Resource, ResourceShape, MemoResourceData } from '../utils/Resource';
import { Layout } from '../components/Layout';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { FeaturedMemo } from '../components/FeaturedMemo';

export const config = { amp: true };

export const data = {
  title: `${siteConfig.name} | ${siteConfig.description}`,
  description: siteConfig.description,
  keywords: [] as string[],
};

type IndexPageProps = {
  pathname: string;
  resource: {
    intro: ResourceShape<MemoResourceData>;
    labels: ResourceShape[];
  };
};

const styles = css`
  .featured-memo-container {
    text-align: center;
    padding: 24px;
  }
`;

export default function IndexPage(props: IndexPageProps) {
  const intro = props.resource.intro;
  data.keywords = props.resource.labels.map(label => label.data.title);

  return (
    <>
      <style jsx>{styles}</style>
      <Layout {...data}>
        <Header pathname={props.pathname} />
        <div className="featured-memo-container">
          <FeaturedMemo memo={intro} />
        </div>
        <Footer />
      </Layout>
    </>
  );
}

IndexPage.getInitialProps = (data: any): IndexPageProps => {
  const intro = Resource.findOne<MemoResourceData>('memos', 'introduction');
  const labels = Resource.find('labels', intro.data.labels);

  return {
    pathname: data.pathname,
    resource: {
      intro,
      labels,
    },
  };
};
