import { IconType } from "react-icons";
import { ImYoutube } from "react-icons/im";

import { TbFileSettings } from "react-icons/tb";
import { GrDocumentUser } from "react-icons/gr";

export interface guideItem {
  key: string;
  description: string;
  Icon: IconType;
  mainText: string;
}

export const guideItems: guideItem[] = [
  {
    key: "YouTube Link",
    description:
      "This complete video demonstration 🎥 offers an in-depth look at how the project operates in a production environment 🌐. It showcases key features, workflows, and functionalities, providing valuable insights into the user experience and overall performance of the system. 🚀✨",
    Icon: ImYoutube,
    mainText: "YouTube video demo",
  },
  {
    key: "User Guide",
    description:
      "This case study provides a comprehensive overview of the project's complete workflow 🔄, featuring detailed flowcharts 📊 that enhance your understanding of the project's processes and its associated business use case 💼. These visual aids will help clarify how each component interacts and contributes to overall success.",
    Icon: GrDocumentUser,
    mainText: "User Guide",
  },
  {
    key: "Technical Documentation",
    description:
      "Delivers an in-depth exploration of the technologies employed 💻, highlighting the best practices adopted throughout the development process 📊, as well as the specific optimizations implemented to enhance performance 🚀, security 🔒, and user experience 🌟.",
    Icon: TbFileSettings,
    mainText: "Technical documentation",
  },
  {
    key: "Setup Guide",
    description:
      "Are you interested in setting up this project on your local system? 🖥️ Here’s a thorough video tutorial 📹 that will guide you step by step through the entire setup process, ensuring you have everything configured correctly for optimal performance. 🔧✨",
    Icon: ImYoutube,
    mainText: "Local Setup Video",
  },
];
