interface TitleProps {
    content: React.ReactNode
}

export function Paragraph({content}: TitleProps){
    return(
        <div>
            <h1>{content}</h1>
        </div>
    );
}