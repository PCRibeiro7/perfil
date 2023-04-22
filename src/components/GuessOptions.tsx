type GuessOptionsProps = {
    askedQuestions: number[];
    handleClickonGuessOption: (index: number) => void;
    currentCard: any;
};

export default function GuessOptions({
    askedQuestions,
    handleClickonGuessOption,
    currentCard,
}: GuessOptionsProps) {
    return (
        <div className="rounded-xl p-2">
            <h1 className="text-xl mb-4 text-slate-400">Dicas disponíveis:</h1>
            <div className="grid grid-cols-3 gap-2">
                {[...Array(currentCard.questions.length).keys()].map(
                    (question, index) => (
                        <button
                            onClick={e => handleClickonGuessOption(index)}
                            key={question}
                            className="w-full h-12 justify-self-center rounded-md bg-slate-950 disabled:bg-slate-300 hover:bg-slate-600"
                            disabled={askedQuestions.includes(index)}
                        >
                            <h1 className="text-xl text-slate-100">
                                {index + 1}
                            </h1>
                        </button>
                    ),
                )}
            </div>
        </div>
    );
}
