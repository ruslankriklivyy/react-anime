import React from 'react';
import ContentLoader from 'react-content-loader';

export const AnimeInfoLoader = (props: any) => (
  <ContentLoader
    speed={2}
    width={1200}
    height={500}
    viewBox="0 0 1200 500"
    backgroundColor="#333232"
    foregroundColor="#4b4b49"
    {...props}>
    <rect x="5" y="5" rx="20" ry="20" width="310" height="390" />
    <rect x="343" y="5" rx="6" ry="6" width="286" height="34" />
    <rect x="1090" y="5" rx="6" ry="6" width="50" height="34" />
    <rect x="343" y="56" rx="6" ry="6" width="550" height="172" />
    <rect x="343" y="276" rx="6" ry="6" width="88" height="25" />
    <rect x="440" y="276" rx="6" ry="6" width="88" height="25" />
    <rect x="535" y="276" rx="6" ry="6" width="88" height="25" />
    <rect x="343" y="342" rx="13" ry="13" width="174" height="49" />
    <rect x="525" y="342" rx="13" ry="13" width="65" height="49" />
  </ContentLoader>
);
