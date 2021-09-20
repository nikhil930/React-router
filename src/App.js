import {Route , Switch ,Redirect } from 'react-router-dom'
import AllQuotes from './pages/AllQuotes';
import QuoteDetail  from './pages/QuoteDetail';
import  NewQuotes  from './pages/NewQuotes';
import Layout from './components/layout/Layout';

function App() {
  return (
    <Layout >
    <Switch>
      <Route path ='/' exact>
        <Redirect to='/quotes' />
        </Route>
      <Route path='/quotes' exact >
        <AllQuotes />
      </Route>
      <Route path='/quotes/:quoteId'>
       <QuoteDetail />
      </Route>
      <Route path='/new-quote'>
        <NewQuotes />
      </Route>
      <Route path='*'>
        <h1>Page Not Found</h1>
      </Route>
    </Switch>
    </Layout>
  );
}

export default App;
