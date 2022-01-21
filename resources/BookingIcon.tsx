import React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22 20H27.5M22 28H27.5M22 24H26.5M30 16H19C18.4477 16 18 16.4477 18 17V31C18 31.5523 18.4477 32 19 32H30C30.5523 32 31 31.5523 31 31V17C31 16.4477 30.5523 16 30 16Z" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

export default ({...props}) => (
  <SvgXml xml={xml} width="100" height="50" {...props} />
);
