interface GuessComponentProps {
    handleQuestionAnswered: (event: any) => void;
    wrongAnswers: number;
    usedTips: number;
    askedQuestions: number[];
}
export default function GuessComponent({
    handleQuestionAnswered,
    wrongAnswers,
    usedTips,
    askedQuestions,
}: GuessComponentProps) {
    return (
        <div className="self-center bg-white rounded-xl w-80 p-3 flex flex-col items-center">
            <form onSubmit={handleQuestionAnswered} className="w-72" autoComplete="off" >
                <input
                    type="text"
                    name="answer"
                    placeholder="Digite seu palpite aqui..."
                    className="text-center w-full h-10 text-xl border-slate-600 rounded-full mb-2"
                />
                <div>
                    <button className="w-full h-10 bg-slate-950 rounded-xl hover:bg-slate-600">
                        <h1 className="text-xl text-white">{'Responder'}</h1>
                    </button>
                </div>
            </form>
            <div className="mt-4">
                <h1> Palpites Errados: {wrongAnswers}</h1>
                <h1> Dicas Usadas: {usedTips}</h1>
            </div>
        </div>
    );
}
