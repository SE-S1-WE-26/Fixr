import { images,icons } from "../constants";

export const EarningsList = [
  {
    id: 1,
    job: "1",
    duration: 3,
    date: "2021-09-01",
    earnings: 2300.0,
  },
  {
    id: 2,
    job: "2",
    duration: 5,
    date: "2021-09-02",
    earnings: 3500.0,
  },
  {
    id: 3,
    job: "3",
    duration: 2,
    date: "2021-09-03",
    earnings: 1500.0,
  },
  {
    id: 4,
    job: "4",
    duration: 4,
    date: "2021-09-04",
    earnings: 3000.0,
  },
  {
    id: 5,
    job: "5",
    duration: 6,
    date: "2021-09-05",
    earnings: 4500.0,
  },
];

export const RecommendedJobs = [
  {
    id: 1,
    name: "Leaky Kithen Sink",
    type: "Plumbing",
    location: "Malabe, Sri Lanka",
    description: "Leaky kitchen sink needs to be fixed",
    duration: 3,
    cost: 2000.0,
  },
];

export const Categories = [
  {
    icon: images.plumbing,
    title: "Plumbing",
  },
  {
    icon: images.roofing,
    title: "Roofing",
  },
  {
    icon: images.painting,
    title: "Painting",
  },
  {
    icon: images.electrical,
    title: "Electrical",
  },
];

export const TopWorkers = [
  {
    id: 1,
    name: "Janaka Tennakoon",
    image: icons.worker,
    type: "Plumbing",
    location: "Malabe, Sri Lanka",
    rating: 4.5,
    earnings: "120,000.00",
    fav: true,
  },
  {
    id: 2,
    name: "Kamal Perera",
    image: icons.worker,
    type: "Roofing",
    location: "Kaduwela, Sri Lanka",
    rating: 4.0,
    earnings: "90,000.00",
    fav: false,
  },
  {
    id: 3,
    name: "Sunil Silva",
    image: icons.worker,
    type: "Painting",
    location: "Kottawa, Sri Lanka",
    rating: 4.8,
    earnings: "150,000.00",
    fav: false,
  },
  {
    id: 4,
    name: "Saman Kumara",
    image: icons.worker,
    type: "Electrical",
    location: "Homagama, Sri Lanka",
    rating: 4.2,
    earnings: "100,000.00",
    fav: true,
  },
]