interface GameItemCardProps {
    title: string;
    data: string[];
}

export function GameItemCard({ data, title }: GameItemCardProps) {
    return (
        <div>
            <span className="game-title">{title}</span>
            {data.map((x, i) => (
                <div key={i} className="game-data">{x}</div>
            ))}
        </div>
    )
}