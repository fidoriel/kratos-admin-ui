import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import HeaderComponent from "./components/header/header";
import FooterComponent from "./components/footer/footer";
import "./index.scss";
import { FluentProvider, webDarkTheme } from "@fluentui/react-components";
import { MessageBarComponent } from "./components/messages/messagebar";
import { getKratosAdminConfig } from "./config";

const IdentitiesSite = React.lazy(() => import("./sites/identities/identies"));
const CreateIdentitySite = React.lazy(
  () => import("./sites/identities/create/create"),
);
const ViewIdentitySite = React.lazy(
  () => import("./sites/identities/view/view"),
);
const EditIdentitySite = React.lazy(
  () => import("./sites/identities/edit/edit"),
);
const OverviewSite = React.lazy(() => import("./sites/overview"));

const container = document.getElementById("root");
const root = createRoot(container!);

// Load config to get basePath before rendering
getKratosAdminConfig().then((config) => {
  const basePath = config.basePath || "/";
  root.render(
    <React.StrictMode>
      <FluentProvider theme={webDarkTheme}>
        <Router basename={basePath}>
          <div className="outerDIV">
            <HeaderComponent />
            <div className="contentDIV">
              <MessageBarComponent></MessageBarComponent>
              <Suspense fallback={<div> Loading...</div>}>
                <Switch>
                  <Route path="/identities/create">
                    <CreateIdentitySite />
                  </Route>
                  <Route path="/identities/:id/view">
                    <ViewIdentitySite />
                  </Route>
                  <Route path="/identities/:id/edit">
                    <EditIdentitySite />
                  </Route>
                  <Route path="/identities">
                    <IdentitiesSite />
                  </Route>
                  <Route path="/overview">
                    <OverviewSite />
                  </Route>
                  <Redirect
                    from="*"
                    to="/identities"
                  />
                </Switch>
              </Suspense>
            </div>
            <FooterComponent></FooterComponent>
          </div>
        </Router>
      </FluentProvider>
    </React.StrictMode>,
  );
});
