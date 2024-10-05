// Use this context
// import { ProjectContext } from "@contexts/ProjectContextProvider.jsx";

// ... React modules
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";

// ... Context

// ... Components

// ... Assets
// import { fetchPosts, fetchProjectCategories } from "@src/fetch.js";
import { fetchProjects, fetchProjectTypes } from "@src/fetchProject.js";

export const ProjectContext = createContext({
  active_project_tab_index: "",
  setProjectTabIndex: () => {},
  active_project: "",
  setActiveProject: () => {},

  active_project_tab_name: "",
  setActiveProjectTabName: () => {},
  changeProjectCategory: () => {},

  projectTabs: [],
  projects: [],
  filteredProjects: [],

  posts: [],
  setPosts: () => {},
  loadPosts: () => {},
  project_is_loading: true,
  setProjectIsLoading: () => {},
  projectIdMap: {},
  setProjectIdMap: () => {},
});

/*
  |----------------------------------------------------------------------------
  |----------------------------------------------------------------------------
  |----------------------------------------------------------------------------
*/
const ProjectContextProvider = ({ children }) => {
  /*
  |----------------------------------------
  | Project config
  |----------------------------------------
  */

  // Context

  // Base config
  const navigate = useNavigate();

  // Set states
  const [active_project, setActiveProject] = useState({});
  const [active_project_tab_index, setProjectTabIndex] = useState(0);

  const [active_project_tab_name, setActiveProjectTabName] = useState("all");
  const [posts, setPosts] = useState([]);
  const [project_is_loading, setProjectIsLoading] = useState(true);
  const [projectTabs, setProjectTabs] = useState(["All"]);
  const [projectIdMap, setProjectIdMap] = useState({});

  /*
  |----------------------------------------
  | Fetch Data
  |----------------------------------------
  */
  // Fetch all posts (Projects)
  const loadPosts = async () => {
    setProjectIsLoading(true);
    // const fetchedPosts = await fetchPosts();
    const fetchedPosts = await fetchProjects();
    setPosts(fetchedPosts);
    setProjectIsLoading(false);
  };
  // Fetch project's categories eg. Excel, Python, Timeseries
  const loadProjectCategories = async () => {
    // const fetchedCategories = await fetchProjectCategories();
    const fetchedCategories = await fetchProjectTypes();
    console.log(fetchedCategories)
    const titlesArray = [
      "All",
      ...fetchedCategories?.map((item) => item.title),
    ];
    setProjectTabs(titlesArray);
  };
  // Lood the posts (Projects)
  useEffect(() => {
    loadPosts();
    loadProjectCategories();
  }, []);

  /*
  |----------------------------------------
  | Filter projects
  |----------------------------------------
  */
  // Filter projects base on selected project_type or tab clicked
  const projects = posts;
  const filteredProjects =
    active_project_tab_name === "all"
      ? projects
      : projects?.filter((project) =>
          project?.project_types?.some(
            (cat) =>
              cat?.title?.toLowerCase() ===
              active_project_tab_name?.toLowerCase()
          )
        );

  /*
  |----------------------------------------
  | Working with short url
  |----------------------------------------
  */
  const generateShortId = (projectId) => {
    const bufferId = Buffer.from(projectId).toString("base64");
    return bufferId.substring(0, 8);
  };

  // On initial load or when projects change, create the projectIdMap
  useEffect(() => {
    const map = {};
    projects?.forEach((project) => {
      const shortId = generateShortId(project?._id);
      map[shortId] = project._id;
    });
    setProjectIdMap(map);
  }, [projects]);

  /*
  |----------------------------------------
  | Tabs and Categories
  |----------------------------------------
  */
  // Get the tab which is clicked's index and type

  // Change selected project tpye (eg. Personal) when different tab is clicked
  const changeProjectCategory = (active_project_tab_name) => {
    const project_category = active_project_tab_name?.toLowerCase();
    setActiveProjectTabName(project_category);

    projectTabs?.forEach((tab) => {
      if (tab?.toLowerCase() === project_category) {
        const index = projectTabs?.indexOf(tab);
        setProjectTabIndex(index);
      }
    });
  };

  /*
  |----------------------------------------
  | Context
  |----------------------------------------
  */
  const context = {
    active_project_tab_index,
    setProjectTabIndex,
    active_project,
    setActiveProject,

    active_project_tab_name,
    setActiveProjectTabName,
    changeProjectCategory,
    filteredProjects,

    generateShortId,
    navigate,

    posts,
    setPosts,
    loadPosts,

    project_is_loading,
    setProjectIsLoading,
    projectTabs,
    projects,
    projectIdMap,
    setProjectIdMap,
  };

  /*
  |----------------------------------------
  | Return jsx
  |----------------------------------------
  */
  return (
    <ProjectContext.Provider value={context}>
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContextProvider;
