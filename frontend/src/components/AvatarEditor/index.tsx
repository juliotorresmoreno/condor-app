

import React, { PureComponent, Fragment, CSSProperties } from "react";
import Avatar from "react-avatar-edit";
import Button from "reactstrap/lib/Button";

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
}

const styles: StylesProps = {
    buttons: {
        marginBottom: 5,
        position: 'absolute'
    }
}

class AvatarEditor extends PureComponent<PropsType, any> {

    handleCapture = () => {
        alert('ds');
    }

    render() {
        return (
            <Fragment>
                {this.props.src ?
                    <Button
                        onClick={this.handleCapture}
                        style={styles.buttons}>
                        <i className="fas fa-camera"></i>&nbsp;
                        Capture
                    </Button> : false}
                <Avatar
                    img={this.props.img}
                    src={this.props.src}
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
        )
    }
}

export default AvatarEditor;