import React from 'react';
import { BASEURL } from '../constants/constants';

const baseURL = BASEURL + 'codechallenge/getCover?isrc=';

const CoverImage = ({ isrc }) => {
    return isrc && <img src={baseURL + isrc} alt="Cover" />;
};

export default CoverImage;