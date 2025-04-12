import { useRecoilValue } from "recoil";
import { motivationAdviceSelector } from "@/recoilStore/recoilAtoms";

export default function MotivationTab() {
  const motivationAdvice = useRecoilValue(motivationAdviceSelector);
  const latestAdvice = motivationAdvice
    ? motivationAdvice[motivationAdvice.length - 1]
    : null;

  if (!latestAdvice)
    return (
      <div className="p-6 text-gray-500">No motivation advice available</div>
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Motivation & Mindset</h2>

      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-2">Summary</h3>
        <p className="text-gray-700">{latestAdvice.summary}</p>
      </div>

      {/* Immediate Strategies */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-3">Immediate Strategies</h3>
        <ul className="space-y-3">
          {latestAdvice.strategies?.immediate?.map((strategy, index) => (
            <li key={`immediate-${index}`} className="flex items-start">
              <span className="inline-block bg-blue-100 text-blue-800 rounded-full p-1 mr-2 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="text-gray-700">{strategy}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Long Term Strategies */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-3">Long-Term Strategies</h3>
        <ul className="space-y-3">
          {latestAdvice.strategies?.longTerm?.map((strategy, index) => (
            <li key={`longterm-${index}`} className="flex items-start">
              <span className="inline-block bg-green-100 text-green-800 rounded-full p-1 mr-2 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="text-gray-700">{strategy}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Motivation Boosters */}
      {latestAdvice.boosters?.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-3">Motivation Boosters</h3>
          <ul className="space-y-3">
            {latestAdvice.boosters.map((booster, index) => (
              <li key={`booster-${index}`} className="flex items-start">
                <span className="inline-block bg-yellow-100 text-yellow-800 rounded-full p-1 mr-2 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-gray-700">{booster}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recovery Tips */}
      {latestAdvice.recovery?.length > 0 && (
        <div>
          <h3 className="font-semibold text-lg mb-3">Recovery Strategies</h3>
          <ul className="space-y-3">
            {latestAdvice.recovery.map((tip, index) => (
              <li key={`recovery-${index}`} className="flex items-start">
                <span className="inline-block bg-purple-100 text-purple-800 rounded-full p-1 mr-2 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
