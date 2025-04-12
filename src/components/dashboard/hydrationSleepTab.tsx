import { useRecoilValue } from "recoil";
import {
  hydrationAdviceSelector,
  sleepAdviceSelector,
} from "@/recoilStore/recoilAtoms";

export default function HydrationSleepTab() {
  const hydrationAdvice = useRecoilValue(hydrationAdviceSelector);
  const sleepAdvice = useRecoilValue(sleepAdviceSelector);

  const latestHydration = hydrationAdvice
    ? hydrationAdvice[hydrationAdvice.length - 1]
    : null;
  const latestSleep = sleepAdvice ? sleepAdvice[sleepAdvice.length - 1] : null;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Hydration & Sleep</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hydration Section */}
        <div className="border rounded-lg p-4 bg-white shadow-sm">
          <h3 className="font-semibold text-lg mb-3">Hydration</h3>
          {latestHydration ? (
            <>
              <div className="mb-4">
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Current Intake:</span>{" "}
                  {latestHydration.current?.amount
                    ? `${latestHydration.current.amount} ${latestHydration.current.unit}/day`
                    : "Insufficient"}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Target:</span>{" "}
                  {`${latestHydration.target.optimal} ${
                    latestHydration.current?.unit || "ml"
                  }/day`}
                </p>
                {/* {latestHydration.progress > 0 && (
                  <p className="text-gray-700">
                    <span className="font-medium">Progress:</span>{" "}
                    {Math.round(latestHydration.progress * 100)}%
                  </p>
                )} */}
              </div>
              <div>
                <h4 className="font-medium mb-2">Recommendations:</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {latestHydration.recommendations?.timing?.map((rec, i) => (
                    <li key={`timing-${i}`}>{rec}</li>
                  ))}
                  {latestHydration.recommendations?.quality?.map((rec, i) => (
                    <li key={`quality-${i}`}>{rec}</li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <p className="text-gray-500">No hydration advice available</p>
          )}
        </div>

        {/* Sleep Section */}
        <div className="border rounded-lg p-4 bg-white shadow-sm">
          <h3 className="font-semibold text-lg mb-3">Sleep</h3>
          {latestSleep ? (
            <>
              <div className="mb-4">
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Current Duration:</span>{" "}
                  {latestSleep.current?.duration
                    ? `${latestSleep.current.duration} hours/night`
                    : "Not recorded"}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Sleep Quality:</span>{" "}
                  {latestSleep.current?.quality
                    ? `${latestSleep.current.quality}/10`
                    : "Not recorded"}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Target Duration:</span>{" "}
                  {`${latestSleep.target.duration} hours/night`}
                </p>
                {latestSleep.target.windows && (
                  <p className="text-gray-700">
                    <span className="font-medium">Recommended Window:</span>{" "}
                    {`${latestSleep.target.windows.bedtime} - ${latestSleep.target.windows.wakeup}`}
                  </p>
                )}
              </div>
              <div>
                <h4 className="font-medium mb-2">Improvement Plan:</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {latestSleep.improvement?.plan?.map((item, i) => (
                    <li key={`plan-${i}`}>{item}</li>
                  ))}
                </ul>

                <h4 className="font-medium mt-3 mb-2">Environment Tips:</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {latestSleep.improvement?.environment?.map((item, i) => (
                    <li key={`env-${i}`}>{item}</li>
                  ))}
                </ul>

                {latestSleep.recovery?.length > 0 && (
                  <>
                    <h4 className="font-medium mt-3 mb-2">Recovery Tips:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      {latestSleep.recovery.map((item, i) => (
                        <li key={`recovery-${i}`}>{item}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </>
          ) : (
            <p className="text-gray-500">No sleep advice available</p>
          )}
        </div>
      </div>
    </div>
  );
}
