// Featured posts from @san_aesthetixs. To add one, copy the ID from its URL
// (instagram.com/reel/<id>/ or instagram.com/p/<id>/) and add a line here.
// To play an original file instead of the Instagram embed, put it in
// public/videos/ and set `src: "/videos/your-file.mp4"`. `tags` are the small
// labels shown above the title.
export type InstagramItem = {
  id: string;
  kind: "reel" | "post";
  title: string;
  note: string;
  tags?: string[];
  src?: string;
};

export const posts: InstagramItem[] = [
  {
    id: "C2IW8jEthVP",
    kind: "reel",
    title: "Filter coffee, Kumbakonam style",
    tags: ["Evening", "Brass filter"],
    note: "Decoction from a brass filter, with coffee powder carried over from Salem. A tea lover's occasional lapse.",
  },
  {
    id: "DcI7606CZfy",
    kind: "post",
    title: "A cottage kitchen in Kerala",
    tags: ["Stories"],
    note: "A pottery studio in the woods near Thrissur, and the kitchen its meals come from.",
  },
  {
    id: "C_Xm2vztjRb",
    kind: "post",
    title: "Roadside-style empty salna",
    tags: ["Street food"],
    note: "The spice plate for a roadside salna: cinnamon, cloves, cardamom, fennel, poppy seeds and cashews, with onion, tomato, mint and coriander.",
  },
];
