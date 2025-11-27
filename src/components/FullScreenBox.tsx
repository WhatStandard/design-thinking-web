import React, {PropsWithChildren} from 'react';

type Props = {
    style?: React.CSSProperties,
};

export default function FullScreenBox({ children, style } : PropsWithChildren<Props>) {
    return <div style={{
        ...style,
        width: '100vw', 
        height: '100vh'
    }}>
        { children }
    </div>
}