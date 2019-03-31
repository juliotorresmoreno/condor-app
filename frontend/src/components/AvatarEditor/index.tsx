

import React, { PureComponent, Fragment, CSSProperties } from "react";
import Avatar from "react-avatar-edit";
import Button from "reactstrap/lib/Button";
import TabContent from "reactstrap/lib/TabContent";
import TabPane from "reactstrap/lib/TabPane";
import Webcam from "react-webcam";
interface PropsType {

    /**
     * The Image object to display
     */
    img?: HTMLImageElement;

    /**
     * The url ot base64 string to load (use urls from your domain to prevent security errors)
     */
    src?: string;

    /**
     * The width of the editor
     */
    width: number;

    /**
     * The height of the editor (image will fit to this height)
     */
    height: number;

    /**
     * The crop area radius in px (
     * Default: 100
     */
    cropRadius?: number;

    /**
     * The crop border color
     * Default: white
     */
    cropColor?: string;

    /**
     * The crop border width
     * Default: 4
     */
    lineWidth?: number;

    /**
     * The min crop area radius in px
     * Default: 30
     */
    minCropRadius?: number;

    /**
     * The color of the image background
     * Default: white
     */
    backgroundColor?: string;

    /**
     * The close button color
     * Default: white
     */
    closeIconColor?: string;

    /**
     * The shading color
     * Default: grey
     */
    shadingColor?: string;

    /**
     * The shading area opacity
     * Default: 0.6
     */
    shadingOpacity?: number;

    /**
     * The mime types used to filter loaded files
     * Default: image/jpeg, image/png
     */
    mimeTypes?: string;

    /**
     * Label text
     * Default: Choose a file
     */
    label?: string;

    /**
     * The style object for preview label
     */
    labelStyle?: React.CSSProperties;

    /**
     * The style for object border preview
     */
    borderStyle?: React.CSSProperties;

    /**
     * Invoked when image based on src prop finish loading
     */
    onImageLoad?: (data: HTMLImageElement) => void;

    /**
     * Invoked when user drag&drop event stop and return croped image in base64 sting
     */
    onCrop?: (data: HTMLImageElement) => void;

    /**
     * Invoked when user upload file with internal file loader
     */
    onFileLoad?: (data: HTMLImageElement) => void;

    /**
     * Invoked when user clock on close editor button
     */
    onClose?: () => void;
}

interface StylesProps {
    buttons: CSSProperties
    buttonsRight: CSSProperties
    backgroundWebcam: CSSProperties
    buttonsContainer: CSSProperties
}

const styles: StylesProps = {
    buttons: {
        marginBottom: 5,
        zIndex: 100,
        width: 120
    },
    buttonsRight: {
        marginBottom: 5,
        zIndex: 100,
        width: 120,
        float: 'right'
    },
    buttonsContainer: {
        marginTop: -5,
        backgroundColor: 'white'
    },
    backgroundWebcam: {
        backgroundColor: '#CCC',
        marginTop: 5
    }
}

interface StateProps {
    tab: number
    src: string
}

class AvatarEditor extends PureComponent<PropsType, any> {

    state: StateProps = {
        tab: 1,
        src: ''
    }

    webcam: Webcam | undefined

    handleCapture = () => {

    }

    toggle = () => {
        this.setState({
            tab: this.state.tab === 1 ? 2 : 1
        });
    }

    setRef = (webcam: any) => {
        this.webcam = webcam;
    };

    handleCaptureClick = () => {
        if(!this.webcam) return;
        const src = this.webcam.getScreenshot();
        this.setState({
            src: src,
            tab: 1
        });
    }

    renderAvatar = () => {
        return (
            <Fragment>
                {this.state.tab === 1 && !this.props.src ?
                    <Button
                        onClick={this.toggle}
                        style={styles.buttons}>
                        <i className="fas fa-camera"></i>&nbsp;
                        Capture
                    </Button> : false}

                <Avatar
                    img={this.props.img}
                    src={this.state.src || this.props.src}
                    width={this.props.width}
                    height={this.props.height}
                    cropRadius={this.props.cropRadius}
                    cropColor={this.props.cropColor}
                    lineWidth={this.props.lineWidth}
                    minCropRadius={this.props.minCropRadius}
                    backgroundColor={this.props.backgroundColor}
                    closeIconColor={this.props.closeIconColor}
                    shadingColor={this.props.shadingColor}
                    shadingOpacity={this.props.shadingOpacity}
                    mimeTypes={this.props.mimeTypes}
                    label={this.props.label}
                    labelStyle={this.props.labelStyle}
                    borderStyle={this.props.borderStyle}
                    onImageLoad={this.props.onImageLoad}
                    onCrop={this.props.onCrop}
                    onFileLoad={this.props.onFileLoad}
                    onClose={this.props.onClose}
                />
            </Fragment>
        );
    }

    renderWebcam = () => {
        return (
            <div style={styles.backgroundWebcam}>
                <div style={styles.buttonsContainer}>
                    <Button
                        onClick={this.toggle}
                        style={styles.buttons}>
                        <i className="fas fa-upload"></i>&nbsp;
                        Upload
                    </Button>
                    <Button
                        onClick={this.handleCaptureClick}
                        style={styles.buttonsRight}>
                        <i className="fas fa-camera"></i>&nbsp;
                        Capture
                    </Button>
                </div>
                <Webcam
                    ref={this.setRef}
                    audio={false}
                    height={this.props.height-7}
                    screenshotFormat="image/jpeg"
                    width={this.props.width}
                />
            </div>
        );
    }

    render() {
        return (
            <Fragment>
                {this.state.tab === 1 ?
                    this.renderAvatar() :
                    this.renderWebcam()}
            </Fragment>
        )
    }
}

export default AvatarEditor;