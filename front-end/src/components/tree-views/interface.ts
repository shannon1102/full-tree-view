import * as React from 'react';

export enum TreeViewType {
    SingleSelectTreeViewType,
    MultiSelectTreeViewType
}

export interface NodeInfo {
    id:string;
    level?: number 
    name: string;
    code: string;
    children?: NodeInfo[];
    isSelected?: boolean;
}

export interface ITreeNodeBehavior {
    onNodeClick?: (node: NodeInfo) => void;
    onToggle?: (node: NodeInfo) => void;
}
export interface ISymbolStyle {
    color?: string;
    backgroundColor?: string;
    icon?: string;
}
export interface INodeNameStyle {
    fontFamily?: string;
    color?: string;
}
export interface ITreeNodeStyles extends ISymbolStyle, INodeNameStyle {

}
export interface IDataTreeNodeProps extends ITreeNodeStyles, ITreeNodeBehavior {
    node: NodeInfo,
   
}
export interface IDataTreeViewProps extends ITreeNodeBehavior {
    nodes: NodeInfo[]
}
