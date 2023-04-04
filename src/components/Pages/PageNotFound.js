import React from 'react'
import Page from '../Page'
import { Typography } from '@material-ui/core'

export default function PageNotFound() {
    return (
        <Page center>
            <Typography component="h1" variant="h1" color="secondary">
                404 Page not Found
            </Typography>
        </Page>
    )
}