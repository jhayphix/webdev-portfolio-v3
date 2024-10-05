import client from "@src/sanityClient.js";

// Function to fetch all posts/projects
export const fetchProjects = async () => {
  const query = `*[_type == "wdProject"] | order(published_at desc){
        _id,
        title,
        slug,
        description,
        project_types[]->{
          title
        },
        author->{
          name
        },
        main_image{
          asset->{
            url
          }
        },
        project_url,
        published_at,
      }`;

  try {
    const posts = await client.fetch(query);
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

// Funciton to fetch project categories eg. excel, python, timeseries
export const fetchProjectTypes = async () => {
  const query = `*[_type == "wdProjectType"] | order(order asc){
      _id,
      title,
      description,
      order
    }`;

  try {
    const categories = await client.fetch(query);
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
