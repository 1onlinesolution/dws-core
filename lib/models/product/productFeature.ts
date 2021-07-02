
export interface IProductFeature {
  label: string;
  description: string;
  available: boolean;
}

export class ProductFeature implements IProductFeature {
  label = '';
  description = '';
  available = true;

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor({ label = '', description = '', available = true }) {
    this.label = label;
    this.description = description;
    this.available = available;

    return this;
  }
}