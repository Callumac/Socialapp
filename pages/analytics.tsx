import { useState, useEffect } from 'react';

const Analytics = () => {
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    fetch('/api/analytics')
      .then((res) => res.json())
      .then((data) => setAnalytics(data));
  }, []);

  return (
    <div>
      <h1>Analytics</h1>
      <table>
        <thead>
          <tr>
            <th>Topic</th>
            <th>Type</th>
            <th>Status</th>
            <th>Video URL</th>
          </tr>
        </thead>
        <tbody>
          {analytics.map((job) => (
            <tr key={job.id}>
              <td>{job.topic}</td>
              <td>{job.type}</td>
              <td>{job.status}</td>
              <td><a href={job.video_url}>Download</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
