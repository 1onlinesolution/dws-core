export interface IProductFeature {
    label: string;
    description: string;
    available: boolean;
}
export declare class ProductFeature implements IProductFeature {
    label: string;
    description: string;
    available: boolean;
    constructor({ label, description, available }: {
        label?: string | undefined;
        description?: string | undefined;
        available?: boolean | undefined;
    });
}
