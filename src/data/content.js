import CodeIcon from "@mui/icons-material/Code";
import CampaignIcon from "@mui/icons-material/Campaign";
import HandshakeIcon from "@mui/icons-material/Handshake";
import project1 from "../assets/project1.jpg";
import project2 from "../assets/project2.jpg";
import project3 from "../assets/project3.jpg";
import InstagramIcon from "@mui/icons-material/Instagram";
import profile from "../assets/profile.jpg";

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
    img: profile,
    name: "Mohib",
    designation: "CEO",
    social: {
      icon: InstagramIcon,
      link: "@Mohib",
    },
  },
  {
    id: "2",
    img: profile,
    name: "Hamza",
    designation: "CTO",
    social: {
      icon: InstagramIcon,
      link: "@Hamza",
    },
  },
  {
    id: "3",
    img: profile,
    name: "Danish",
    designation: "Head of Growth",
    social: {
      icon: InstagramIcon,
      link: "@Danish",
    },
  },
  {
    id: "4",
    img: profile,
    name: "Kinza",
    designation: "Head of Design",
    social: {
      icon: InstagramIcon,
      link: "@kinza",
    },
  },
];