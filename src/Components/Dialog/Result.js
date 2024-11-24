import React from 'react';

const Result = ({ data }) => {
  if (!data.length) {
    return <p>No results found</p>;
  }

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Results:</h3>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {data.map((item, index) => (
          <li key={index} style={{ margin: '20px', border: '1px solid #ccc', padding: '10px' }}>
            {item.type === 'APOD' && (
              <div>
                <img src={item.url} alt={item.title} style={{ width: '200px' }} />
                <p>{item.title}</p>
              </div>
            )}
            {item.type === 'Earth' && (
              <div>
                <img src={item.url} alt="Earth Imagery" style={{ width: '200px' }} />
                <p>Earth Imagery</p>
              </div>
            )}
            {item.type === undefined && (
              <div>
                <a href={item.links?.[0]?.href} target="_blank" rel="noopener noreferrer">
                  {item.data?.[0]?.title || 'NASA Resource'}
                </a>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Result;
