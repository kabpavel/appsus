const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
import { AppFooter } from './cmps/AppFooter.jsx';
import { AppHeader } from './js/cmps/app-header.jsx';
// import { UserMsg } from './cmps/UserMsg.jsx';
import { About } from './js/pages/app-about.jsx';
import { Email } from './js/apps/mail/pages/email-index.jsx';
import { Note } from './js/apps/keep/pages/note-index.jsx';

import { AppsusApp } from './js/pages/appsus-app.jsx';
import { Home } from './js/pages/app-home.jsx';
export function App() {
  return (
    <Router>
      <header>
        <AppHeader/>
      </header>
      <main>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/email" component={Email} />
          <Route path="/Note" component={Note} />
          <Route path="/appsus" component={AppsusApp} />
          <Route path="/about" component={About} />
        </Switch>
      </main>
      <footer>
        <AppFooter/>
      </footer>
      {/* <UserMsg/> */}
    </Router>
  );
}
