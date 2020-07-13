import React from 'react';
import useState from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/esm/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Typehead, AsyncTypeahead } from 'react-bootstrap-typeahead';

const SEARCH_URI = "https://api.spotify.com/v1/search"


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="large1">Welcome to the Spotify related artists game!</div>
        <div className="text1">To begin, select an artist to start with:</div>
        <Form>
          <Form.Row>
            <Col>
              <AsyncExample></AsyncExample>
            </Col>
            <Col>
              <Form.Label> to </Form.Label>
            </Col>
          </Form.Row>
        </Form>
      </header>
    </div>
  );
}

const AsyncExample = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const handleSearch = (query) => {
    setIsLoading(true);

    fetch(`${SEARCH_URI}?q=${query}+in:login&page=1&per_page=50`)
      .then((resp) => resp.json())
      .then(({ items }) => {
        const options = items.map((i) => ({
          avatar_url: i.avatar_url,
          id: i.id,
          login: i.login,
        }));

        setOptions(options);
        setIsLoading(false);
      });
  };

  return (
    <AsyncTypeahead
      id="async-example"
      isLoading={isLoading}
      labelKey="login"
      minLength={3}
      onSearch={handleSearch}
      options={options}
      placeholder="Search for a Github user..."
      renderMenuItemChildren={(option, props) => (
        <>
          <img
            alt={option.login}
            src={option.avatar_url}
            style={{
              height: '24px',
              marginRight: '10px',
              width: '24px',
            }}
          />
          <span>{option.login}</span>
        </>
      )}
    />
  );
};

export default App;
