type GuessOptionsProps = {
    askedQuestions: number[];
    handleClickonGuessOption: (index: number) => void;
    currentCard: any;
};

export function GuessOptions({
    askedQuestions,
    handleClickonGuessOption,
    currentCard,
}: GuessOptionsProps) {
    return (
        <div className="self-center rounded-xl w-60 p-2">
            <h1 className="mb-4">Dicas disponíveis:</h1>
            <div className="grid grid-cols-3 gap-2">
                {[...Array(currentCard.questions.length).keys()].map(
                    (question, index) => (
                        <button
                            onClick={e => handleClickonGuessOption(index)}
                            key={question}
                            className="w-12 h-12 justify-self-center bg-slate-950 rounded-full disabled:bg-slate-300 hover:bg-slate-600"
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
