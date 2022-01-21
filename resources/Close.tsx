import React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `<svg width="30" height="30" viewBox="9 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 18L24 24M24 24L30 30M24 24L30 18M24 24L18 30" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
</svg>`;

export default ({...props}) => (
  <SvgXml xml={xml} width="40" height="55" {...props} />
);
