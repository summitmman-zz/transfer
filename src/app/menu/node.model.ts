export interface Menu {
    label: string;
    icon: string;
    url?: string;
    children?: Menu[];
    isRoot?: boolean
    isItemExpanded?: boolean
}