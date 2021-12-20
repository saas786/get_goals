export type Item = {
  name: string;
  price: number;
  desc: string;
  itemUid: string;
};

export type Shop = {
  [uid: string]: Item;
};
