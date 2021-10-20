import { Amount } from '././amount';
import { ChargeType } from '././chargeType';
export declare class TaskCreateOrUpdate {
    /**
    * Name of the task. Max length 100 characters.
    */
    'name': string;
    'rate': Amount;
    'chargeType': ChargeType;
    /**
    * Estimated time to perform the task. EstimateMinutes has to be greater than 0 if provided.
    */
    'estimateMinutes'?: number;
    static discriminator: string | undefined;
    static attributeTypeMap: Array<{
        name: string;
        baseName: string;
        type: string;
    }>;
    static getAttributeTypeMap(): {
        name: string;
        baseName: string;
        type: string;
    }[];
}
