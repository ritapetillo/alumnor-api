import Assignment from "../../models/Activity/Assignment";
import Live from "../../models/Activity/Live";
import Materials from "../../models/Activity/Materials";
import Video from "../../models/Activity/Video";

export const live = "live";
export const materials = "materials";
export const assignment = "assignment";
export const video = "video";

export const createNewActivity = (category: string, body: {}) => {
  switch (category) {
    case live:
      return new Live(body);
    case assignment:
      return new Assignment(body);
    case video:
      return new Video(body);
    case materials:
      return new Materials(body);
    default:
      return new Materials(body);
  }
};
