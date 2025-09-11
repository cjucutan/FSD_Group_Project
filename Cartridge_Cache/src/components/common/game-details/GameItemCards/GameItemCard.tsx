interface GameItemCardProps {
    title: string;
    data: string[];
}

export function GameItemCard({ data, title }: GameItemCardProps) {
    return (
        <div>
            <span>{title}</span>
            {data.map((x, i) => (
                <div key={i}>{x}</div>
            ))}
        </div>
    )
}