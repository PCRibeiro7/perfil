type TipTypePanelProps = {
    currentCard: any;
};
export function TipTypePanel({ currentCard }: TipTypePanelProps) {
    return (
        <div className="bg-white rounded-xl w-80 self-center p-2">
            <h1 className="text-2xl">{'Sou um(a) ... '}</h1>
            <h1 className="text-3xl mt-2">{currentCard.type}</h1>
        </div>
    );
}
