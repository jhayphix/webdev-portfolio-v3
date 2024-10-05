// ... React modules
import { createContext } from "react";

// ... Context

// ... Components

// ... Assets
import navigation_db from "@data/navigation_db";

/*
|----------------------------------------------------------------------------
|----------------------------------------------------------------------------
|----------------------------------------------------------------------------
*/
export const NavigationContext = createContext({
  nav_links: [],
  mobile_nav_links: [],
  base_route: "",

  home: {},
  about: {},
  experience: {},
  portfolio: {},
  dashboard: {},
  service: {},
  contact: {},

  // Custom url
  resume_path: "",
});

const NavigationContextProvider = ({ children }) => {
  /*
  |----------------------------------------
  | Extract navigations
  |----------------------------------------
  */

  const base_route = navigation_db?.base_route;

  const home = navigation_db?.home;
  const about = navigation_db?.about;
  const experience = navigation_db?.experience;
  const portfolio = navigation_db?.portfolio;
  const dashboard = navigation_db?.project;
  const service = navigation_db?.service;
  const contact = navigation_db?.contact;

  const nav_links = [home, about, experience, portfolio, service, contact];
  const mobile_nav_links = [about, experience, portfolio, service, contact];

  /*
  |----------------------------------------
  | Custom route
  |----------------------------------------
  */
  const resume_path = `${base_route}/documents/samuel_ablordeppey_webdev_resume.pdf`;
  const analytic_portfolio_url = "https://analytic-portfolio.vercel.app/";

  /*
  |----------------------------------------
  | Context
  |----------------------------------------
  */
  const context = {
    nav_links,
    mobile_nav_links,
    base_route,
    home,
    about,
    experience,
    portfolio,
    dashboard,
    service,
    contact,

    // Custom path
    resume_path,
    analytic_portfolio_url,
  };

  /*
  |----------------------------------------
  | Return jsx
  |----------------------------------------
  */
  return (
    <NavigationContext.Provider value={context}>
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationContextProvider;
