import React from 'react';
import {SocialIcon} from 'react-social-icons';

let urls = [
    "https://www.facebook.com/mukul.hase",
    "https://github.com/mukulhase",
    "https://www.linkedin.com/in/mukul-hase-42069/",
    "https://open.spotify.com/user/213i4eofdg43qmfvheiso7tza"
];

const Social = () => (
    <div style={{
        padding: 20
    }}>
        <div>
            {urls.map(url=><span key={url} style={{padding:5}}><SocialIcon url={url}></SocialIcon></span>)}
        </div>
    </div>
)

export default Social;