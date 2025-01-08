"use client";
import React, { useEffect, useState } from "react";

interface HostingDetails {
  price: number;
  plan: {
    nodes: {
      name: string;
    }[];
  };
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
          }
        }
      }
    }
  }
`;

export const Page = () => {
  const [data, setData] = useState<Hosting[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        const hostings = json.data.hostings.edges.map((edge: any) => edge.node);
        setData(hostings);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Hosting Data</h1>
      {data && data.length > 0 ? (     
        <ul>
          {data.map((hosting) => (
            <li key={hosting.id}>
              <h2 className="text-blue-600">Title:{hosting.title}</h2>
              <span>Price:{hosting.hostingDetails.price}</span>
              <ul>
                {hosting.hostingDetails.plan.nodes.map((plan, index) => (
                  <li className="text-red-600" key={index}>
                    Plan:{plan.name} 
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hostings found.</p>
      )}
    </div>
  );
};

export default Page;
