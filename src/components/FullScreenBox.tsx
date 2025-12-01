import React, {PropsWithChildren} from 'react';

type Props = {
    style?: React.CSSProperties,
    overflowOK?: boolean
};

export default function FullScreenBox({ children, style, overflowOK } : PropsWithChildren<Props>) {
    return <div style={{
        ...style,
        width: '100vw', 
        height: overflowOK ? 'auto' : '100vh',
        overflow: overflowOK ? 'auto' : 'hidden',
    }}>
        { children }
    </div>
}