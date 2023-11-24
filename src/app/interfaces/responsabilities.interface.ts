export interface MatResp {
  id: number;
  updateDate: Date;
  establishment: string;
  status: string;
  itemList: ItemList[];
}

export interface ItemList {
  id: number;
  fullName: string;
  amountPend: number;
  amountPaid: number;
  active: boolean;
}
