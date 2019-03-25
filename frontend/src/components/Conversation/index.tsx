
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import Card from 'reactstrap/lib/Card';
import Input from 'reactstrap/lib/Input';
import Button from 'reactstrap/lib/Button';


interface PropsType {
    disabled?: boolean
}

interface PropsTypeExtend extends PropsType {

}

const mapProps = (state: any) => ({

});

class OConversation extends PureComponent<PropsType, any> {
    
    static defaultProps = {
        disabled: false
    }

    render() {
        return (
            <Fragment>
                <div className="container-card-conversation">
                    <Card body className="card-conversation">

                    </Card>

                    <div className="chat-input-container">
                        <Input disabled={this.props.disabled} />
                        <Button disabled={this.props.disabled}>send</Button>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const ConversationConnected = connect(mapProps)(OConversation);

const Conversation = (props: PropsType) => <ConversationConnected {...props} />;

export default Conversation;