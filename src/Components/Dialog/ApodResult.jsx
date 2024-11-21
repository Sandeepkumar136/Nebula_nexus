const ApodResult = ({ results }) => {
  if (!results.length) return <p>No APOD data found.</p>;

  return (
    <div>
      {results.map((data, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <h3>{data.title}</h3>
          <img src={data.url} alt={data.title} style={{ width: '100%', height: 'auto' }} />
          <p>{data.explanation}</p>
        </div>
      ))}
    </div>
  );
};

export default ApodResult;
