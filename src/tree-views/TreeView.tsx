import { Component } from "react";
import { IDataTreeViewProps, NodeInfo } from "./interface";
import { TreeNode } from "./TreeNode";

interface TreeViewState {
    nodes: NodeInfo[],
    currentSelected: string;

}

export class TreeView extends Component<IDataTreeViewProps, TreeViewState>{
    constructor(props: any) {
        console.log("???")
        super(props);
    }
    state = {
        nodes: this.props.nodes,
        currentSelected: this.props.nodes[0].id
    }
    handelIconClick(node: NodeInfo) {
        let tmpNode = this.state.nodes.find(e => e.id === node.id)
        console.log(tmpNode)

    }
    handelNameClick(node: NodeInfo) {
        console.log("ALooo")
        console.log(this.state)
        this.setState({
            currentSelected: node.id
        })
        console.log(this.state)
    }

    treeTraversal(node: NodeInfo): any {
        if (node.children) {
            if (node.id == this.state.currentSelected) {
                return
            }
            for (let i = 0; i < node.children.length; i++) {
                return this.treeTraversal(node.children[i])
            }

        } else {
            return null
        }
    }
    render() {
        console.log(this.props.nodes)
        let baseLevel = 0;
        return <div className='tree-views'>

            {this.props.nodes.map(eachNode =>
                <TreeNode key={eachNode.id} node={{ ...eachNode, level: baseLevel + 1 }} onNodeClick={() => this.handelNameClick(eachNode)} onToggle={() => { this.handelIconClick(eachNode) }}></TreeNode>
            )}
        </div>
    }

}

