import * as React from 'react';

export function Hello ({name = 'world'}) {
    return (
        <h1>Hello {name}!!</h1>
    );
}

export function SomeSection (props: any) {
    return props.children;
}


export const meaningOfLife = 42;