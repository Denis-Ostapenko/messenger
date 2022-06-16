import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

export function CreateIcon({ component, ...props }: any): JSX.Element {
    return <SvgIcon {...props}>{component}</SvgIcon>;
}
