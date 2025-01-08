"use client";

import React, { useState, useEffect } from "react";

interface HostingDetails {
  price: number;
  plan: {
    nodes: {
      name: string;
    }[];
  };
  link: string;
}

interface Hosting {
  id: string;
  title: string;
  hostingDetails: HostingDetails;
}

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

export const Api = ({
  customerData,
}: {
  customerData: {
    plan: string;
    budgetRange: string;
    trafficRange: string;
  };
}) => {
  const [hostings, setHostings] = useState<Hosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recommendedPlans, setRecommendedPlans] = useState<Hosting[]>([]);

  useEffect(() => {
    const fetchHostings = async () => {
      try {
        const response = await fetch("https://blog.stablecluster.com/data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch hosting data");
        }

        const data = await response.json();
        const nodes = data.data.hostings.edges.map(
          (edge: { node: Hosting }) => edge.node
        );
        setHostings(nodes);

        // Filter based on customer data
        const { plan, budgetRange, trafficRange } = customerData;

        const [budgetMin, budgetMax] = budgetRange
          .split("-")
          .map((value) => parseInt(value.replace("k", "000")));
        const [trafficMin, trafficMax] = trafficRange
          .split("-")
          .map((value) => parseInt(value.replace("k", "000")));

        const filteredPlans = nodes.filter(
          (hosting) =>
            hosting.hostingDetails.plan.nodes.some(
              (node) => node.name === plan
            ) &&
            hosting.hostingDetails.price >= budgetMin &&
            hosting.hostingDetails.price <= budgetMax
        );

        let finalPlans: Hosting[] = [];

        // Apply conditions
        if (trafficRange === "1k-5k" && budgetRange === "250-2k") {
          // Condition 1: Low traffic, low budget
          const sortedPlans = filteredPlans.sort(
            (a, b) => a.hostingDetails.price - b.hostingDetails.price
          );
          const lowPricePlan = sortedPlans[0];
          if (lowPricePlan) finalPlans = [lowPricePlan];
        } else if (trafficMax > budgetMax) {
          // Condition 2a: Traffic range higher than budget range
          const maxPricePlan = filteredPlans.reduce((maxPlan, currentPlan) =>
            currentPlan.hostingDetails.price > maxPlan.hostingDetails.price
              ? currentPlan
              : maxPlan
          );
          if (maxPricePlan) finalPlans = [maxPricePlan];
        } else if (budgetMax > trafficMax) {
          // Condition 2b: Budget range higher than traffic range
          const sortedPlans = filteredPlans.sort(
            (a, b) => a.hostingDetails.price - b.hostingDetails.price
          );
          const midIndex = Math.floor(sortedPlans.length / 2);
          const midPricePlan = sortedPlans[midIndex];
          if (midPricePlan) finalPlans = [midPricePlan];
        }

        setRecommendedPlans(finalPlans);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchHostings();
  }, [customerData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="mt-8">
      <h1 className="text-xl mb-2 flex justify-center">
        Recommended Hosting Plans
      </h1>
      {recommendedPlans.length > 0 ? (
        <ul>
          {recommendedPlans.map((plan) => (
            <li key={plan.id} className="mb-4">
              <div className="flex flex-col items-center">
                <span>
                  <strong>Plan Names:</strong>{" "}
                  {plan.hostingDetails.plan.nodes
                    .map((node) => node.name)
                    .join(", ")}
                </span>
                <span>
                  <strong>Title:</strong> {plan.title}
                </span>
                <span>
                  <strong>Price:</strong> NRS {plan.hostingDetails.price}
                  /Monthly
                </span>
                <span className="mt-2">
                  <a
                    href={plan.hostingDetails.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="bg-blue-500 text-white p-2 rounded-md ">
                      OrderNow
                    </button>
                  </a>
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No plans match your selected criteria.</p>
      )}
    </div>
  );
};

export default Api;
