import React, { Component } from "react";
import { IDataTreeNodeProps, NodeInfo } from "./interface";
import { FaMinus, FaArrowDown, FaArrowRight, } from "react-icons/fa";
import './tree-view.css';

interface TreeNodeState {
    isExpand: boolean;
    icon: React.ReactNode;
    isSelected: boolean;
}
export class TreeNode extends Component<IDataTreeNodeProps, TreeNodeState>{
    constructor(props: any) {
        super(props);
    }
    state = {
        isExpand: false,
        icon: <FaArrowRight />,
        isSelected: false
    }

    drawIcon(node: NodeInfo) {
        console.log(node.children?.length)
        return <div className='node-icon'>
            <button className="btn-icon" style={{ backgroundColor: '#d2f4f7' }} onClick={() => {
                console.log("click")
                this.setState({ isExpand: !this.state.isExpand})
                console.log(this.state)
            }}>
                {
                    node.children?.length == 0 ? <FaMinus /> :
                        (this.state.isExpand ? <FaArrowDown /> : <FaArrowRight />)
                }
            </button></div>
    }
    drawName(node: NodeInfo) {
        return <div className="node-name" onClick={() => {
            this.props.onNodeClick &&
                this.props.onNodeClick(node);
            this.setState({ isSelected: true })
        }}>{node.name}</div>
    }
    // this.state.isSelected ? "#d2f4f7":
    renderNode(node: NodeInfo) {
        return <div className="node-its" style={{ backgroundColor: "none", marginLeft: `${node.level && node.level * 20}px` }}>
            {this.drawIcon(node)}
            {this.drawName(node)}
        </div>

    }

    render() {
        console.log(this.props.node)
        return (
            <React.Fragment>
                {this.renderNode(this.props.node)}
                {this.state.isExpand && this.props.node.children && this.props.node.children.map((childNode) => {
                    let newLevel = this.props.node.level && this.props.node.level + 1;
                    return <TreeNode node={{ ...childNode, level: newLevel }} ></TreeNode>
                }
                )}
            </React.Fragment>

        )

    }
}

