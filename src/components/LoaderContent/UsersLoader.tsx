import React from 'react';
import ContentLoader from 'react-content-loader';

export const UsersLoader = (props: any) => (
  <ContentLoader
    speed={2}
    width={240}
    height={330}
    viewBox="0 0 220 300"
    backgroundColor="#333232"
    foregroundColor="#4b4b49"
    {...props}>
    <rect x="451" y="23" rx="0" ry="0" width="1" height="0" />
    <rect x="8" y="2" rx="15" ry="15" width="180" height="220" />
  </ContentLoader>
);
