import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { PageTransition } from '@steveeeie/react-page-transition';
import './Hmpg.css';

const Section1 = () => <div className="section">Section 1</div>;
const Section2 = () => <div className="section">Section 2</div>;
const Section3 = () => <div className="section">Section 3</div>;
const Section4 = () => <div className="section">Section 4</div>;

const Hmpg = () => {
  return (
    <Router>
      <div className="hmpg">
        <nav>
          <ul>
            <li>
              <Link to="/section1">Section 1</Link>
            </li>
            <li>
              <Link to="/section2">Section 2</Link>
            </li>
            <li>
              <Link to="/section3">Section 3</Link>
            </li>
            <li>
              <Link to="/section4">Section 4</Link>
            </li>
          </ul>
        </nav>

        <Route
          render={({ location }) => (
            <PageTransition
              preset="fade"
              transitionKey={location.pathname}
            >
              <Switch location={location}>
                <Route path="/section1" component={Section1} />
                <Route path="/section2" component={Section2} />
                <Route path="/section3" component={Section3} />
                <Route path="/section4" component={Section4} />
              </Switch>
            </PageTransition>
          )}
        />
      </div>
    </Router>
  );
}

export default Hmpg;