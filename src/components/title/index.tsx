interface TitleProps {
    children: React.ReactNode
}

export function Title({children}: TitleProps){
    return(
        <div>
            <h1>{children}</h1>
        </div>
    );
}