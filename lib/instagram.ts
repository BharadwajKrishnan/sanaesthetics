// Featured posts from @san_aesthetixs. To add one, copy the ID from its URL
// (instagram.com/reel/<id>/ or instagram.com/p/<id>/) and add a line here.
// To play an original file instead of the Instagram embed, put it in
// public/videos/ and set `src: "/videos/your-file.mp4"`.
export type InstagramItem = {
  id: string;
  kind: "reel" | "post";
  title: string;
  note: string;
  src?: string;
};

export const reels: InstagramItem[] = [
  {
    id: "C3esPAeNDaJ",
    kind: "reel",
    title: "Thin-crust pizza from scratch",
    note: "Caramelised red onion, small mushrooms, corn and a jalapeño sauce hot enough to need yoghurt on the side.",
  },
  {
    id: "C_XntLVtdg4",
    kind: "reel",
    title: "Sunday brunch toast",
    note: "Crisp sourdough, avocado, cheese and a spiced spread, finished with chilli salt.",
  },
];

export const posts: InstagramItem[] = [
  {
    id: "DasIUqAjRuK",
    kind: "post",
    title: "A housewarming menu",
    note: "Part made from scratch, part ready-made, planned so the cook gets to sit down too.",
  },
  {
    id: "DZwrx8WtNdF",
    kind: "post",
    title: "Ghee toast, black salt, chilli",
    note: "Sourdough toasted in ghee, avocado, kala namak and chilli flakes.",
  },
  {
    id: "DcI7606CZfy",
    kind: "post",
    title: "A cottage kitchen in Kerala",
    note: "A pottery studio in the woods near Thrissur, and the kitchen its meals come from.",
  },
];
