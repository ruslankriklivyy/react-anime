import React from 'react';
import ContentLoader from 'react-content-loader';

export const AnimeItemLoader = (props: any) => (
  <ContentLoader
    speed={2}
    width={300}
    height={360}
    viewBox="0 0 300 360"
    backgroundColor="#333232"
    foregroundColor="#4b4b49"
    {...props}>
    <rect x="1" y="-1" rx="20" ry="20" width="300" height="360" />
  </ContentLoader>
);
