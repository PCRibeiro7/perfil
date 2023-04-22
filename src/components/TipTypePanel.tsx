type TipTypePanelProps = {
    currentCard: any;
};
export default function TipTypePanel({ currentCard }: TipTypePanelProps) {
    return (
        <div className="bg-white rounded-xl p-2">
            <h1 className="text-xl text-slate-400">{'Sou um(a) ... '}</h1>
            <h1 className="text-3xl mt-2">{currentCard.type}</h1>
        </div>
    );
}
