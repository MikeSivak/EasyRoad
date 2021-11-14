let stylesFooter = {
    // Main footer container styles
    mainBoxContainer: {
        backgroundColor: 'black',
        padding: '5em 2em',
    },

    // First grid styles
    firstGrid: {
        textAlign: 'left',
        color: '#6c757d',
    },
    firstGridLabel: {
        fontSize: '3em'
    },
    firstGridShareIconsBox: {
        color: '#6c757d',
        marginTop: '80px',
        '& .MuiSvgIcon-root': {
            fontSize: '3em'
        }
    },
    firstGridCopyright: {
        fontSize: '2em'
    },

    // Second grid styles
    secondGrid: {
        textAlign: 'left',
        color: 'white'
    },
    secondGridLabel: {
        fontSize: '2em'
    },
    secondGridMenuItems: {
        marginTop: '10px',
        '& .MuiBox-root': {
            fontSize: '1.5em',
        },
        '& .MuiBox-root > .MuiLink-root': {
            color: '#6c757d',
            textDecoration:'none',
        },
        '& .MuiBox-root > .MuiLink-root:hover': {
            color: 'white',
        },
    },
    secondGridDevLabel: {
        fontSize: '1.5em',
        marginTop: '40px',
    },
    secondGridDevInfo: {
        marginTop: '10px',
        '& .MuiLink-root': {
            color: '#6c757d',
            textDecoration:'none',
        },
        '& .MuiLink-root:hover': {
            color: 'white',
        },
        '& .MuiLink-root > .MuiBox-root.MuiBox-root-34': {
            marginLeft: '23px'
        }
    },

    // Third grid styles
    thirdGrid: {
        color: 'White',
        textAlign: 'center'
    },
    thirdGridLabel: {
        fontSize: '2em'
    },
    thirdGridLocation: {
        fontSize: '1.5em',
        marginTop: '10px',
        color: '#6c757d',
        '& .MuiLink-root': {
            color: '#6c757d',
            textDecoration:'none',
        },
        '& .MuiLink-root:hover': {
            color: 'white',
            textDecoration:'none',
        },
        '& .MuiLink-root > .MuiBox-root.css-0 > .MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium.css-i4bv87-MuiSvgIcon-root':{
            fontSize: '2.5em',
            color:'darkred'
        }
    }
}

export default stylesFooter;