import React from 'react'
export default function imoocForm(Comp){
	return class WrapperComp extends React.Component{
		constructor(props){
			super(props)
			this.state = {}
			this.handlerChange = this.handlerChange.bind(this)
		}
		handlerChange(key,val){
			this.setState({
				[key]:val
			})
		}
		render(){
			return <Comp handlerChange={this.handlerChange} state={this.state} {...this.props}></Comp>
		}
	}
}