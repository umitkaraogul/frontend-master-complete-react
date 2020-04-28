import React, { lazy, Suspense } from "react";
import "./styles.css";
import { Router } from "@reach/router";

import NavBar from "./NavBar";

import { Provider } from "react-redux";
import store from "./store";

const Details = lazy(() => import("./Details"));
const SearchParams = lazy(() => import("./SearchParams"));

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <NavBar />
        <Suspense fallback={<h1>loading route …</h1>}>
          <Router>
            <SearchParams path="/" />
            <Details path="/details/:id" />
          </Router>
        </Suspense>
      </div>
    </Provider>
  );
};

export default App;
