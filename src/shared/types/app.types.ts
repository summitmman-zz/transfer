import { AppInterfaces } from '../interfaces/app.interfaces';
import { AppEnums } from '../enums/app.enums';

export module AppTypes {
    export class TreeNode implements AppInterfaces.ITreeNode {
        private _id: number;
        private _name: string;
        private _isVisible: boolean;
        private _isExpand: boolean = false;
        private _children: Array<AppInterfaces.ITreeNode> = [];

        public constructor() { }

        public get id(): number {
            return this._id;
        }
        public set id(id: number) {
            this._id = id;
        }

        public get name(): string {
            return this._name;
        }
        public set name(name: string) {
            this._name = name;
        }

        public get isVisible(): boolean {
            return this._isVisible;
        }
        public set isVisible(isVisible: boolean) {
            this._isVisible = isVisible;
        }

        public get isExpand(): boolean {
            return this._isExpand;
        }
        public set isExpand(isExpand: boolean) {
            this._isExpand = isExpand;
        }

        public get children(): Array<AppInterfaces.ITreeNode> {
            return this._children;
        }
        public set children(children: Array<AppInterfaces.ITreeNode>) {
            this._children = children;
        }
    }

    export class ProcessNode implements AppInterfaces.IProcessNode {
        private _id: string;
        private _label: string;
        private _isExpanded: boolean;
        private _type: AppEnums.ProcessType;
        private _startTime: Date;
        private _endTime: Date;

        public constructor() { }

        public get id(): string {
            return this._id;
        }
        public set id(id: string) {
            this._id = id;
        }

        public get label(): string {
            return this._label;
        }
        public set label(label: string) {
            this._label = label;
        }

        public get isExpanded(): boolean {
            return this._isExpanded;
        }
        public set isExpanded(isExpanded: boolean) {
            this._isExpanded = isExpanded;
        }

        public get type(): AppEnums.ProcessType {
            return this._type;
        }
        public set type(type: AppEnums.ProcessType) {
            this._type = type;
        }

        public get startTime(): Date {
            return this._startTime;
        }
        public set startTime(startTime: Date) {
            this._startTime = startTime;
        }

        public get endTime(): Date {
            return this._endTime;
        }
        public set endTime(endTime: Date) {
            this._endTime = endTime;
        }
    }

    export class ProcessLink implements AppInterfaces.IProcessLink {
        private _source: string;
        private _target: string;
        private _label?: string;

        public constructor() { }

        public get source(): string {
            return this._source;
        }
        public set source(source: string) {
            this._source = source;
        }

        public get target(): string {
            return this._target;
        }
        public set target(target: string) {
            this._target = target;
        }

        public get label(): string {
            return this._label;
        }
        public set label(label: string) {
            this._label = label;
        }
    }

    export class Dictionary<k,v> implements AppInterfaces.IDictionary<k,v> {
        private _key: k;
        private _value: v;

        public constructor() { }

        public get key(): k {
            return this._key;
        }
        public set key(key: k) {
            this._key = key;
        }

        public get value(): v {
            return this._value;
        }
        public set value(value: v) {
            this._value = value;
        }
    }
}