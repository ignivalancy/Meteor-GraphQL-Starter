# Todo App GraphQL

A simple kit to start GraphQL experimenting with Apollo, Meteor and React.

### Includes
- GraphQL server running with Express bound to the Meteor app
- Apollo client
- React
- Accounts UI, Basic & password
- ES6 syntax

### Running it

```
meteor npm install
meteor
```

GraphiQL is enabled at [/graphiql](http://localhost:3000/graphiql).

### Folder structure
    .
    ├── client                  # Client files
    │   ├── styles              # Styles
    │   ├── main.html           # First loaded view pulling from imports
    │   └── main.js             # Imports all required files - React render
    ├── imports                 # A client/server folder
    │   ├── api                 #
    │   |  └── graphql          # Graphql query & mutation definitions
    │   |  └── schema.js        # Graphql schema configration
    │   ├── collections         # Mongodb Collections
    |   └── ui                  # UI React rendering
    │      └── App.js           # Component using `graphql` HOC
    │      └── Header.js        # Basic presentational component
    │      └── Loading.js       # Reusable loading component
    │      └── LoginForm.js     # Component using `withApollo` HOC
    ├── server                  # Server files
    │   └── account.js          # Accounts configrations
    │   └── server.js           # Main server file initiating Apollo server
    └── package.json            # node dependencies


### Learn more

- [Meteor `apollo` package docs](http://dev.apollodata.com/core/meteor.html)
- [Apollo docs](http://dev.apollodata.com/)
