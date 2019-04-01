

const BrowserDetection = function (): 'IE' | 'Safari' | 'Chrome' | 'Firefox' | 'Opera' | 'Unknow' {
    if (navigator.userAgent.search("Safari")) {
        return 'Safari';
    }
    else if (navigator.userAgent.search("Chrome")) {
        return 'Chrome';
    }
    else if (navigator.userAgent.search("Firefox")) {
        return 'Firefox';
    }
    else if (navigator.userAgent.search("Opera")) {
        return 'Opera';
    }
    else if (navigator.userAgent.search("MSIE")) {
        return 'IE';
    }
    return 'Unknow';
}

export default BrowserDetection;