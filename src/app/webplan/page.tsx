"use client";

import React, { useState, useEffect } from "react";
import { Api } from "./api";

const query = `
  query {
    hostings(first: 40) {
      edges {
        node {
          id
          title
          hostingDetails {
            plan {
              nodes {
                name
              }
            }
            price
            link
          }
        }
      }
    }
  }
`;

const Page = () => {
  const [uniquePlans, setUniquePlans] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<number>(1);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [selectedBudget, setSelectedBudget] = useState<string>("");
  const [selectedTraffic, setSelectedTraffic] = useState<string>("");

  const budgets = [
    { range: "250-2k", min: 500, max: 2000 },
    { range: "1.9k-4k", min: 1900, max: 4000 },
    { range: "3.9k-8k", min: 3900, max: 8000 },
    { range: "7.9k-16k", min: 7900, max: 16000 },
  ];

  const trafficflow = [
    { range: "1k-5k", min: 1000, max: 5000 },
    { range: "6k-10k", min: 6000, max: 10000 },
    { range: "11k-20k", min: 11000, max: 20000 },
    { range: "21k-60k", min: 21000, max: 60000 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://blog.stablecluster.com/data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch project data");
        }

        const data = await response.json();
        const plansSet = new Set<string>();

        data.data.hostings.edges.forEach((edge: any) => {
          edge.node.hostingDetails.plan.nodes.forEach((plan: any) => {
            plansSet.add(plan.name); // Add each plan name to the Set
          });
        });

        setUniquePlans(Array.from(plansSet)); // Convert Set to an array
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePlanChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectedPlan(e.target.value);

  const handleBudgetChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectedBudget(e.target.value);

  const handleTrafficChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectedTraffic(e.target.value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      setSubmitted(true);
    }
  };

  const resetForm = () => {
    setSelectedPlan("");
    setSelectedBudget("");
    setSelectedTraffic("");
    setStep(1);
    setSubmitted(false);
  };

  if (loading) return <div>Loading project data...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="grid grid-cols-2 gap-2 w-full max-w-2xl mx-4 items-center">
        {!submitted ? (
          <form
            name="process-form"
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-lg flex-grow"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">
              {step === 1
                ? "Choose Your Plan"
                : step === 2
                ? "Select Your Traffic"
                : "Select Your Budget"}
            </h2>

            {step === 1 && (
              <div className="mb-4">
                <label
                  htmlFor="planType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select a Plan
                </label>
                <select
                  id="planType"
                  value={selectedPlan}
                  onChange={handlePlanChange}
                  className="mt-1 p-2 w-full border rounded-md"
                >
                  <option value="" disabled>
                    Select a plan
                  </option>
                  {uniquePlans.map((plan, index) => (
                    <option key={index} value={plan}>
                      {plan}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {step === 2 && (
              <div className="mb-4">
                <label
                  htmlFor="trafficRange"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Your Traffic Range
                </label>
                <select
                  id="trafficRange"
                  value={selectedTraffic}
                  onChange={handleTrafficChange}
                  className="mt-1 p-2 w-full border rounded-md"
                >
                  <option value="" disabled>
                    Select a traffic range
                  </option>
                  {trafficflow.map((traffic, index) => (
                    <option key={index} value={traffic.range}>
                      {traffic.range}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {step === 3 && (
              <div className="mb-4">
                <label
                  htmlFor="budgetRange"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Your Monthly Budget Range
                </label>
                <select
                  id="budgetRange"
                  value={selectedBudget}
                  onChange={handleBudgetChange}
                  className="mt-1 p-2 w-full border rounded-md"
                >
                  <option value="" disabled>
                    Select a Budget Range
                  </option>
                  {budgets.map((budget, index) => (
                    <option key={index} value={budget.range}>
                      {budget.range}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="w-1/2 bg-blue-500 text-white p-2 rounded-md"
              >
                {step === 3 ? "Submit" : "Next"}
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-lg flex-grow">
            <h2 className="text-2xl font-bold mb-2 text-center">Results</h2>
            <Api
              customerData={{
                plan: selectedPlan,
                budgetRange: selectedBudget,
                trafficRange: selectedTraffic,
              }}
            />
            <div className="flex justify-center mt-4">
              <button
                onClick={resetForm}
                className="bg-black text-white p-2 rounded-md"
              >
                Restart
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Page;
