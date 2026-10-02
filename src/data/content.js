import CodeIcon from "@mui/icons-material/Code";
import CampaignIcon from "@mui/icons-material/Campaign";
import HandshakeIcon from "@mui/icons-material/Handshake";
import project1 from "../assets/project1.jpg";
import project2 from "../assets/project2.jpg";
import project3 from "../assets/project3.jpg";
import InstagramIcon from "@mui/icons-material/Instagram";
import person1 from "../assets/person1.jpg";
import person2 from "../assets/person2.jpg";
import person3 from "../assets/person3.jpg";

export const services = [
  {
    id: "1",
    icon: CodeIcon,
    name: "Product Engineering",
    description: "lorem ispum uthepum denapum",
  },
  {
    id: "2",
    icon: CampaignIcon,
    name: "Growth Marketing",
    description: "lorem ispum uthepum denapum",
  },
  {
    id: "3",
    icon: HandshakeIcon,
    name: "Strategic Venture",
    description: "lorem ispum uthepum denapum",
  },
];

export const projects = [
  {
    id: "1",
    img: project1,
    name: "ShopSphere",
    description:
      "lorem ispum uthepum denapum ganepum aurpum lolepum janepum karepum",
    tags: {
      1: "React",
      2: "Node.js",
      3: "AI",
    },
  },
  {
    id: "2",
    img: project2,
    name: "FitTrack",
    description:
      "lorem ispum uthepum denapum ganepum aurpum lolepum janepum karepum",
    tags: {
      1: "React",
      2: "Node.js",
      3: "AI",
    },
  },
  {
    id: "3",
    img: project3,
    name: "Investo",
    description:
      "lorem ispum uthepum denapum ganepum aurpum lolepum janepum karepum",
    tags: {
      1: "React",
      2: "Node.js",
      3: "AI",
    },
  },
  {
    id: "4",
    img: project3,
    name: "Investo",
    description:
      "lorem ispum uthepum denapum ganepum aurpum lolepum janepum karepum",
    tags: {
      1: "React",
      2: "Node.js",
      3: "AI",
    },
  },
];
export const abouts = [
  {
    id: "1",
    img: person1,
    name: "Alex Carter",
    designation: "CEO",
    social: {
      icon: InstagramIcon,
      link: "@alex_carter",
    },
  },
  {
    id: "2",
    img: person2,
    name: "Maya Chen",
    designation: "CTO",
    social: {
      icon: InstagramIcon,
      link: "@maya_chen",
    },
  },
  {
    id: "3",
    img: person3,
    name: "Liam O'Connel",
    designation: "Head of Growth",
    social: {
      icon: InstagramIcon,
      link: "@liam_connel",
    },
  },
];
