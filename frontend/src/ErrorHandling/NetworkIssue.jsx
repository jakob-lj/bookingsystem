import React from 'react'

export default class NetworkIssue extends React.Component {

    constructor(props) {
        super(props) 
        this.errCode = props.error
        this.ErrorHandling = this.ErrorHandling.bind(this)
    }

    ErrorHandling() {
        if (this.errCode.toString() === 'Error: 404') {
            return <div>
                Tjenesten er ikke tilgjengelig akkurat nå
            </div>
        } else {
            return <div>
                Det skjedde en feil
            </div>
        }
    }

    render() {
        if (this.errCode !== null) {
            return <this.ErrorHandling />
        } else {
            return <div>
                {this.props.children}
            </div>

        }
    }
}