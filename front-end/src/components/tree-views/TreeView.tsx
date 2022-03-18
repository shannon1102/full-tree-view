import { Component } from "react";
import { IDataTreeViewProps, NodeInfo } from "./interface";
import { TreeNode } from "./TreeNode";

interface TreeViewState {
    nodes: NodeInfo[],
    currentSelected: string;

}

export class TreeView extends Component<IDataTreeViewProps, TreeViewState>{
    constructor(props: any) {
        super(props);
    }
    state = {
        nodes: this.props.nodes,
        currentSelected: 'sdada'
    }
    handelIconClick(node: NodeInfo) {
        let tmpNode = this.state.nodes.find(e => e.id === node.id)

    }
    handelNameClick(node: NodeInfo) {
        console.log("NodeId", node)
        node.isSelected= true;
        // this.setState({
        //        nodes: this.state.nodes,
          
        // })
        console.log("NodeId", node)
        console.log("??",this.state.currentSelected)
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
            <TreeNode key={eachNode.id} node={{ ...eachNode, level: baseLevel + 1 }} onNodeClick={(eachNode) => this.handelNameClick(eachNode)} onToggle={() => { this.handelIconClick(eachNode) }}></TreeNode>
        )}
    </div>
}
}

