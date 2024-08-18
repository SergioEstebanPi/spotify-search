import React from 'react';
import { BASEURL } from '../constants/constants';
import { Card } from 'antd';

const baseURL = BASEURL + 'codechallenge/getCover?isrc=';

const CoverImage = ({ img }) => {
    return img && (
        <Card
            hoverable
            style={{
                width: 300,
            }}
            cover={<img alt="Cover" src={img} />}
        >
        </Card>
    )
};

export default CoverImage;