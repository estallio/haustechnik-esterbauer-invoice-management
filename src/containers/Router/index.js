import React from 'react';
import { Route, Switch, Redirect } from 'react-router';

import ROUTES from './routes';

import DocumentsPage from '../Pages/Documents';
import DocumentPage from '../Pages/Document';

import NoPageFoundPage from '../Pages/NoPageFound';

const Router = () => (
  <Switch>
    {/* if index.html is requested as fallback or as default route - route to / */}
    <Route exact path="/index.html" render={() => <Redirect to="/" />} />

    {/* default landing page should show all documents */}
    <Route exact path="/" render={() => <Redirect to={ROUTES.DOCUMENTS} />} />

    {/* the documents page requested at /documents renders the DocumentsPage component */}
    <Route exact path={ROUTES.DOCUMENTS} component={DocumentsPage} />

    {/* the document page requested at /document/documentId renders the DocumentPage component */}
    <Route path={ROUTES.DOCUMENT} component={DocumentPage} />

    {/* fallback notfound/404 page */}
    <Route component={NoPageFoundPage} />
  </Switch>
);

export default Router;
