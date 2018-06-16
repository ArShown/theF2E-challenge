import React from 'react';
import handler from './handler';

export default handler(({ storeData }) => <span>{storeData.length}</span>);
