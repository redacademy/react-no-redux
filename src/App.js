import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const HELLO_MESSAGE = gql`
  {
    hello {
      message
    }
  }
`;

const WORLD_MESSAGE = gql`
  {
    world {
      message
    }
  }
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false
    };
  }

  login = () => {
    fetch("http://localhost:3001/login", {
      body: JSON.stringify({ username: "admin", password: "admin" }),
      credentials: "include",
      headers: {
        "content-type": "application/json"
      },
      method: "POST"
    }).then(() => {
      setTimeout(() => this.setState({ loggedIn: true }), 1000);
    });
  };

  render() {
    return (
      <Query query={HELLO_MESSAGE}>
        {({ loading, error, data: { hello } }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :( </p>;

          return (
            <div>
              <p>{`${hello.message}`}</p>
              {this.state.loggedIn ? (
                <Query query={WORLD_MESSAGE}>
                  {({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error :( </p>;
                    return <p>{`${data.world.message}`}??</p>;
                  }}
                </Query>
              ) : (
                ""
              )}
              <button onClick={this.login}>LOGIN</button>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default App;
