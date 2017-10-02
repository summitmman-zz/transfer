import { AppEnums } from '../enums/app.enums';
export module AppInterfaces {
    export interface ITreeNode {
        id: number;
        name: string;
        isVisible: boolean;
        isExpand: boolean;
        children: Array<ITreeNode>;
    }
    export interface IProcessNode {
        id: string;
        label: string;
        isExpanded: boolean;
        type: AppEnums.ProcessType;
        startTime: Date;
        endTime: Date;
    }
    export interface IProcessLink {
        source: string;
        target: string;
        label?: string;
    }
    export interface IDictionary<k,v> {
        key: k;
        value: v;
    }
}