const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
import { AppFooter } from './js/cmps/app-footer.jsx';
import { AppHeader } from './js/cmps/app-header.jsx';
// import { UserMsg } from './cmps/UserMsg.jsx';
// import { About } from './pages/About.jsx';
import { NoteApp } from './js/apps/keep/pages/note-app.jsx';
import { About } from './js/pages/app-about.jsx';
// import { Email } from './js/apps/mail/pages/email-index.jsx';
import { Email } from './js/apps/mail/pages/email-app.jsx';

import { AppsusApp } from './js/pages/appsus-app.jsx';
import { Home } from './js/pages/app-home.jsx';
export function App() {
  return (
    <Router>
      <header>
        <AppHeader />
      </header>
      <main>
        <Switch>
          <Route path="/email" component={Email} />
          <Route path="/appsus" component={AppsusApp} />
          <Route path="/about" component={About} />
          <Route path="/note-app" component={NoteApp} />

        </Switch>
      </main>
      <footer>
        <AppFooter />
      </footer>
      {/* <UserMsg/> */}
    </Router>
  );
}
