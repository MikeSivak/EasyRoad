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
            fontSize: '1.5em'
        },
        '& .MuiBox-root > .MuiLink-root': {
            color: '#6c757d'
        }
    },
    secondGridDevLabel: {
        fontSize: '1.5em',
        marginTop: '40px',
    },
    secondGridDevInfo: {
        marginTop: '10px',
        '& .MuiLink-root': {
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
            color: '#6c757d'
        },
        '& .MuiLink-root > .MuiBox-root.MuiBox-root-42 > .MuiSvgIcon-root': {
            fontSize: '2.5em',
            color: 'darkred'
        }
    }
}

export default stylesFooter;