import React from 'react';
import useFirestore from '../hooks/useFirestore';

const Gallery = ({setSelectedImg}) => {
    const {docs} = useFirestore('images');

    return(
        <div className="img-grid">
            {docs && docs.map(doc => (
                <div className ="img-wrap" key={doc.id}>
                    <div className ="img-wrap-inner">
                        <img src={doc.url} alt="upload"></img>
                    </div>
                </div>
            ))}
        </div>
    )
}


export default Gallery;