# Problems and Solutions

### React Router setup

* Correct setup
```html
    <Router history={ hashHistory }
        <Route path="/" component={ AppContainer }>
            <IndexRoute component={ ComponentWeWantToSeeFirst } />
            <Route path="/dashboard" component={ Dashboard } />
        </Route>
    </Router>
```

### Unexpected token in React class declaration
* ES6 React: functions are **not** separated by commas
