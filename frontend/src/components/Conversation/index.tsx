
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import Card from 'reactstrap/lib/Card';
import Input from 'reactstrap/lib/Input';
import Button from 'reactstrap/lib/Button';
import * as chats from '../../actions/chats';
import { Message } from '../../reducers/chats';
import { StateProps as AuthProps } from '../../reducers/auth';

interface PropsType {
    chatID: string
    disabled?: boolean
}

interface PropsTypeExtend extends PropsType {
    dispatch: CallableFunction
    chatsCache: any
    auth: AuthProps
}

interface StateProps {
    text: string
}

const mapProps = (state: any) => ({
    auth: state.auth,
    chatsCache: state.chats.cache
});

class OConversation extends PureComponent<PropsTypeExtend, any> {

    static defaultProps = {
        disabled: false
    }

    state: StateProps = {
        text: ''
    }

    componentDidUpdate() {
        //if (!this.props.chatsCache[this.props.chatID]) {
        //this.props.dispatch(chats.load(this.props.chatID));
        //}
    }

    handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            text: evt.target.value
        });
    }

    handleKeyPress = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        if (this.state.text.length >= 1 && evt.key === 'Enter') {
            this.send();
        }
    }

    handleClickSend = async (evt: React.MouseEvent<Element, MouseEvent>) => {
        this.send();
    }

    send = async () => {
        await this.props.dispatch(chats.post(this.props.chatID, this.state.text));
        this.setState({
            text: ''
        });
    }

    renderMessage = (message: Message, key: number) => (
        <Fragment key={key}>
            {this.props.auth.username === message.user ?
                (
                    <div>
                        <span className="chatMe">
                            {this.props.auth.name} {this.props.auth.lastname}
                        </span>:{' '}
                        {message.text}
                    </div>
                ) :
                (
                    <div>
                        {message.text} :
                        <span className="chatMe">
                            {this.props.auth.name} {this.props.auth.lastname}:
                        </span>
                    </div>
                )}
        </Fragment>
    )

    render() {
        const messages = this.props.chatsCache[this.props.chatID] || [];
        return (
            <Fragment>
                <div className="container-card-conversation">
                    <Card body className="card-conversation">
                        {messages.map(this.renderMessage)}
                    </Card>

                    <div className="chat-input-container">
                        <Input
                            value={this.state.text}
                            disabled={this.props.disabled}
                            onKeyPress={this.handleKeyPress}
                            onChange={this.handleChange} />
                        <Button
                            onClick={this.handleClickSend}
                            disabled={this.props.disabled}>
                            Send
                        </Button>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const ConversationConnected = connect(mapProps)(OConversation);

const Conversation = (props: PropsType) => <ConversationConnected {...props} />;

export default Conversation;