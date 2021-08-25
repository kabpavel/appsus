const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
//import { AppFooter } from './cmps/AppFooter.jsx';
//import { AppHeader } from './cmps/AppHeader.jsx';
// import { UserMsg } from './cmps/UserMsg.jsx';
// import { About } from './pages/About.jsx';
import { AppsusApp } from './js/pages/appsus-app.jsx';
import { Home } from './js/pages/app-home.jsx';
export function App() {
  return (
    <Router>
      <header>
        {/* <AppHeader/> */}
      </header>
      <main>
        <Switch>
          <Route path="/appsus" component={AppsusApp} />
          <Route path="/" component={Home} />
        </Switch>
      </main>
      <footer>
        {/* <AppFooter/> */}
      </footer>
      {/* <UserMsg/> */}
    </Router>
  );
}
