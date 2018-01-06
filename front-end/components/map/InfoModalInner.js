import React from 'react';

import '../../scss/map/info-modal-inner.scss';

const InfoModalInner = props => (
    <div className="info-modal-inner">
        <div>
            <img className="avatar" alt="avatar" src={props.infoWindowData.avatar} />
        </div>
        <div className="info-wrapper">
            <h4 className="author bold">{props.infoWindowData.author}</h4>
            {props.infoWindowData.text && (
                <div>
                    <span className="bold">Text:&nbsp;</span>
                    <span>{props.infoWindowData.text}</span>
                </div>
            )}
            {props.tags && (
                <div className="hash-tags">
                    <span className="bold">HashTags:&nbsp;</span>
                    <span>{props.tags}</span>
                </div>
            )}
        </div>
    </div>
);

export default InfoModalInner;
