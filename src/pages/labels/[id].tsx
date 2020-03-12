import * as React from 'react';
import Link from 'next/link';

import { resource, Resource } from '../../utils/resource';

export const config = { amp: true };

type PostPageProps = {
  resource: Resource;
};

export default function PostPage(props: PostPageProps) {
  return (
    <div>
      <h1>Post Page</h1>
      <p>{props.resource.id}</p>
      <p>{props.resource.type}</p>
      <p>{props.resource.contents}</p>
      <Link href="/">
        <a>to Index Page</a>
      </Link>
    </div>
  );
}

PostPage.getInitialProps = (data: any): PostPageProps => {
  const id = data.query.id;
  const res = resource.get('labels', id);
  return { resource: res };
};