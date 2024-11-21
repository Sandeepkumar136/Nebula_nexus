const ExoplanetResults = ({ results }) => {
  if (!results.length) return <p>No exoplanet data found.</p>;

  return (
    <div>
      {results.map((planet, index) => (
        <div key={index} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
          <h3>{planet.pl_name || 'Unknown Planet'}</h3>
          <p>Orbital Period: {planet.pl_orbper || 'N/A'} days</p>
        </div>
      ))}
    </div>
  );
};

export default ExoplanetResults;
