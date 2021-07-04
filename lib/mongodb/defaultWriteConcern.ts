export type IWriteConcern = {
  w: string;
  wtimeout: number;
};

export const DefaultWriteConcern: IWriteConcern = {
  w: 'majority',
  wtimeout: 100,
};
